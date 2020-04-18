import { Schema, model, Document } from 'mongoose';
import slugs from 'slugs';
import bcrypt from 'bcryptjs';

export type UserDocument = Document & {};

const userSchema = new Schema({});

export const User = model('User', userSchema);
