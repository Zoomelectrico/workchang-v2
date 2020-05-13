import { Schema, model, Document, HookNextFunction } from 'mongoose';
import slugs from 'slugs';
import bcrypt from 'bcryptjs';
import { ClientDocument } from './Client';
import { MechanicDocument } from './Mechanic';
import { ManagerDocument } from './Manager';
import { AdministratorDocument } from './Administrator';

type comparePasswordFunction = (candidate: string) => Promise<boolean>;

export type UserDocument = Document & {
  slug: string;
  dni: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  privilege: number; // 0: client, 1: mechanic, 2: manager, 3: administrator
  client?: Schema.Types.ObjectId | ClientDocument;
  mechanic?: Schema.Types.ObjectId | MechanicDocument;
  manager?: Schema.Types.ObjectId | ManagerDocument;
  administrator?: Schema.Types.ObjectId | AdministratorDocument;
  resetToken?: string;
  resetTokenExpiry?: number;
  comparePassword: comparePasswordFunction;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserDocument>(
  {
    slug: {
      type: String,
    },
    dni: {
      type: String,
      required: 'Please provide a DNI',
    },
    name: {
      type: String,
      required: 'Please provide a Name',
    },
    email: {
      type: String,
      required: 'Please provide a Email',
      unique: true,
      //! need validations
    },
    password: {
      type: String,
      required: 'Please provide a password',
    },
    photo: {
      type: String,
      required: 'Please provide a Photo',
    },
    privilege: {
      type: Number, // 0: client, 1: mechanic, 2: manager, 3: administrator
      default: 0,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    mechanic: {
      type: Schema.Types.ObjectId,
      ref: 'Mechanic',
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'Manager',
    },
    administrator: {
      type: Schema.Types.ObjectId,
      ref: 'Administrator',
    },
    resetToken: String,
    resetTokenExpiry: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (
  this: UserDocument,
  next: HookNextFunction
) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(Number(process.env.ROUNDS || 10));
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre('save', async function (
  this: UserDocument,
  next: HookNextFunction
) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugs(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const withSlugs = await (this as any).constructor.find({
    slug: slugRegEx,
  });
  if (Array.isArray(withSlugs)) {
    this.slug = `${this.slug}-${withSlugs.length + 1}`;
  }
  next();
});

async function comparePassword(this: UserDocument, candidate: string) {
  return bcrypt.compare(candidate, this.password);
}

userSchema.methods.comparePassword = comparePassword;

export const User = model('User', userSchema);
