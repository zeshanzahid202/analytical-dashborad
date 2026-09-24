import React, { useState } from 'react';
import { Transaction, TransactionStatus } from '../types';
import { TransactionTable } from '../components/tables/TransactionTable';
import { TransactionDetailModal } from '../components/modals/TransactionDetailModal';
import { useToast } from '../context/ToastContext';

interface TransactionsPageProps {
  transactions: Transaction[];
  onUpdateTransactionStatus: (id: string, newStatus: TransactionStatus) => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  transactions,
  onUpdateTransactionStatus
}) => {
  const { showToast } = useToast();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleExport = () => {
    showToast('Export Generated', `Exported ${transactions.length} transaction records to CSV.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Transactions & Billing
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Complete ledger of inbound payments, subscriptions, refunds, and settlement details.
        </p>
      </div>

      <TransactionTable
        transactions={transactions}
        onSelectTransaction={tx => setSelectedTx(tx)}
        title="Transaction Ledger"
        description="Filter and query across multi-currency checkouts and payment providers"
        showFilters={true}
        onExport={handleExport}
      />

      <TransactionDetailModal
        transaction={selectedTx}
        isOpen={Boolean(selectedTx)}
        onClose={() => setSelectedTx(null)}
        onUpdateStatus={onUpdateTransactionStatus}
      />
    </div>
  );
};
