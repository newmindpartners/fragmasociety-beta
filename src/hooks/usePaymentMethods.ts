import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || '';

export interface PaymentMethod {
  id: string;
  userId: string;
  type: "card" | "bank_account";
  cardBrand: "mastercard" | "visa" | "amex" | "discover" | null;
  last4: string;
  bankName: string | null;
  accountHolderName: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPaymentMethods = useCallback(async () => {
    if (!user?.id) {
      setPaymentMethods([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/users/me/payment-methods?clerkUserId=${user.id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setPaymentMethods([]);
          return;
        }
        throw new Error('Failed to fetch payment methods');
      }

      const data = await response.json();
      setPaymentMethods(data.paymentMethods || []);
    } catch (err: any) {
      console.error("Error fetching payment methods:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const addPaymentMethod = async (method: {
    type: "card" | "bank_account";
    cardBrand?: "mastercard" | "visa" | "amex" | "discover";
    last4: string;
    bankName?: string;
    accountHolderName?: string;
    isDefault?: boolean;
  }) => {
    if (!user?.id) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}/api/users/me/payment-methods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...method,
        clerkUserId: user.id,
      }),
    });

    if (!response.ok) throw new Error('Failed to add payment method');
    
    const data = await response.json();
    await fetchPaymentMethods();
    return data.paymentMethod as PaymentMethod;
  };

  const updatePaymentMethod = async (id: string, updates: Partial<PaymentMethod>) => {
    if (!user?.id) throw new Error("User not authenticated");

    const response = await fetch(
      `${API_URL}/api/users/me/payment-methods/${id}?clerkUserId=${user.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) throw new Error('Failed to update payment method');
    
    await fetchPaymentMethods();
  };

  const deletePaymentMethod = async (id: string) => {
    if (!user?.id) throw new Error("User not authenticated");

    const response = await fetch(
      `${API_URL}/api/users/me/payment-methods/${id}?clerkUserId=${user.id}`,
      { method: 'DELETE' }
    );

    if (!response.ok) throw new Error('Failed to delete payment method');
    
    await fetchPaymentMethods();
  };

  const setAsDefault = async (id: string) => {
    await updatePaymentMethod(id, { isDefault: true });
    toast.success("Default payment method updated");
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

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
