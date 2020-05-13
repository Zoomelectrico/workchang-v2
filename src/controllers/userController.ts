import { Request, Response } from 'express';
import { model } from 'mongoose';

const User = model('User');

function buildUser(doc: object) {
  // TODO: Validate
  return User.create(doc);
}

function getUser(all = true, options = {}, id = false) {
  if (all) {
    return User.find(options).exec();
  }
  if (id) {
    return User.findById(id).exec();
  }
  return User.findOne(options).exec();
}

export async function createUser(req: Request, res: Response) {
  const user = await buildUser(req.body);
  res.json({ user });
}

export async function getUsers(req: Request, res: Response) {
  const users = await getUser();
  res.json({ users });
}
