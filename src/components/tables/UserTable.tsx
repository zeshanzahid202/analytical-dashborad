import React, { useState, useMemo } from 'react';
import { User, UserPlan, UserStatus } from '../../types';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  UserPlus
} from 'lucide-react';

interface UserTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onAddUser?: () => void;
  onExport?: () => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onSelectUser,
  onAddUser,
  onExport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'spent' | 'lastActive' | 'joined'>('spent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.company && u.company.toLowerCase().includes(q))
      );
    }

    if (planFilter !== 'all') {
      result = result.filter(u => u.plan === planFilter);
    }

    if (statusFilter !== 'all') {
      result = result.filter(u => u.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortField === 'spent') {
        return sortOrder === 'asc' ? a.totalSpent - b.totalSpent : b.totalSpent - a.totalSpent;
      }
      if (sortField === 'joined') {
        return sortOrder === 'asc'
          ? new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
          : new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
      }
      return 0;
    });

    return result;
  }, [users, searchQuery, planFilter, statusFilter, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: 'name' | 'spent' | 'lastActive' | 'joined') => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getPlanBadge = (plan: UserPlan) => {
    switch (plan) {
      case 'Enterprise':
        return <Badge variant="indigo">Enterprise</Badge>;
      case 'Business':
        return <Badge variant="default">Business</Badge>;
      case 'Pro':
        return <Badge variant="success">Pro</Badge>;
      case 'Free':
        return <Badge variant="neutral">Free</Badge>;
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> Active</Badge>;
      case 'Inactive':
        return <Badge variant="neutral"><Clock className="w-3 h-3" /> Inactive</Badge>;
      case 'Suspended':
        return <Badge variant="error"><XCircle className="w-3 h-3" /> Suspended</Badge>;
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Users Directory
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Manage accounts, permission tiers, and lifetime engagement
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
            )}
            {onAddUser && (
              <Button variant="primary" size="sm" onClick={onAddUser}>
                <UserPlus className="w-3.5 h-3.5" />
                Invite User
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Search by name, email, company..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={planFilter}
              onChange={e => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              aria-label="Filter by plan"
            >
              <option value="all">All Plans</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Business">Business</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              aria-label="Filter by user status"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

            {(searchQuery || planFilter !== 'all' || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPlanFilter('all');
                  setStatusFilter('all');
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

      {/* Users Table */}
      {paginatedUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try adjusting your search criteria or clearing active filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setPlanFilter('all');
            setStatusFilter('all');
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-neutral-500 dark:text-neutral-400 select-none">
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center gap-1.5">
                    <span>User</span>
                    {sortField === 'name' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Plan</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th
                  onClick={() => toggleSort('spent')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Total Spent</span>
                    {sortField === 'spent' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold hidden lg:table-cell">Last Active</th>
                <th
                  onClick={() => toggleSort('joined')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Joined Date</span>
                    {sortField === 'joined' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {paginatedUsers.map(user => (
                <tr
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
                >
                  {/* Name and Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 ${user.avatarColor}`}>
                        {user.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Plan Badge */}
                  <td className="py-3.5 px-4">{getPlanBadge(user.plan)}</td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">{getStatusBadge(user.status)}</td>

                  {/* Total Spent */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                      ${user.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Last Active */}
                  <td className="py-3.5 px-4 hidden lg:table-cell text-neutral-500 dark:text-neutral-400">
                    {user.lastActive}
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                    {user.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div>
            Showing <strong className="font-mono text-neutral-900 dark:text-neutral-100">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="font-mono text-neutral-900 dark:text-neutral-100">
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
            </strong>{' '}
            of <strong className="font-mono text-neutral-900 dark:text-neutral-100">{filteredUsers.length}</strong> users
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
