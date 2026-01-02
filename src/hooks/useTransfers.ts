import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || '';

export interface Transfer {
  id: string;
  userId: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "INVESTMENT" | "DISTRIBUTION" | "FEE" | "REFUND";
  amount: number;
  currency: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";
  reference: string | null;
  bankName: string | null;
  accountLast4: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useTransfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTransfers = useCallback(async () => {
    if (!user?.id) {
      setTransfers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/users/me/transfers?clerkUserId=${user.id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setTransfers([]);
          return;
        }
        throw new Error('Failed to fetch transfers');
      }

      const data = await response.json();
      setTransfers(data.transfers || []);
    } catch (err: any) {
      console.error("Error fetching transfers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createTransfer = async (transfer: {
    type: Transfer['type'];
    amount: number;
    currency?: string;
    bankName?: string;
    accountLast4?: string;
    notes?: string;
  }) => {
    if (!user?.id) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}/api/transfers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...transfer,
        clerkUserId: user.id,
      }),
    });

    if (!response.ok) throw new Error('Failed to create transfer');
    
    const data = await response.json();
    
    // Add to local state
    setTransfers(prev => [data.transfer, ...prev]);
    
    return data.transfer as Transfer;
  };

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  return {
    transfers,
    loading,
    error,
    createTransfer,
    refetch: fetchTransfers,
  };
};
