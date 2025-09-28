import { Request, Response } from 'express';
import { tryLoginUser, tryRegisterUser } from '../services/auth.services';

// REGISTRO DE USUARIO
export const signUpNewUser = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    res.status(400).json({ error: true, message: 'Campos de registro incompletos.' });
    return;
  }

  try {
    const registerUserData = await tryRegisterUser({ full_name, email, password });
    res.status(201).json({ success: true, message: 'Usuario registrado con exito.', user: registerUserData });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    return;
  }

  try {
    const loginRes = await tryLoginUser(email, password);
    res.status(200).json(loginRes); // incluirá token, user, etc.
    return;
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    return;
  }
};
