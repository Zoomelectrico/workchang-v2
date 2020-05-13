import { Schema, model, Document } from 'mongoose';
import { RepairDocument } from './Repair';

export type MechanicDocument = Document & {
  repairs: [Schema.Types.ObjectId | RepairDocument];
  createdAt: Date;
  updatedAt: Date;
};

const mechanicSchema = new Schema<MechanicDocument>(
  {
    repairs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Repair',
        required: 'Please provide a vehicle',
      },
    ],
  },
  { timestamps: true }
);

export const Mechanic = model('Mechanic', mechanicSchema);
