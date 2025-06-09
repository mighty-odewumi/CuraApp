import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    set({ 
      user: data.user?.user_metadata as User,
      session: data.session
    });
  },

  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) throw error;
    
    // Update state instead of returning data
    set({ 
      user: data.user?.user_metadata as User || null,
      session: data.session
    });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    set({ 
      user: session?.user?.user_metadata as User || null,
      session,
      loading: false 
    });

    supabase.auth.onAuthStateChange((event, session) => {
      set({ 
        user: session?.user?.user_metadata as User || null,
        session,
        loading: false 
      });
    });
  },
}));