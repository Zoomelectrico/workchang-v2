import { Schema, Document, model } from 'mongoose';
import { BrandDocument } from './Brand';

export type ModelDocument = Document & {
  name: string;
  brand: Schema.Types.ObjectId | BrandDocument;
  createdAt: Date;
  updatedAt: Date;
};

const modelSchema = new Schema<ModelDocument>(
  {
    name: {
      type: String,
      required: 'Please provide a Name',
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: 'Please provide a Brand',
    },
  },
  { timestamps: true }
);

export const Model = model('Model', modelSchema);
