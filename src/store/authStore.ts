// src/store/authStore.ts

import { create } from 'zustand';
import { User } from '../types';
import { signIn, signOut, getCurrentUser } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  subscription: 'free' | 'premium';
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;

  setUserFromSession: (supabaseUser: Session['user']) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  subscription: 'free',
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await signIn(email, password);

      if (error || !data?.user) {
        set({
          error: error?.message || 'Email ou senha incorretos.',
          isAuthenticated: false,
          user: null,
          loading: false,
        });
        return;
      }

      const userData: User = {
        id: data.user.id,
        email: data.user.email || '',
        username: data.user.user_metadata?.username || 'Usuário',
        isAdmin: data.user.user_metadata?.isAdmin || false,
        subscription: data.user.user_metadata?.subscription || 'free',
        createdAt: data.user.created_at,
      };

      set({
        user: userData,
        isAuthenticated: true,
        isAdmin: userData.isAdmin,
        subscription: userData.subscription,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: 'Erro ao conectar com o servidor.', loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    await signOut();
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      subscription: 'free',
      loading: false,
      error: null,
    });
  },

  initAuth: async () => {
    set({ loading: true });

    try {
      const user = await getCurrentUser();

      if (user) {
        const userData: User = {
          id: user.id,
          email: user.email || '',
          username: user.user_metadata?.username || 'Usuário',
          isAdmin: user.user_metadata?.isAdmin || false,
          subscription: user.user_metadata?.subscription || 'free',
          createdAt: user.created_at,
        };

        set({
          user: userData,
          isAuthenticated: true,
          isAdmin: userData.isAdmin,
          subscription: userData.subscription,
          loading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          subscription: 'free',
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: 'Erro ao verificar sessão do usuário.',
        isAdmin: false,
        subscription: 'free',
      });
    }
  },

  setUserFromSession: (supabaseUser) => {
    if (!supabaseUser) return;

    const userData: User = {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      username: supabaseUser.user_metadata?.username || 'Usuário',
      isAdmin: supabaseUser.user_metadata?.isAdmin || false,
      subscription: supabaseUser.user_metadata?.subscription || 'free',
      createdAt: supabaseUser.created_at,
    };

    set({
      user: userData,
      isAuthenticated: true,
      isAdmin: userData.isAdmin,
      subscription: userData.subscription,
    });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },
}));
