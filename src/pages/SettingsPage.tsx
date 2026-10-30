import { usePersistentState } from '../hooks/usePersistentState';
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import {
  User,
  Building,
  Bell,
  Key,
  Shield,
  Sun,
  Moon,
  Monitor,
  Copy,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const { theme, setTheme } = useTheme();

  // Profile Form
  const [name, setName] = usePersistentState('vanguard_setting_name', 'Zeshan Zahid');
  const [email, setEmail] = usePersistentState('vanguard_setting_email', 'zeshanzahid202@gmail.com');
  const [company, setCompany] = usePersistentState('vanguard_setting_company', 'Vanguard Analytics Inc.');
  const [timezone, setTimezone] = usePersistentState('vanguard_setting_timezone', 'America/New_York (UTC-5)');
  const [currency, setCurrency] = usePersistentState('vanguard_setting_currency', 'USD ($)');

  // Notifications
  const [emailAlerts, setEmailAlerts] = usePersistentState('vanguard_setting_emailAlerts', true);
  const [weeklyDigest, setWeeklyDigest] = usePersistentState('vanguard_setting_weeklyDigest', true);
  const [failedPaymentAlert, setFailedPaymentAlert] = usePersistentState('vanguard_setting_failedPaymentAlert', true);
  const [userSignupAlert, setUserSignupAlert] = usePersistentState('vanguard_setting_userSignupAlert', false);

  // Security / API
  const [apiKey, setApiKey] = usePersistentState('vanguard_setting_apiKey', 'vg_demo_8f3a9e22b0c144e59047b19');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings Saved', 'Profile and workspace preferences updated.', 'success');
    }, 400);
  };

  const handleRollKey = () => {
    const newKey = `vg_demo_${Math.random().toString(36).substring(2, 14)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKey(newKey);
    showToast('API Key Rotated', 'Demo identifier changed in this browser. No server credentials are issued.', 'warning');
  };

  const copyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    showToast('Copied', 'API secret key copied to clipboard.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in-0 duration-200">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Account & System Settings
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Configure profile identities, organizational defaults, API credentials, and notifications.
        </p>
      </div>

      {/* Profile Section */}
      <form onSubmit={handleSaveProfile} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Profile & Organization
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
            ZZ
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {name}
            </p>
            <p className="text-xs text-neutral-400">
              Workspace Administrator · Superuser
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Full Name
            </label>
            <Input required value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Company Name
            </label>
            <Input value={company} onChange={e => setCompany(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              className="w-full h-9 px-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
            >
              <option value="America/New_York (UTC-5)">Eastern Time (US & Canada)</option>
              <option value="America/Los_Angeles (UTC-8)">Pacific Time (US & Canada)</option>
              <option value="Europe/London (UTC+0)">London (GMT)</option>
              <option value="Asia/Tokyo (UTC+9)">Tokyo (JST)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm" type="submit" isLoading={isSaving}>
            Save Profile
          </Button>
        </div>
      </form>

      {/* Notification Preferences */}
      <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Notification Rules
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                Large Transaction Alert
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                Receive instant dispatch whenever an order exceeds $1,000 USD
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={e => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                Weekly Revenue Digest
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                Saved preference only; email delivery requires a backend integration
              </p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={e => setWeeklyDigest(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                Failed Checkout / Webhook Exceptions
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                Saved preference for a future payment integration
              </p>
            </div>
            <input
              type="checkbox"
              checked={failedPaymentAlert}
              onChange={e => setFailedPaymentAlert(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* API Keys & Developers */}
      <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
          <Key className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Demo API Identifier
          </h3>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Preview identifier only. This static demo does not provide an API or authentication.
        </p>

        <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="font-mono text-neutral-800 dark:text-neutral-200 truncate">
            {apiKey}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={copyKey}>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleRollKey}>
              <RefreshCw className="w-3.5 h-3.5" />
              Roll Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
