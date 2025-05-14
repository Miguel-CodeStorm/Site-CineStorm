import { create } from 'zustand';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  subscription: 'free' | 'premium';
  createdAt: string;
}

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

  setUserFromSession: (supabaseUser: SupabaseUser) => void;
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

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user) {
      set({
        error: error?.message || 'Email ou senha incorretos.',
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        subscription: 'free',
        loading: false,
      });
      return;
    }

    const user = data.user;
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
  },

  logout: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
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

    const { data: { session }, error } = await supabase.auth.getSession();
    const user = session?.user;

    if (user && !error) {
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
  },

  setUserFromSession: (user: SupabaseUser) => {
    if (!user) return;

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
    });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },
}));
