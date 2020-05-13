import { Schema, model, Document } from 'mongoose';
import { VehicleDocument } from './Vehicle';

export type ClientDocument = Document & {
  vehicles: [Schema.Types.ObjectId | VehicleDocument];
  phone: string;
  address: {
    country: string;
    state: string;
    city: string;
    county: string;
    zipCode: string;
    street: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

const clientSchema = new Schema<ClientDocument>(
  {
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: 'Please provide a vehicle',
      },
    ],
    phone: {
      type: String,
      required: 'please provide a Phone',
    },
    address: {
      required: false,
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
  },
  { timestamps: true }
);

export const Client = model('Client', clientSchema);
