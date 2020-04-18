import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { VehicleDocument } from './Vehicle';
import { MechanicDocument } from './Mechanic';
import { AppointmentDocument } from './Appointment';
import { ReplacementDocument } from './Replacement';

export type RepairDocument = Document & {
  entry: Date;
  exit: Date;
  code: string;
  mechanic: Schema.Types.ObjectId | MechanicDocument;
  appointment: Schema.Types.ObjectId | AppointmentDocument;
  vehicle: Schema.Types.ObjectId | VehicleDocument;
  ready: boolean;
  diagnostic: string;
  procedure: string;
  replacements: [Schema.Types.ObjectId | ReplacementDocument];
  details?: [{ photo: string; detail: string }];
  createdAt: Date;
  updatedAt: Date;
};

const repairSchema = new Schema<RepairDocument>(
  {
    entry: {
      type: Date,
      required: 'please provide an Entry Date',
    },
    exit: Date,
    code: {
      type: String,
      required: 'Please provide a code',
      default: uuid(),
    },
    mechanic: {
      type: Schema.Types.ObjectId,
      ref: 'Mechanic',
      required: 'Please provide a mechanic',
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: 'Please provide an Appointment',
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: 'Please provide a vehicle',
    },
    ready: {
      type: Boolean,
      default: false,
    },
    diagnostic: String,
    procedure: String,
    replacements: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Replacement',
        required: 'Please provide a Replacement',
      },
    ],
    details: [{ photo: String, detail: String }],
  },
  { timestamps: true }
);

export const Repair = model('Repair', repairSchema);
