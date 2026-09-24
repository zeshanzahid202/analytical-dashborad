export type ThemeMode = 'light' | 'dark' | 'system';

export type NavigationItem = {
  id: string;
  name: string;
  href: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
};

export type DateRangeOption = '7d' | '30d' | '90d' | '12m' | 'all';

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  change: number;
  isPositive: boolean;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  iconName: string;
  sparklineData: { val: number }[];
};

export type RevenueDataPoint = {
  date: string;
  current: number;
  previous: number;
  projected?: number;
};

export type UserGrowthPoint = {
  period: string;
  newUsers: number;
  returningUsers: number;
  total: number;
};

export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';

export type PaymentMethodType = 'Credit Card' | 'PayPal' | 'Apple Pay' | 'Bank Transfer';

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethodType;
  cardBrand?: 'visa' | 'mastercard' | 'amex';
  last4?: string;
  date: string;
  time: string;
  productName: string;
  invoiceId: string;
  country: string;
  fee: number;
  netAmount: number;
}

export type UserPlan = 'Free' | 'Pro' | 'Business' | 'Enterprise';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  initials: string;
  plan: UserPlan;
  status: UserStatus;
  totalSpent: number;
  lastActive: string;
  joinedDate: string;
  company?: string;
  role: string;
  location: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: UserPlan;
  revenue: number;
  status: UserStatus;
  lastActivity: string;
  createdDate: string;
  industry: string;
  seats: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'SaaS Plan' | 'Add-on' | 'API Usage' | 'Support' | 'Infrastructure';
  price: number;
  billingInterval: 'monthly' | 'annually' | 'one-time' | 'metered';
  sales: number;
  revenue: number;
  status: 'Active' | 'Draft' | 'Archived';
  description: string;
  growth: number;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Revenue' | 'Users' | 'Sales' | 'Customers';
  description: string;
  date: string;
  period: string;
  status: 'Generated' | 'Ready' | 'Scheduled' | 'Processing';
  fileFormat: 'PDF' | 'CSV' | 'XLSX';
  fileSize: string;
  downloadCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  timestamp: number;
  isRead: boolean;
  type: 'payment' | 'user' | 'upgrade' | 'alert' | 'report';
  link?: string;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  conversionRate: number;
  color: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  dropoffRate: number;
}

export interface RetentionCohort {
  cohort: string;
  size: number;
  m0: number;
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}
