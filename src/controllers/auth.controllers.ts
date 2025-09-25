import { Request, Response } from 'express';
import { tryLoginUser, tryRegisterUser } from '../services/auth.services';
import { supabase } from '../lib/supabase';

// REGISTRO DE USUARIO
export const signUpNewUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Missing required fields: email, password, and fullName.' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: fullName, // Este dato es capturado por el trigger
      },
    },
  });

  if (error) {
    console.error('Registration Error:', error);
    return res.status(400).json({ error: error.message });
  }

  // El trigger de la base de datos se encarga del resto
  res.status(201).json({
    message: 'User registered successfully! Profile created.',
    user: data.user,
  });
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: email y password.' });
  }
  // Lógica de login con Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error de login:', error);
    // Es una buena práctica no especificar qué credencial es incorrecta por seguridad.
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  // Si el login es exitoso, Supabase devuelve un objeto de sesión
  // que contiene el token de acceso.
  res.status(200).json({
    message: 'Login exitoso',
    session: data.session,
    user: data.user,
  });
};
