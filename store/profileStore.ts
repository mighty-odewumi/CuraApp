import { create } from "zustand"
import { supabase } from "@/lib/supabase"

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  date_of_birth?: string
  occupation?: string
  monthly_income?: number
  financial_goals: string[]
  risk_tolerance: "low" | "medium" | "high"
  notification_preferences: {
    push_notifications: boolean
    email_notifications: boolean
    spending_alerts: boolean
    investment_updates: boolean
  }
  created_at: string
  updated_at: string
}

interface ProfileState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
  fetchProfile: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  uploadAvatar: (uri: string) => Promise<void>
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null })
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error) throw error
      set({ profile: data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  updateProfile: async (updates) => {
    set({ loading: true, error: null })
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      const { data, error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", user.id)
        .select()
        .single()

      if (error) throw error
      set({ profile: data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  uploadAvatar: async (uri: string) => {
    set({ loading: true, error: null })
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      // Create form data for file upload
      const formData = new FormData()
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: `avatar-${user.id}.jpg`,
      } as any)

      const { data, error } = await supabase.storage.from("avatars").upload(`${user.id}/avatar.jpg`, formData, {
        cacheControl: "3600",
        upsert: true,
      })

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path)

      await get().updateProfile({ avatar_url: publicUrl })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },
}))
