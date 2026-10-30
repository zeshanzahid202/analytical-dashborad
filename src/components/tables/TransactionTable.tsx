import React, { useState, useMemo } from 'react';
import { Transaction, TransactionStatus, PaymentMethodType } from '../../types';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
  title?: string;
  description?: string;
  showFilters?: boolean;
  limit?: number;
  onExport?: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onSelectTransaction,
  title,
  description,
  showFilters = true,
  limit,
  onExport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'date' | 'amount' | 'customer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = limit || 8;

  // Filter and Sort Logic
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.customerName.toLowerCase().includes(q) ||
          t.customerEmail.toLowerCase().includes(q) ||
          t.invoiceId.toLowerCase().includes(q) ||
          t.productName.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }

    if (methodFilter !== 'all') {
      result = result.filter(t => t.paymentMethod === methodFilter);
    }

    result.sort((a, b) => {
      if (sortField === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortField === 'customer') {
        return sortOrder === 'asc'
          ? a.customerName.localeCompare(b.customerName)
          : b.customerName.localeCompare(a.customerName);
      }
      // Default date sort
      return sortOrder === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return result;
  }, [transactions, searchQuery, statusFilter, methodFilter, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: 'date' | 'amount' | 'customer') => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
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

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
      {/* Table Header / Action Controls */}
      <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
        {(title || description || onExport) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              {title && (
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {description}
                </p>
              )}
            </div>
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            )}
          </div>
        )}

        {showFilters && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="w-full sm:max-w-xs">
              <Input
                placeholder="Search transactions, customer, invoice..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                icon={<Search className="w-4 h-4" />}
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 cursor-pointer"
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>

              {/* Payment Method Filter */}
              <select
                value={methodFilter}
                onChange={e => {
                  setMethodFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 cursor-pointer"
                aria-label="Filter by payment method"
              >
                <option value="all">All Methods</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Apple Pay">Apple Pay</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>

              {(searchQuery || statusFilter !== 'all' || methodFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setMethodFilter('all');
                    setCurrentPage(1);
                  }}
                  className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-1.5 transition-colors underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Responsive Table */}
      {paginatedTransactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'No transactions matched your current search filters. Try adjusting your query.'
              : 'There are no transactions recorded in this period.'
          }
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setMethodFilter('all');
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-neutral-500 dark:text-neutral-400 select-none">
                <th
                  onClick={() => toggleSort('customer')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Customer</span>
                    {sortField === 'customer' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('amount')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Amount</span>
                    {sortField === 'amount' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Payment Method</th>
                <th
                  onClick={() => toggleSort('date')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Date</span>
                    {sortField === 'date' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {paginatedTransactions.map(tx => (
                <tr
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
                >
                  {/* Customer Column */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-semibold text-[11px] text-neutral-700 dark:text-neutral-300 shrink-0">
                        {tx.customerName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {tx.customerName}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate">
                          {tx.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Amount Column */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                      ${tx.amount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-neutral-400 ml-1 font-mono uppercase">
                      {tx.currency}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(tx.status)}
                  </td>

                  {/* Payment Method */}
                  <td className="py-3.5 px-4 hidden md:table-cell text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{tx.paymentMethod}</span>
                      {tx.last4 && (
                        <span className="font-mono text-neutral-400 text-[11px]">
                          (··{tx.last4})
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200 text-xs">
                      {tx.date}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {tx.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {!limit && totalPages > 1 && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div>
            Showing <strong className="font-mono text-neutral-900 dark:text-neutral-100">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="font-mono text-neutral-900 dark:text-neutral-100">
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
            </strong>{' '}
            of <strong className="font-mono text-neutral-900 dark:text-neutral-100">{filteredTransactions.length}</strong> transactions
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono tabular-nums">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
