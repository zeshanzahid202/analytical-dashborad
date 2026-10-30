import React, { useState } from 'react';
import { Product } from '../types';
import { ProductTable } from '../components/tables/ProductTable';
import { ProductDetailModal } from '../components/modals/ProductDetailModal';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

interface ProductsPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (newProduct: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onUpdateProduct,
  onAddProduct
}) => {
  const { showToast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Product['category']>('SaaS Plan');
  const [price, setPrice] = useState('99');
  const [billingInterval, setBillingInterval] = useState<Product['billingInterval']>('monthly');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd: Product = {
      id: `prod_${Math.random().toString(36).substring(2, 9)}`,
      name,
      description: description.trim() || 'Comprehensive platform license tier',
      category,
      price: Number(price),
      billingInterval,
      sales: 0,
      revenue: 0,
      growth: 0,
      status: 'Active'
    };

    onAddProduct(newProd);
    showToast('Product Created', `${newProd.name} added to catalog.`, 'success');
    setIsAddModalOpen(false);
    setName('');
    setDescription('');
    setPrice('99');
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Products & Subscription Plans
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Configure tier pricing, API bundles, add-ons, and sales telemetry.
        </p>
      </div>

      <ProductTable
        products={products}
        onSelectProduct={p => setSelectedProduct(p)}
        onAddProduct={() => setIsAddModalOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onUpdateProduct={onUpdateProduct}
      />

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Plan / Product"
        description="Introduce a new SKU or pricing tier to the checkout catalog"
      >
        <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Product Title
            </label>
            <Input
              required
              placeholder="e.g. Developer Plus"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Short Description
            </label>
            <Input
              placeholder="Key value proposition and features"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Product['category'])}
                className="w-full h-9 px-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
              >
                <option value="SaaS Plan">SaaS Plan</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="API Usage">API Usage</option>
                <option value="Support">Support</option>
                <option value="Add-on">Add-on</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Price (USD)
              </label>
              <Input
                type="number"
                min="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Interval
              </label>
              <select
                value={billingInterval}
                onChange={e => setBillingInterval(e.target.value as Product['billingInterval'])}
                className="w-full h-9 px-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
              >
                <option value="monthly">Monthly</option>
                <option value="annually">Annual</option>
                <option value="one-time">One-Time</option>
                <option value="metered">Metered</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Publish Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
