import React, { useState } from 'react';
import { User, UserPlan, UserStatus } from '../types';
import { UserTable } from '../components/tables/UserTable';
import { UserProfileDrawer } from '../components/drawers/UserProfileDrawer';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

interface UsersPageProps {
  users: User[];
  onUpdateUser: (updated: User) => void;
  onAddUser: (newUser: User) => void;
}

export const UsersPage: React.FC<UsersPageProps> = ({
  users,
  onUpdateUser,
  onAddUser
}) => {
  const { showToast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // New User Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [plan, setPlan] = useState<UserPlan>('Pro');
  const [role, setRole] = useState('Member');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Validation Error', 'Name and email are required.', 'error');
      return;
    }

    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      initials: initials || 'US',
      avatarColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      company: company.trim() || 'Independent',
      role,
      plan,
      status: 'Active',
      totalSpent: 0,
      lastActive: 'Just now',
      joinedDate: new Date().toISOString().split('T')[0],
      location: 'United States'
    };

    onAddUser(newUser);
    showToast('Invitation Dispatched', `Invited ${newUser.name} (${newUser.email}) to the platform.`, 'success');
    setIsInviteModalOpen(false);
    setName('');
    setEmail('');
    setCompany('');
  };

  const handleExport = () => {
    showToast('Export Ready', `Exported ${users.length} user directory profiles.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          User Management
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Monitor user growth, license assignments, permission roles, and activity statuses.
        </p>
      </div>

      <UserTable
        users={users}
        onSelectUser={u => setSelectedUser(u)}
        onAddUser={() => setIsInviteModalOpen(true)}
        onExport={handleExport}
      />

      <UserProfileDrawer
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        onUpdateUser={onUpdateUser}
      />

      {/* Invite User Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New User"
        description="Send an invitation link with preconfigured license and permission tier"
      >
        <form onSubmit={handleInvite} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Full Name
            </label>
            <Input
              required
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Work Email Address
            </label>
            <Input
              required
              type="email"
              placeholder="sarah@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Company / Workspace
            </label>
            <Input
              placeholder="e.g. Acme Corp"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Tier Plan
              </label>
              <select
                value={plan}
                onChange={e => setPlan(e.target.value as UserPlan)}
                className="w-full h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              >
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Business">Business</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Role Permission
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              >
                <option value="Admin">Admin</option>
                <option value="Billing Lead">Billing Lead</option>
                <option value="Member">Member</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
