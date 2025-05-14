import { createClient } from '@supabase/supabase-js';

// Normalmente, essas variáveis estariam em um arquivo .env
const supabaseUrl = 'https://supabase-url.supabase.co';
const supabaseAnonKey = 'sua-chave-anon-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        isAdmin: false,
        subscription: 'free',
      },
    },
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};