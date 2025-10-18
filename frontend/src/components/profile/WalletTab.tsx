
import React, { useEffect } from 'react';
import { useWalletStore } from '../../stores/walletStore';

const WalletTab = () => {
  const { balance, fetchBalance, loading } = useWalletStore();

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div id="wallet-tab" className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <i className="fas fa-wallet text-blue-500 mr-3"></i>Wallet Summary
          </h2>
          <button className="text-blue-500 hover:text-blue-600" onClick={fetchBalance} disabled={loading}>
            <i className={`fas fa-sync-alt mr-1 ${loading ? 'animate-spin' : ''}`}></i>Refresh
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-700 dark:to-blue-600 rounded-2xl p-6 mb-6 text-white">
          <p className="text-blue-100 dark:text-blue-200 mb-2">Available Balance</p>
          <h3 className="text-4xl font-bold mb-6 text-white dark:text-gray-100">{balance} CFA</h3>
          <div className="flex gap-4">
            <button className="btn-primary flex-1 bg-white text-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <i className="fas fa-plus-circle mr-2"></i>Top Up
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20">
              <i className="fas fa-arrow-up mr-2"></i>Withdraw
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-xl">
            <p className="text-green-600 dark:text-green-400 text-sm mb-1">Current Cycle</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">5,000 CFA</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-xl">
            <p className="text-blue-600 dark:text-blue-400 text-sm mb-1">Amount Paid</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">3,500 CFA</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/50 p-4 rounded-xl">
            <p className="text-orange-600 dark:text-orange-400 text-sm mb-1">Remaining</p>
            <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">1,500 CFA</p>
          </div>
        </div>

        <button className="btn-secondary w-full py-3 text-white font-semibold rounded-xl">
          <i className="fas fa-credit-card mr-2"></i>Pay Now
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Transaction History</h2>
          <div className="flex gap-2">
            <select className="px-4 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl text-sm">
              <option>All Types</option>
              <option>Top-Up</option>
              <option>Payment</option>
              <option>Refund</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {/* Transaction Rows */}
        </div>
      </div>
    </div>
  );
};

export default WalletTab;
