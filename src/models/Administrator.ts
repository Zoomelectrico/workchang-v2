import { Schema, model, Document } from 'mongoose';

export type AdministratorDocument = Document & {
  createdAt: Date;
  updatedAt: Date;
};

const administratorSchema = new Schema<AdministratorDocument>(
  {},
  { timestamps: true }
);

export const Administrator = model('Administrator', administratorSchema);
