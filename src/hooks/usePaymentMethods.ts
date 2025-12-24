import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface PaymentMethod {
  id: string;
  user_id: string;
  type: "card" | "bank_account";
  card_brand: "mastercard" | "visa" | "amex" | "discover" | null;
  last4: string;
  bank_name: string | null;
  account_holder_name: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPaymentMethods = async () => {
    if (!user) {
      setPaymentMethods([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setPaymentMethods((data as PaymentMethod[]) || []);
    } catch (err: any) {
      console.error("Error fetching payment methods:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!user) throw new Error("User not authenticated");

    // If this is the first method or marked as default, ensure it's the only default
    if (method.is_default || paymentMethods.length === 0) {
      await supabase
        .from("payment_methods")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { data, error: insertError } = await supabase
      .from("payment_methods")
      .insert({
        ...method,
        user_id: user.id,
        is_default: method.is_default || paymentMethods.length === 0,
      })
      .select()
      .single();

    if (insertError) throw insertError;
    
    await fetchPaymentMethods();
    return data as PaymentMethod;
  };

  const updatePaymentMethod = async (id: string, updates: Partial<PaymentMethod>) => {
    if (!user) throw new Error("User not authenticated");

    // If setting as default, unset others first
    if (updates.is_default) {
      await supabase
        .from("payment_methods")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { error: updateError } = await supabase
      .from("payment_methods")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id);

    if (updateError) throw updateError;
    
    await fetchPaymentMethods();
  };

  const deletePaymentMethod = async (id: string) => {
    if (!user) throw new Error("User not authenticated");

    const method = paymentMethods.find(m => m.id === id);
    
    const { error: deleteError } = await supabase
      .from("payment_methods")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) throw deleteError;

    // If deleted method was default and there are others, make the first one default
    if (method?.is_default && paymentMethods.length > 1) {
      const remaining = paymentMethods.filter(m => m.id !== id);
      if (remaining.length > 0) {
        await supabase
          .from("payment_methods")
          .update({ is_default: true })
          .eq("id", remaining[0].id);
      }
    }
    
    await fetchPaymentMethods();
  };

  const setAsDefault = async (id: string) => {
    await updatePaymentMethod(id, { is_default: true });
    toast.success("Default payment method updated");
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, [user]);

  return {
    paymentMethods,
    loading,
    error,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setAsDefault,
    refetch: fetchPaymentMethods,
  };
};