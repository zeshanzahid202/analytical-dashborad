import React, { useState } from 'react';
import { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { Tag, TrendingUp, DollarSign, ShoppingBag, Layers, CheckCircle2 } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct?: (updated: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onUpdateProduct
}) => {
  const { showToast } = useToast();
  const [price, setPrice] = useState(product?.price || 0);
  const [status, setStatus] = useState<'Active' | 'Draft' | 'Archived'>(product?.status || 'Active');
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (product) {
      setPrice(product.price);
      setStatus(product.status);
    }
  }, [product]);

  if (!product) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated: Product = {
        ...product,
        price,
        status
      };
      onUpdateProduct?.(updated);
      setIsSaving(false);
      showToast('Product Updated', `${product.name} settings saved successfully.`, 'success');
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Configuration"
      description={`SKU Code: ${product.id}`}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Top Product Card */}
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Category: {product.category}</span>
            <Badge variant={status === 'Active' ? 'success' : 'neutral'}>{status}</Badge>
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-1">
            {product.name}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Sales & Metric Stats */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">Total Sales</span>
            <span className="text-base font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              {product.sales.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">Total Revenue</span>
            <span className="text-base font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              ${product.revenue.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <span className="text-neutral-400 block mb-1">MoM Growth</span>
            <span className="text-base font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              +{product.growth}%
            </span>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Unit Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400 font-mono text-xs">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full h-9 pl-7 pr-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-mono tabular-nums text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Release Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full h-9 px-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              >
                <option value="Active">Active (In Catalog)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
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
    </Modal>
  );
};
