import React, { useState, useMemo } from 'react';
import { Customer, UserPlan, UserStatus } from '../../types';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Building,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  Building2
} from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onExport?: () => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onSelectCustomer,
  onExport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'company' | 'revenue' | 'seats'>('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = useMemo(() => {
    let result = [...customers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.company.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q)
      );
    }

    if (planFilter !== 'all') {
      result = result.filter(c => c.plan === planFilter);
    }

    result.sort((a, b) => {
      if (sortField === 'company') {
        return sortOrder === 'asc'
          ? a.company.localeCompare(b.company)
          : b.company.localeCompare(a.company);
      }
      if (sortField === 'revenue') {
        return sortOrder === 'asc' ? a.revenue - b.revenue : b.revenue - a.revenue;
      }
      if (sortField === 'seats') {
        return sortOrder === 'asc' ? a.seats - b.seats : b.seats - a.seats;
      }
      return 0;
    });

    return result;
  }, [customers, searchQuery, planFilter, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'company' | 'revenue' | 'seats') => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Customer Accounts
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Client organization roster, license tiers, and annualized spend
            </p>
          </div>
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-3.5 h-3.5" />
              Export Directory
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Search companies, contacts, industry..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={planFilter}
              onChange={e => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              aria-label="Filter customer by plan"
            >
              <option value="all">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Business">Business</option>
              <option value="Pro">Pro</option>
              <option value="Free">Free</option>
            </select>

            {(searchQuery || planFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPlanFilter('all');
                  setCurrentPage(1);
                }}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-1.5 transition-colors underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {paginated.length === 0 ? (
        <EmptyState
          title="No customers match criteria"
          description="Adjust your search query or reset the plan filter."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setPlanFilter('all');
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-neutral-500 dark:text-neutral-400 select-none">
                <th
                  onClick={() => toggleSort('company')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Company & Contact</span>
                    {sortField === 'company' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Plan</th>
                <th
                  onClick={() => toggleSort('revenue')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Revenue (ARR)</span>
                    {sortField === 'revenue' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('seats')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Seats</span>
                    {sortField === 'seats' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Status</th>
                <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {paginated.map(cust => (
                <tr
                  key={cust.id}
                  onClick={() => onSelectCustomer(cust)}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-600 dark:text-neutral-300 shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {cust.company}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate">
                          {cust.name} · {cust.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={cust.plan === 'Enterprise' ? 'indigo' : 'default'}>
                      {cust.plan}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                      ${cust.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                    {cust.seats}
                  </td>

                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <Badge variant={cust.status === 'Active' ? 'success' : 'neutral'}>
                      {cust.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right hidden sm:table-cell text-neutral-500 dark:text-neutral-400">
                    {cust.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div>
            Showing <strong className="font-mono text-neutral-900 dark:text-neutral-100">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="font-mono text-neutral-900 dark:text-neutral-100">
              {Math.min(currentPage * itemsPerPage, filtered.length)}
            </strong>{' '}
            of <strong className="font-mono text-neutral-900 dark:text-neutral-100">{filtered.length}</strong> customers
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
