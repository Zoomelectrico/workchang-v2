import { Schema, model, Document } from 'mongoose';

export type ManagerDocument = Document & {
  createdAt: Date;
  updatedAt: Date;
};

const managerSchema = new Schema<ManagerDocument>({}, { timestamps: true });

export const Manager = model('Manager', managerSchema);
