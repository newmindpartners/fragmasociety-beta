import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface NotificationPreferences {
  id: string;
  user_id: string;
  transfer_email: boolean;
  transfer_push: boolean;
  deposit_confirmed: boolean;
  withdrawal_confirmed: boolean;
  status_updates: boolean;
  created_at: string;
  updated_at: string;
}

const defaultPreferences: Omit<NotificationPreferences, "id" | "user_id" | "created_at" | "updated_at"> = {
  transfer_email: true,
  transfer_push: true,
  deposit_confirmed: true,
  withdrawal_confirmed: true,
  status_updates: true,
};

export const useNotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPreferences = async () => {
    if (!user) {
      setPreferences(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setPreferences(data as NotificationPreferences);
      } else {
        // Create default preferences if none exist
        const { data: newData, error: insertError } = await supabase
          .from("notification_preferences")
          .insert({
            user_id: user.id,
            ...defaultPreferences,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setPreferences(newData as NotificationPreferences);
      }
    } catch (err: any) {
      console.error("Error fetching notification preferences:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<Omit<NotificationPreferences, "id" | "user_id" | "created_at" | "updated_at">>) => {
    if (!user || !preferences) throw new Error("User not authenticated");

    const { error: updateError } = await supabase
      .from("notification_preferences")
      .update(updates)
      .eq("user_id", user.id);

    if (updateError) throw updateError;
    
    setPreferences(prev => prev ? { ...prev, ...updates } : null);
    toast.success("Notification preferences updated");
  };

  const togglePreference = async (key: keyof Omit<NotificationPreferences, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!preferences) return;
    await updatePreferences({ [key]: !preferences[key] });
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    togglePreference,
    refetch: fetchPreferences,
  };
};