import { create } from 'zustand';
import { User } from '../types';
import { signIn, signOut, getCurrentUser } from '../utils/supabase';

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
      
      if (error) {
        set({ error: error.message, loading: false });
        return;
      }
      
      if (data?.user) {
        const userData = {
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
          loading: false 
        });
      }
    } catch (err) {
      set({ error: 'Erro ao fazer login', loading: false });
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
      loading: false 
    });
  },
  
  initAuth: async () => {
    set({ loading: true });
    try {
      const user = await getCurrentUser();
      
      if (user) {
        const userData = {
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
          loading: false 
        });
      } else {
        set({ loading: false });
      }
    } catch (err) {
      set({ loading: false });
    }
  }
}));