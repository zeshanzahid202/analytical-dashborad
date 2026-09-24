import React, { useState } from 'react';
import { User, UserPlan, UserStatus } from '../../types';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import {
  Mail,
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Shield,
  CreditCard,
  Send,
  AlertOctagon,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface UserProfileDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser?: (updated: User) => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUser
}) => {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<UserPlan>(user?.plan || 'Pro');
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(user?.status || 'Active');
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (user) {
      setSelectedPlan(user.plan);
      setSelectedStatus(user.status);
    }
  }, [user]);

  if (!user) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated: User = {
        ...user,
        plan: selectedPlan,
        status: selectedStatus
      };
      onUpdateUser?.(updated);
      setIsSaving(false);
      showToast('Profile Updated', `${user.name}'s plan changed to ${selectedPlan} (${selectedStatus}).`, 'success');
      onClose();
    }, 400);
  };

  const handleSendReset = () => {
    showToast('Reset Link Dispatched', `Password reset token sent to ${user.email}`, 'info');
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
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile"
      subtitle={`Member ID: ${user.id}`}
      width="lg"
    >
      <div className="space-y-6">
        {/* User Identity Header */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border ${user.avatarColor}`}>
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
              {user.name}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {getPlanBadge(user.plan)}
              {getStatusBadge(user.status)}
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">Total Lifetime Spend</span>
            <span className="text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              ${user.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">Last Active</span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {user.lastActive}
            </span>
          </div>
        </div>

        {/* Detailed Metadata */}
        <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" /> Company
            </span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {user.company || 'Personal Account'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Role
            </span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {user.role}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Location
            </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {user.location}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Joined Date
            </span>
            <span className="font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
              {user.joinedDate}
            </span>
          </div>
        </div>

        {/* Account Controls */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-4">
          <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Manage Access & Plan
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-neutral-500 dark:text-neutral-400 mb-1">
                Subscription Plan
              </label>
              <select
                value={selectedPlan}
                onChange={e => setSelectedPlan(e.target.value as UserPlan)}
                className="w-full h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="Free">Free ($0/mo)</option>
                <option value="Pro">Pro ($299/mo)</option>
                <option value="Business">Business ($599/mo)</option>
                <option value="Enterprise">Enterprise ($1,490/mo)</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-500 dark:text-neutral-400 mb-1">
                Account Status
              </label>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as UserStatus)}
                className="w-full h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendReset}
              className="text-xs w-full"
            >
              <Mail className="w-3.5 h-3.5" />
              Reset Password
            </Button>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isSaving}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
