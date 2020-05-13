import { Schema, model, Document } from 'mongoose';
import { BrandDocument } from './Brand';
import { ModelDocument } from './Model';

export type ReplacementDocument = Document & {
  brand: Schema.Types.ObjectId | BrandDocument;
  partNumber: string;
  name: string;
  quantity: number;
  usedBy: [Schema.Types.ObjectId | ModelDocument];
  createdAt: Date;
  updatedAt: Date;
};

const replacementSchema = new Schema<ReplacementDocument>(
  {
    partNumber: {
      type: String,
      required: 'Please provide a Part Number',
    },
    name: {
      type: String,
      required: 'Please provide a Name',
    },
    quantity: {
      type: Number,
      required: 'Please provide a Quantity',
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: 'Please provide a Brand',
    },
    usedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Model',
        required: 'please provide a Model',
      },
    ],
  },
  { timestamps: true }
);

export const Replacement = model('Replacement', replacementSchema);
