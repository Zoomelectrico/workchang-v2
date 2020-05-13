import { Schema, Document, model } from 'mongoose';

export type BrandDocument = Document & {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const brandSchema = new Schema<BrandDocument>(
  {
    name: {
      type: String,
      required: 'Please provide a Name',
    },
  },
  { timestamps: true }
);

export const Brand = model('Brand', brandSchema);
