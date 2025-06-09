// src/store/authStore.ts (Updated)
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
    
    // Extract user data correctly
    const userData = {
      id: data.user.id, // This is the correct user ID
      email: data.user.email!,
      full_name: data.user.user_metadata?.full_name || data.user.email!.split('@')[0],
    };

    set({ 
      user: userData,
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
    return data;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        set({ loading: false });
        return;
      }

      if (session?.user) {
        const userData = {
          id: session.user.id, // This is the correct user ID
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
        };

        set({ 
          user: userData,
          session,
          loading: false 
        });
      } else {
        set({ 
          user: null,
          session: null,
          loading: false 
        });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
          };

          set({ 
            user: userData,
            session,
            loading: false 
          });
        } else {
          set({ 
            user: null,
            session: null,
            loading: false 
          });
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false });
    }
  },
}));