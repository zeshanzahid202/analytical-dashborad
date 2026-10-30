import React, { useState } from 'react';
import { Customer, UserPlan, UserStatus } from '../../types';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import {
  Building,
  Mail,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CustomerDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCustomer?: (updated: Customer) => void;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  customer,
  isOpen,
  onClose,
  onUpdateCustomer
}) => {
  const { showToast } = useToast();
  const [seats, setSeats] = useState(customer?.seats || 1);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (customer) {
      setSeats(customer.seats);
    }
  }, [customer]);

  if (!customer) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated: Customer = {
        ...customer,
        seats
      };
      onUpdateCustomer?.(updated);
      setIsSaving(false);
      showToast('Account Updated', `${customer.company} seats adjusted to ${seats}.`, 'success');
      onClose();
    }, 400);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Company Account Details"
      subtitle={`Account ID: ${customer.id}`}
      width="lg"
    >
      <div className="space-y-6">
        {/* Company Header */}
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-base shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
              {customer.company}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Contact: {customer.name} · {customer.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="indigo">{customer.plan}</Badge>
              <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> {customer.status}</Badge>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">Annual Contract Value</span>
            <span className="text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              ${customer.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">Provisioned Seats</span>
            <span className="text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              {customer.seats} seats
            </span>
          </div>
        </div>

        {/* Company Attributes */}
        <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Industry
            </span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {customer.industry}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Customer Since
            </span>
            <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
              {customer.createdDate}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Recent Activity
            </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {customer.lastActivity}
            </span>
          </div>
        </div>

        {/* Seats Modification Form */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Seat License Allocation
            </label>
            <span className="text-xs font-mono tabular-nums text-neutral-500">
              ${(seats * 25).toLocaleString()}/month
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="200"
              value={seats}
              onChange={e => setSeats(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <span className="w-12 text-center text-xs font-bold font-mono tabular-nums p-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
              {seats}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Audit Ledger', `Audit log generated for ${customer.company}`, 'info')}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Audit Log
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isSaving}
              onClick={handleSave}
            >
              Update Account
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
