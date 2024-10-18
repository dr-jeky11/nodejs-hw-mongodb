import { User } from '../db/models/user.js';

export const registerUser = async () => {
  const user = await User.create(payload);
  return user;
};
