import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Transfer {
  id: string;
  user_id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed";
  reference: string | null;
  bank_name: string | null;
  account_last4: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useTransfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTransfers = async () => {
    if (!user) {
      setTransfers([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("transfers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setTransfers((data as Transfer[]) || []);
    } catch (err: any) {
      console.error("Error fetching transfers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTransfer = async (transfer: Omit<Transfer, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!user) throw new Error("User not authenticated");

    const { data, error: insertError } = await supabase
      .from("transfers")
      .insert({
        ...transfer,
        user_id: user.id,
      })
      .select()
      .single();

    if (insertError) throw insertError;
    return data as Transfer;
  };

  useEffect(() => {
    fetchTransfers();
  }, [user]);

  // Set up realtime subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("transfers-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transfers",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Realtime update:", payload);

          if (payload.eventType === "INSERT") {
            setTransfers((prev) => [payload.new as Transfer, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setTransfers((prev) =>
              prev.map((t) =>
                t.id === (payload.new as Transfer).id ? (payload.new as Transfer) : t
              )
            );
          } else if (payload.eventType === "DELETE") {
            setTransfers((prev) =>
              prev.filter((t) => t.id !== (payload.old as Transfer).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    transfers,
    loading,
    error,
    createTransfer,
    refetch: fetchTransfers,
  };
};