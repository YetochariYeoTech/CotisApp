import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/axios'; // Assuming a configured axios instance

interface WalletState {
  balance: number;
  transactions: any[]; // Replace 'any' with a proper Transaction type later
  loading: boolean;
  error: string | null;
  fetchBalance: () => Promise<void>;
  createTopUp: (amount: number) => Promise<void>;
}

export const useWalletStore = create<WalletState>()(
  devtools(
    (set) => ({
      balance: 0,
      transactions: [],
      loading: false,
      error: null,

      /**
       * Fetches the member's current wallet balance from the API.
       */
      fetchBalance: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get('/members/me/balance');
          set({ balance: response.data.balance, loading: false });
        } catch (err) {
          console.error("Error fetching balance:", err);
          set({ error: 'Failed to fetch balance', loading: false });
        }
      },

      /**
       * Initiates a top-up request and redirects the user to the payment page.
       * @param {number} amount - The amount to top up.
       */
      createTopUp: async (amount: number) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/wallet/top-up', { amount });
          const { checkoutUrl } = response.data;

          if (checkoutUrl) {
            // Redirect the user to the Wave payment page.
            window.location.href = checkoutUrl;
          } else {
            throw new Error("Checkout URL not received from server.");
          }
          // Loading state will persist until the user is redirected.

        } catch (err) {
          console.error("Error creating top-up:", err);
          set({ error: 'Failed to create top-up request', loading: false });
        }
      },
    }),
    { name: 'WalletStore' }
  )
);
