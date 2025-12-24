import { useState, useEffect, useCallback } from "react";

export interface WalletTransaction {
  id: string;
  type: "Credit" | "Withdraw" | "Claim" | "Swap";
  amount: string;
  details?: string;
  date: string;
  status: "Completed" | "Processing" | "Failed";
}

const STORAGE_KEY = "fragma_wallet_history";

const getStoredHistory = (): WalletTransaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading wallet history:", e);
  }
  return [
    { id: "1", type: "Credit", amount: "+$500.00", date: "Apr 12, 2025", status: "Completed" },
    { id: "2", type: "Claim", amount: "+$85.10", date: "Apr 10, 2025", status: "Completed" },
    { id: "3", type: "Withdraw", amount: "-$200.00", date: "Apr 5, 2025", status: "Completed" },
  ];
};

const saveHistory = (history: WalletTransaction[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Error saving wallet history:", e);
  }
};

// Custom event for cross-component updates
const HISTORY_UPDATE_EVENT = "wallet_history_updated";

export const useWalletHistory = () => {
  const [history, setHistory] = useState<WalletTransaction[]>(getStoredHistory);

  // Listen for updates from other components
  useEffect(() => {
    const handleUpdate = () => {
      setHistory(getStoredHistory());
    };

    window.addEventListener(HISTORY_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(HISTORY_UPDATE_EVENT, handleUpdate);
  }, []);

  const addTransaction = useCallback((transaction: Omit<WalletTransaction, "id" | "date">) => {
    const newTransaction: WalletTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    const newHistory = [newTransaction, ...getStoredHistory()];
    saveHistory(newHistory);
    setHistory(newHistory);
    
    // Notify other components
    window.dispatchEvent(new CustomEvent(HISTORY_UPDATE_EVENT));

    return newTransaction;
  }, []);

  return { history, addTransaction };
};
