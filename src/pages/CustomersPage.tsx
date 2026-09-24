import React, { useState } from 'react';
import { Customer } from '../types';
import { CustomerTable } from '../components/tables/CustomerTable';
import { CustomerDrawer } from '../components/drawers/CustomerDrawer';
import { useToast } from '../context/ToastContext';

interface CustomersPageProps {
  customers: Customer[];
  onUpdateCustomer: (updated: Customer) => void;
}

export const CustomersPage: React.FC<CustomersPageProps> = ({
  customers,
  onUpdateCustomer
}) => {
  const { showToast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleExport = () => {
    showToast('Export Ready', `Exported ${customers.length} B2B accounts.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Customer Organizations
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Enterprise accounts, contract values, seat distributions, and relationship health.
        </p>
      </div>

      <CustomerTable
        customers={customers}
        onSelectCustomer={c => setSelectedCustomer(c)}
        onExport={handleExport}
      />

      <CustomerDrawer
        customer={selectedCustomer}
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        onUpdateCustomer={onUpdateCustomer}
      />
    </div>
  );
};
