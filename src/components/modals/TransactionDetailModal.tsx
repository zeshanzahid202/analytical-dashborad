import React, { useState } from 'react';
import { Transaction, TransactionStatus } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import {
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Copy,
  Receipt,
  Download,
  Send
} from 'lucide-react';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: TransactionStatus) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const { showToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Copied to clipboard', `${label} (${text}) copied to clipboard.`, 'info');
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> Completed</Badge>;
      case 'Pending':
        return <Badge variant="warning"><Clock className="w-3 h-3" /> Pending</Badge>;
      case 'Failed':
        return <Badge variant="error"><AlertTriangle className="w-3 h-3" /> Failed</Badge>;
      case 'Refunded':
        return <Badge variant="neutral"><RotateCcw className="w-3 h-3" /> Refunded</Badge>;
    }
  };

  const handleRefund = () => {
    setIsUpdating(true);
    setTimeout(() => {
      onUpdateStatus?.(transaction.id, 'Refunded');
      setIsUpdating(false);
      showToast('Transaction Refunded', `Refund of $${transaction.amount.toFixed(2)} processed for ${transaction.customerName}.`, 'warning');
      onClose();
    }, 500);
  };

  const handleMarkCompleted = () => {
    setIsUpdating(true);
    setTimeout(() => {
      onUpdateStatus?.(transaction.id, 'Completed');
      setIsUpdating(false);
      showToast('Transaction Completed', `Status updated to completed for invoice ${transaction.invoiceId}.`, 'success');
      onClose();
    }, 500);
  };

  const handleSendReceipt = () => {
    showToast('Receipt Sent', `Receipt emailed to ${transaction.customerEmail}`, 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      description={`Reference ID: ${transaction.id}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Top Summary Card */}
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
              Gross Amount
            </span>
            <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50 mt-0.5">
              ${transaction.amount.toFixed(2)} {transaction.currency}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Net: <span className="font-mono tabular-nums font-medium text-neutral-800 dark:text-neutral-200">${transaction.netAmount.toFixed(2)}</span>
              {' · '}
              Fee: <span className="font-mono tabular-nums text-neutral-500">${transaction.fee.toFixed(2)}</span>
            </div>
          </div>
          <div>{getStatusBadge(transaction.status)}</div>
        </div>

        {/* Customer & Product Information */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-neutral-400">Customer</span>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              {transaction.customerName}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              {transaction.customerEmail}
              <button
                onClick={() => copyToClipboard(transaction.customerEmail, 'Email')}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
                title="Copy email"
              >
                <Copy className="w-3 h-3" />
              </button>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-neutral-400">Purchased Item</span>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              {transaction.productName}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              Country: {transaction.country}
            </p>
          </div>
        </div>

        {/* Invoice & Method Breakdown */}
        <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400">Invoice Number</span>
            <div className="flex items-center gap-2 font-mono font-medium text-neutral-900 dark:text-neutral-100">
              <span>{transaction.invoiceId}</span>
              <button
                onClick={() => copyToClipboard(transaction.invoiceId, 'Invoice Number')}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400">Payment Method</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
              {transaction.paymentMethod} {transaction.last4 ? `(···· ${transaction.last4})` : ''}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400">Timestamp</span>
            <span className="font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
              {transaction.date} at {transaction.time}
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendReceipt}
              title="Resend receipt email"
            >
              <Send className="w-3.5 h-3.5" />
              Send Receipt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Invoice Downloaded', `${transaction.invoiceId}.pdf saved`, 'success')}
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {transaction.status === 'Pending' && (
              <Button
                variant="primary"
                size="sm"
                isLoading={isUpdating}
                onClick={handleMarkCompleted}
              >
                Mark Completed
              </Button>
            )}

            {transaction.status === 'Completed' && (
              <Button
                variant="danger"
                size="sm"
                isLoading={isUpdating}
                onClick={handleRefund}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Issue Refund
              </Button>
            )}

            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
