import { RegisterUserInput } from '../types/user';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';

// REGISTRO DE USUARIO
export async function tryRegisterUser(registerData: RegisterUserInput) {
  const { name, email, password } = registerData;

  const { data: existingUser, error: fetchError } = await supabase
    .from('user')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('El email ya está en uso.');
  }

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error('Error al verificar el usuario existente');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: newUser, error: insertError } = await supabase
    .from('user')
    .insert([{ name, email, password: hashedPassword, role: 'customer' }])
    .select('id, name, email, role')
    .single();

  if (insertError) {
    throw new Error('Error al crear el usuario');
  }

  return newUser;
}

export async function tryLoginUser(email: string, password: string) {
  const { data: user, error } = await supabase.from('user').select('*').eq('email', email).single();

  if (error || !user) {
    throw new Error('Error buscando al usuario con ese email.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Credenciales invalidas.');
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    user: safeUser,
    token,
  };
}
