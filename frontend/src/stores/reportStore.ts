import { create } from "zustand";
import api from "../api/axios";
import type { FinancialSummary } from "../types/report";

interface ReportState {
  financialSummary: FinancialSummary | null;
  loading: boolean;
  error: string | null;
  fetchFinancialSummary: (startDate: string, endDate: string) => Promise<void>;
}

export const useReportStore = create<ReportState>((set) => ({
  financialSummary: null,
  loading: false,
  error: null,

  fetchFinancialSummary: async (startDate: string, endDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<FinancialSummary>(
        "/reports/financial-summary",
        {
          params: { startDate, endDate },
        }
      );
      set({ financialSummary: response.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));
