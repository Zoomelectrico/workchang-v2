import { Schema, model, Document, HookNextFunction } from 'mongoose';
import slugs from 'slugs';
import bcrypt from 'bcryptjs';

type comparePasswordFunction = (candidate: string) => Promise<boolean>;

export type UserDocument = Document & {
  slug: string;
  dni: string;
  name: string;
  email: string;
  password: string;
  address: {
    country: string;
    state: string;
    city: string;
    county: string;
    zipCode: string;
    street: string;
  };
  photo: string;
  type?: number; // ?
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
      //! need validations
    },
    password: {
      type: String,
      required: 'Please provide a password',
    },
    address: {
      country: {
        type: String,
        required: 'Please provide a Country',
      },
      state: {
        type: String,
        required: 'Please provide a State',
      },
      city: {
        type: String,
        required: 'Please provide a City',
      },
      county: {
        type: String,
        required: 'Please provide a County',
      },
      zipCode: {
        type: String,
        required: 'Please provide a Zip Code',
      },
      street: {
        type: String,
        required: 'Please provide a Street',
      },
    },
    photo: {
      type: String,
      required: 'Please provide a Photo',
    },
    type: {
      type: Number, // ?
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
