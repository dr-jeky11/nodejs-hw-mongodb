import { registerUser } from '../services/auth';

export const registerController = async (req, res) => {
  const { body } = req;
  await registerUser(body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: { user },
  });
};