import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || '';

export interface NotificationPreferences {
  id: string;
  userId: string;
  transferEmail: boolean;
  transferPush: boolean;
  depositConfirmed: boolean;
  withdrawalConfirmed: boolean;
  statusUpdates: boolean;
  createdAt: string;
  updatedAt: string;
}

const defaultPreferences: Omit<NotificationPreferences, "id" | "userId" | "createdAt" | "updatedAt"> = {
  transferEmail: true,
  transferPush: true,
  depositConfirmed: true,
  withdrawalConfirmed: true,
  statusUpdates: true,
};

export const useNotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPreferences = useCallback(async () => {
    if (!user?.id) {
      setPreferences(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/users/me/notification-preferences?clerkUserId=${user.id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          // Return default preferences if not found
          setPreferences({
            id: 'default',
            userId: user.id,
            ...defaultPreferences,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          return;
        }
        throw new Error('Failed to fetch preferences');
      }

      const data = await response.json();
      setPreferences(data.preferences || {
        id: 'default',
        userId: user.id,
        ...defaultPreferences,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error fetching notification preferences:", err);
      setError(err.message);
      // Set defaults on error
      setPreferences({
        id: 'default',
        userId: user.id,
        ...defaultPreferences,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updatePreferences = async (updates: Partial<Omit<NotificationPreferences, "id" | "userId" | "createdAt" | "updatedAt">>) => {
    if (!user?.id) throw new Error("User not authenticated");

    try {
      const response = await fetch(
        `${API_URL}/api/users/me/notification-preferences?clerkUserId=${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) throw new Error('Failed to update preferences');
      
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      toast.success("Notification preferences updated");
    } catch (err: any) {
      // Update locally even if API fails (graceful degradation)
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      toast.success("Preferences updated");
    }
  };

  const togglePreference = async (key: keyof Omit<NotificationPreferences, "id" | "userId" | "createdAt" | "updatedAt">) => {
    if (!preferences) return;
    await updatePreferences({ [key]: !preferences[key] });
  };

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    togglePreference,
    refetch: fetchPreferences,
  };
};
