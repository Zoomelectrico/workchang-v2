import { Schema, model, Document } from 'mongoose';
import { VehicleDocument } from './Vehicle';

export type AppointmentDocument = Document & {
  vehicle: Schema.Types.ObjectId | VehicleDocument;
  attended: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: 'Please provide a vehicle',
    },
    attended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Appointment = model('Appointment', appointmentSchema);
