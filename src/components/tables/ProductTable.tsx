import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import {
  Search,
  Package,
  Layers,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  Plus
} from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddProduct?: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onSelectProduct,
  onAddProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'price' | 'sales' | 'revenue'>('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortField === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortField === 'sales') {
        return sortOrder === 'asc' ? a.sales - b.sales : b.sales - a.sales;
      }
      if (sortField === 'revenue') {
        return sortOrder === 'asc' ? a.revenue - b.revenue : b.revenue - a.revenue;
      }
      return 0;
    });

    return result;
  }, [products, searchQuery, categoryFilter, statusFilter, sortField, sortOrder]);

  const toggleSort = (field: 'name' | 'price' | 'sales' | 'revenue') => {
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
              Product & Plan Catalog
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Manage subscription tiers, API quotas, and enterprise add-ons
            </p>
          </div>
          {onAddProduct && (
            <Button variant="primary" size="sm" onClick={onAddProduct}>
              <Plus className="w-3.5 h-3.5" />
              New Product
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Search products, SKUs, category..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              aria-label="Filter products by category"
            >
              <option value="all">All Categories</option>
              <option value="SaaS Plan">SaaS Plan</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="API Usage">API Usage</option>
              <option value="Support">Support</option>
              <option value="Add-on">Add-on</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              aria-label="Filter products by status"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>

            {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-1.5 transition-colors underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try changing the category filter or search query."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setCategoryFilter('all');
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
                    <span>Product Name</span>
                    {sortField === 'name' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th
                  onClick={() => toggleSort('price')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Price</span>
                    {sortField === 'price' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('sales')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Sales</span>
                    {sortField === 'sales' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('revenue')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Revenue</span>
                    {sortField === 'revenue' ? (
                      sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {filtered.map(product => (
                <tr
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-600 dark:text-neutral-300 shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                      {product.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-neutral-400 block font-mono">
                      /{product.billingInterval}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                    {product.sales.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                      ${product.revenue.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-mono">
                      +{product.growth}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={product.status === 'Active' ? 'success' : product.status === 'Draft' ? 'warning' : 'neutral'}>
                      {product.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
