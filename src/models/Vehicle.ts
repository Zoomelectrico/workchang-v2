import { Schema, Document, model } from 'mongoose';
import { BrandDocument } from './Brand';
import { ModelDocument } from './Model';

export type VehicleDocument = Document & {
  motorSerial: string;
  bodySerial: string;
  plate: string;
  brand: Schema.Types.ObjectId | BrandDocument;
  model: Schema.Types.ObjectId | ModelDocument;
  version: string;
  year: number;
  photo: string;
  active: boolean;
  owner: Schema.Types.ObjectId; //! Add model "client"
  createdAt: Date;
  updatedAt: Date;
};

const vehicleSchema = new Schema<VehicleDocument>(
  {
    motorSerial: {
      type: String,
      required: 'Please provided a Motor Serial',
    },
    bodySerial: {
      type: String,
      required: 'Please provided a Body Serial',
    },
    plate: {
      type: String,
      required: 'Please provided a License Plate',
      unique: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: 'Please provided a brand',
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'Model',
      required: 'Please provided a model',
    },
    version: {
      type: String,
      required: 'Please provided a version',
    },
    year: {
      type: Number,
      required: 'Please provided a year',
    },
    photo: {
      type: String,
      required: 'Please provided a photo',
    },
    active: {
      type: Boolean,
      default: true,
      required: 'Please provided a active',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: 'Please provided a owner',
    },
  },
  { timestamps: true }
);

export const Vehicle = model('Vehicle', vehicleSchema);
