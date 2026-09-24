import {
  DashboardMetric,
  RevenueDataPoint,
  UserGrowthPoint,
  Transaction,
  User,
  Customer,
  Product,
  ReportItem,
  NotificationItem,
  TrafficSource,
  FunnelStage,
  RetentionCohort
} from '../types';

export const INITIAL_METRICS: DashboardMetric[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$84,240',
    numericValue: 84240,
    change: 12.8,
    isPositive: true,
    trend: 'up',
    timeframe: 'vs last month',
    iconName: 'DollarSign',
    sparklineData: [
      { val: 68 }, { val: 72 }, { val: 70 }, { val: 76 }, { val: 74 }, { val: 79 }, { val: 82 }, { val: 84.2 }
    ]
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '12,480',
    numericValue: 12480,
    change: 8.4,
    isPositive: true,
    trend: 'up',
    timeframe: 'vs last month',
    iconName: 'Users',
    sparklineData: [
      { val: 10.2 }, { val: 10.8 }, { val: 11.1 }, { val: 11.5 }, { val: 11.7 }, { val: 12.0 }, { val: 12.2 }, { val: 12.48 }
    ]
  },
  {
    id: 'transactions',
    label: 'Total Transactions',
    value: '8,642',
    numericValue: 8642,
    change: 15.2,
    isPositive: true,
    trend: 'up',
    timeframe: 'vs last month',
    iconName: 'CreditCard',
    sparklineData: [
      { val: 6.9 }, { val: 7.2 }, { val: 7.4 }, { val: 7.8 }, { val: 8.1 }, { val: 8.0 }, { val: 8.4 }, { val: 8.64 }
    ]
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '4.82%',
    numericValue: 4.82,
    change: 2.4,
    isPositive: true,
    trend: 'up',
    timeframe: 'vs last month',
    iconName: 'Activity',
    sparklineData: [
      { val: 4.2 }, { val: 4.3 }, { val: 4.1 }, { val: 4.4 }, { val: 4.5 }, { val: 4.6 }, { val: 4.75 }, { val: 4.82 }
    ]
  }
];

export const REVENUE_DATA_BY_RANGE: Record<string, RevenueDataPoint[]> = {
  '7d': [
    { date: 'Sep 18', current: 2840, previous: 2510 },
    { date: 'Sep 19', current: 3120, previous: 2790 },
    { date: 'Sep 20', current: 2980, previous: 2850 },
    { date: 'Sep 21', current: 3450, previous: 3010 },
    { date: 'Sep 22', current: 3820, previous: 3200 },
    { date: 'Sep 23', current: 4190, previous: 3650 },
    { date: 'Sep 24', current: 4480, previous: 3890 }
  ],
  '30d': [
    { date: 'Aug 26', current: 18200, previous: 16100 },
    { date: 'Sep 02', current: 19800, previous: 17400 },
    { date: 'Sep 09', current: 21400, previous: 18900 },
    { date: 'Sep 16', current: 23100, previous: 20200 },
    { date: 'Sep 24', current: 24800, previous: 21500 }
  ],
  '90d': [
    { date: 'Jul W1', current: 17500, previous: 15200 },
    { date: 'Jul W3', current: 19200, previous: 16800 },
    { date: 'Aug W1', current: 21400, previous: 18400 },
    { date: 'Aug W3', current: 23600, previous: 20100 },
    { date: 'Sep W1', current: 25800, previous: 22400 },
    { date: 'Sep W3', current: 28900, previous: 24600 }
  ],
  '12m': [
    { date: 'Oct', current: 52400, previous: 44200 },
    { date: 'Nov', current: 56800, previous: 47100 },
    { date: 'Dec', current: 63200, previous: 52000 },
    { date: 'Jan', current: 59400, previous: 51200 },
    { date: 'Feb', current: 64100, previous: 54900 },
    { date: 'Mar', current: 68500, previous: 58400 },
    { date: 'Apr', current: 71200, previous: 61800 },
    { date: 'May', current: 74900, previous: 64200 },
    { date: 'Jun', current: 77800, previous: 67100 },
    { date: 'Jul', current: 79900, previous: 69400 },
    { date: 'Aug', current: 82100, previous: 72000 },
    { date: 'Sep', current: 84240, previous: 74600 }
  ]
};

export const USER_GROWTH_BY_FILTER: Record<string, UserGrowthPoint[]> = {
  weekly: [
    { period: 'Mon', newUsers: 240, returningUsers: 890, total: 1130 },
    { period: 'Tue', newUsers: 310, returningUsers: 980, total: 1290 },
    { period: 'Wed', newUsers: 285, returningUsers: 1040, total: 1325 },
    { period: 'Thu', newUsers: 340, returningUsers: 1120, total: 1460 },
    { period: 'Fri', newUsers: 410, returningUsers: 1230, total: 1640 },
    { period: 'Sat', newUsers: 195, returningUsers: 760, total: 955 },
    { period: 'Sun', newUsers: 215, returningUsers: 810, total: 1025 }
  ],
  monthly: [
    { period: 'Week 1', newUsers: 1420, returningUsers: 5120, total: 6540 },
    { period: 'Week 2', newUsers: 1680, returningUsers: 5640, total: 7320 },
    { period: 'Week 3', newUsers: 1890, returningUsers: 6080, total: 7970 },
    { period: 'Week 4', newUsers: 2140, returningUsers: 6720, total: 8860 }
  ],
  yearly: [
    { period: 'Q1 25', newUsers: 4200, returningUsers: 14800, total: 19000 },
    { period: 'Q2 25', newUsers: 5100, returningUsers: 18200, total: 23300 },
    { period: 'Q3 25', newUsers: 6400, returningUsers: 22900, total: 29300 },
    { period: 'Q4 25', newUsers: 7800, returningUsers: 27400, total: 35200 },
    { period: 'Q1 26', newUsers: 8900, returningUsers: 32100, total: 41000 },
    { period: 'Q2 26', newUsers: 10400, returningUsers: 37800, total: 48200 },
    { period: 'Q3 26', newUsers: 12480, returningUsers: 44200, total: 56680 }
  ]
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_9841',
    customerName: 'Marcus Aurel',
    customerEmail: 'm.aurel@vertexscale.io',
    amount: 1490.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    cardBrand: 'visa',
    last4: '4242',
    date: 'Sep 24, 2026',
    time: '09:42 AM',
    productName: 'Enterprise SaaS Tier',
    invoiceId: 'INV-2026-0891',
    country: 'United States',
    fee: 43.21,
    netAmount: 1446.79
  },
  {
    id: 'tx_9840',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@novapulse.de',
    amount: 299.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Apple Pay',
    cardBrand: 'mastercard',
    last4: '8819',
    date: 'Sep 24, 2026',
    time: '08:15 AM',
    productName: 'Pro Tier Subscription',
    invoiceId: 'INV-2026-0890',
    country: 'Germany',
    fee: 8.97,
    netAmount: 290.03
  },
  {
    id: 'tx_9839',
    customerName: 'Devon Vance',
    customerEmail: 'devon@hyperflow.co',
    amount: 850.00,
    currency: 'USD',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    last4: '9012',
    date: 'Sep 23, 2026',
    time: '04:30 PM',
    productName: 'Dedicated IP Cluster',
    invoiceId: 'INV-2026-0889',
    country: 'United Kingdom',
    fee: 12.50,
    netAmount: 837.50
  },
  {
    id: 'tx_9838',
    customerName: 'Sophia Chen',
    customerEmail: 'sophia@lumencraft.ai',
    amount: 49.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    cardBrand: 'visa',
    last4: '1094',
    date: 'Sep 23, 2026',
    time: '02:11 PM',
    productName: 'API Credits Pack (50k)',
    invoiceId: 'INV-2026-0888',
    country: 'Canada',
    fee: 1.72,
    netAmount: 47.28
  },
  {
    id: 'tx_9837',
    customerName: 'Kasper Lindqvist',
    customerEmail: 'kasper@nordicbyte.se',
    amount: 599.00,
    currency: 'USD',
    status: 'Failed',
    paymentMethod: 'Credit Card',
    cardBrand: 'mastercard',
    last4: '3049',
    date: 'Sep 23, 2026',
    time: '11:04 AM',
    productName: 'Business Tier Subscription',
    invoiceId: 'INV-2026-0887',
    country: 'Sweden',
    fee: 0,
    netAmount: 0
  },
  {
    id: 'tx_9836',
    customerName: 'Amara Okafor',
    customerEmail: 'amara@strataops.ng',
    amount: 320.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'PayPal',
    last4: 'PAYP',
    date: 'Sep 22, 2026',
    time: '07:54 PM',
    productName: 'Team Seats Add-on (5x)',
    invoiceId: 'INV-2026-0886',
    country: 'Nigeria',
    fee: 11.20,
    netAmount: 308.80
  },
  {
    id: 'tx_9835',
    customerName: 'Lucas Morales',
    customerEmail: 'lucas@valorex.io',
    amount: 199.00,
    currency: 'USD',
    status: 'Refunded',
    paymentMethod: 'Credit Card',
    cardBrand: 'amex',
    last4: '6712',
    date: 'Sep 22, 2026',
    time: '03:22 PM',
    productName: 'Pro Tier Subscription',
    invoiceId: 'INV-2026-0885',
    country: 'Spain',
    fee: 0,
    netAmount: -199.00
  },
  {
    id: 'tx_9834',
    customerName: 'Chloe Bennett',
    customerEmail: 'chloe@aerolink.org',
    amount: 2450.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    last4: '3341',
    date: 'Sep 22, 2026',
    time: '10:08 AM',
    productName: 'Enterprise SLA & Support',
    invoiceId: 'INV-2026-0884',
    country: 'Australia',
    fee: 25.00,
    netAmount: 2425.00
  },
  {
    id: 'tx_9833',
    customerName: 'Liam O’Connor',
    customerEmail: 'liam@dublinfin.ie',
    amount: 299.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    cardBrand: 'visa',
    last4: '5561',
    date: 'Sep 21, 2026',
    time: '05:40 PM',
    productName: 'Pro Tier Subscription',
    invoiceId: 'INV-2026-0883',
    country: 'Ireland',
    fee: 8.97,
    netAmount: 290.03
  },
  {
    id: 'tx_9832',
    customerName: 'Yuki Takahashi',
    customerEmail: 'yuki@tokyodatallc.jp',
    amount: 750.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Apple Pay',
    cardBrand: 'mastercard',
    last4: '4190',
    date: 'Sep 21, 2026',
    time: '01:19 PM',
    productName: 'Business Tier Subscription',
    invoiceId: 'INV-2026-0882',
    country: 'Japan',
    fee: 22.50,
    netAmount: 727.50
  },
  {
    id: 'tx_9831',
    customerName: 'Julian Mercer',
    customerEmail: 'julian@orbitmesh.io',
    amount: 120.00,
    currency: 'USD',
    status: 'Pending',
    paymentMethod: 'Credit Card',
    cardBrand: 'visa',
    last4: '9920',
    date: 'Sep 20, 2026',
    time: '04:12 PM',
    productName: 'Storage Expansion (2TB)',
    invoiceId: 'INV-2026-0881',
    country: 'United States',
    fee: 3.78,
    netAmount: 116.22
  },
  {
    id: 'tx_9830',
    customerName: 'Nadia Petrov',
    customerEmail: 'nadia@synapseai.ch',
    amount: 3200.00,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    last4: '7182',
    date: 'Sep 20, 2026',
    time: '11:45 AM',
    productName: 'Custom Annual Contract',
    invoiceId: 'INV-2026-0880',
    country: 'Switzerland',
    fee: 30.00,
    netAmount: 3170.00
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_01',
    name: 'Marcus Aurel',
    email: 'm.aurel@vertexscale.io',
    avatarColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    initials: 'MA',
    plan: 'Enterprise',
    status: 'Active',
    totalSpent: 18450.00,
    lastActive: '12 mins ago',
    joinedDate: 'Jan 14, 2025',
    company: 'Vertex Scale',
    role: 'VP of Engineering',
    location: 'San Francisco, US'
  },
  {
    id: 'usr_02',
    name: 'Elena Rostova',
    email: 'elena@novapulse.de',
    avatarColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    initials: 'ER',
    plan: 'Pro',
    status: 'Active',
    totalSpent: 3588.00,
    lastActive: '2 hours ago',
    joinedDate: 'Mar 22, 2025',
    company: 'Nova Pulse Media',
    role: 'Lead Data Analyst',
    location: 'Berlin, Germany'
  },
  {
    id: 'usr_03',
    name: 'Devon Vance',
    email: 'devon@hyperflow.co',
    avatarColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    initials: 'DV',
    plan: 'Business',
    status: 'Active',
    totalSpent: 9240.00,
    lastActive: '1 day ago',
    joinedDate: 'Nov 08, 2024',
    company: 'HyperFlow Systems',
    role: 'CTO',
    location: 'London, UK'
  },
  {
    id: 'usr_04',
    name: 'Sophia Chen',
    email: 'sophia@lumencraft.ai',
    avatarColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    initials: 'SC',
    plan: 'Pro',
    status: 'Active',
    totalSpent: 1470.00,
    lastActive: 'Just now',
    joinedDate: 'May 19, 2025',
    company: 'LumenCraft AI',
    role: 'AI Research Lead',
    location: 'Toronto, Canada'
  },
  {
    id: 'usr_05',
    name: 'Kasper Lindqvist',
    email: 'kasper@nordicbyte.se',
    avatarColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    initials: 'KL',
    plan: 'Business',
    status: 'Suspended',
    totalSpent: 4792.00,
    lastActive: '3 days ago',
    joinedDate: 'Feb 03, 2025',
    company: 'Nordic Byte AB',
    role: 'Infrastructure Lead',
    location: 'Stockholm, Sweden'
  },
  {
    id: 'usr_06',
    name: 'Amara Okafor',
    email: 'amara@strataops.ng',
    avatarColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    initials: 'AO',
    plan: 'Pro',
    status: 'Active',
    totalSpent: 2880.00,
    lastActive: '5 hours ago',
    joinedDate: 'Jun 11, 2025',
    company: 'Strata Ops',
    role: 'Operations Director',
    location: 'Lagos, Nigeria'
  },
  {
    id: 'usr_07',
    name: 'Lucas Morales',
    email: 'lucas@valorex.io',
    avatarColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    initials: 'LM',
    plan: 'Free',
    status: 'Inactive',
    totalSpent: 0.00,
    lastActive: '2 weeks ago',
    joinedDate: 'Aug 30, 2025',
    company: 'Valorex Studio',
    role: 'Founder',
    location: 'Madrid, Spain'
  },
  {
    id: 'usr_08',
    name: 'Chloe Bennett',
    email: 'chloe@aerolink.org',
    avatarColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    initials: 'CB',
    plan: 'Enterprise',
    status: 'Active',
    totalSpent: 29400.00,
    lastActive: '30 mins ago',
    joinedDate: 'Sep 10, 2024',
    company: 'AeroLink Telemetry',
    role: 'Head of Reliability',
    location: 'Sydney, Australia'
  },
  {
    id: 'usr_09',
    name: 'Liam O’Connor',
    email: 'liam@dublinfin.ie',
    avatarColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    initials: 'LO',
    plan: 'Pro',
    status: 'Active',
    totalSpent: 2392.00,
    lastActive: '4 hours ago',
    joinedDate: 'Dec 01, 2024',
    company: 'Dublin FinTech Lab',
    role: 'Senior Architect',
    location: 'Dublin, Ireland'
  },
  {
    id: 'usr_10',
    name: 'Yuki Takahashi',
    email: 'yuki@tokyodatallc.jp',
    avatarColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    initials: 'YT',
    plan: 'Business',
    status: 'Active',
    totalSpent: 8250.00,
    lastActive: '18 mins ago',
    joinedDate: 'Apr 17, 2025',
    company: 'Tokyo Data LLC',
    role: 'Product Director',
    location: 'Tokyo, Japan'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    name: 'Marcus Aurel',
    email: 'm.aurel@vertexscale.io',
    company: 'Vertex Scale',
    plan: 'Enterprise',
    revenue: 18450.00,
    status: 'Active',
    lastActivity: '12 mins ago',
    createdDate: 'Jan 14, 2025',
    industry: 'Cloud Infrastructure',
    seats: 48
  },
  {
    id: 'cust_02',
    name: 'Chloe Bennett',
    email: 'chloe@aerolink.org',
    company: 'AeroLink Telemetry',
    plan: 'Enterprise',
    revenue: 29400.00,
    status: 'Active',
    lastActivity: '30 mins ago',
    createdDate: 'Sep 10, 2024',
    industry: 'Aerospace & Logistics',
    seats: 120
  },
  {
    id: 'cust_03',
    name: 'Devon Vance',
    email: 'devon@hyperflow.co',
    company: 'HyperFlow Systems',
    plan: 'Business',
    revenue: 9240.00,
    status: 'Active',
    lastActivity: '1 day ago',
    createdDate: 'Nov 08, 2024',
    industry: 'Developer Tools',
    seats: 25
  },
  {
    id: 'cust_04',
    name: 'Yuki Takahashi',
    email: 'yuki@tokyodatallc.jp',
    company: 'Tokyo Data LLC',
    plan: 'Business',
    revenue: 8250.00,
    status: 'Active',
    lastActivity: '18 mins ago',
    createdDate: 'Apr 17, 2025',
    industry: 'Big Data & AI',
    seats: 30
  },
  {
    id: 'cust_05',
    name: 'Elena Rostova',
    email: 'elena@novapulse.de',
    company: 'Nova Pulse Media',
    plan: 'Pro',
    revenue: 3588.00,
    status: 'Active',
    lastActivity: '2 hours ago',
    createdDate: 'Mar 22, 2025',
    industry: 'Digital Publishing',
    seats: 8
  },
  {
    id: 'cust_06',
    name: 'Amara Okafor',
    email: 'amara@strataops.ng',
    company: 'Strata Ops',
    plan: 'Pro',
    revenue: 2880.00,
    status: 'Active',
    lastActivity: '5 hours ago',
    createdDate: 'Jun 11, 2025',
    industry: 'Telecom Logistics',
    seats: 12
  },
  {
    id: 'cust_07',
    name: 'Sophia Chen',
    email: 'sophia@lumencraft.ai',
    company: 'LumenCraft AI',
    plan: 'Pro',
    revenue: 1470.00,
    status: 'Active',
    lastActivity: 'Just now',
    createdDate: 'May 19, 2025',
    industry: 'Generative Models',
    seats: 5
  },
  {
    id: 'cust_08',
    name: 'Lucas Morales',
    email: 'lucas@valorex.io',
    company: 'Valorex Studio',
    plan: 'Free',
    revenue: 0.00,
    status: 'Inactive',
    lastActivity: '2 weeks ago',
    createdDate: 'Aug 30, 2025',
    industry: 'Design & Media',
    seats: 1
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_01',
    name: 'Enterprise SaaS Tier',
    category: 'SaaS Plan',
    price: 1490.00,
    billingInterval: 'monthly',
    sales: 320,
    revenue: 476800.00,
    status: 'Active',
    description: 'Full white-label analytics, unlimited seats, custom data retention and dedicated engineering SLA.',
    growth: 18.4
  },
  {
    id: 'prod_02',
    name: 'Business Tier',
    category: 'SaaS Plan',
    price: 599.00,
    billingInterval: 'monthly',
    sales: 840,
    revenue: 503160.00,
    status: 'Active',
    description: 'Up to 35 team seats, advanced funnel analysis, custom webhooks, and 12-month data rollups.',
    growth: 14.1
  },
  {
    id: 'prod_03',
    name: 'Pro Tier Subscription',
    category: 'SaaS Plan',
    price: 299.00,
    billingInterval: 'monthly',
    sales: 2450,
    revenue: 732550.00,
    status: 'Active',
    description: 'Up to 10 seats, realtime telemetry, automated anomaly alerts, and full CSV/PDF export.',
    growth: 22.8
  },
  {
    id: 'prod_04',
    name: 'Dedicated IP Cluster',
    category: 'Infrastructure',
    price: 850.00,
    billingInterval: 'monthly',
    sales: 110,
    revenue: 93500.00,
    status: 'Active',
    description: 'Isolated edge egress IPs with DDoS mitigation and guaranteed 99.99% ingress throughput.',
    growth: 9.2
  },
  {
    id: 'prod_05',
    name: 'API Credits Pack (500k)',
    category: 'API Usage',
    price: 250.00,
    billingInterval: 'one-time',
    sales: 1980,
    revenue: 495000.00,
    status: 'Active',
    description: 'Additional high-throughput ingestion quota for streaming raw user telemetry and event streams.',
    growth: 31.6
  },
  {
    id: 'prod_06',
    name: 'Custom SLA & Onboarding',
    category: 'Support',
    price: 2450.00,
    billingInterval: 'one-time',
    sales: 64,
    revenue: 156800.00,
    status: 'Active',
    description: 'Dedicated technical account manager, private Slack channel, and 15-minute response guarantee.',
    growth: 6.8
  },
  {
    id: 'prod_07',
    name: 'Anomaly Detection AI Add-on',
    category: 'Add-on',
    price: 180.00,
    billingInterval: 'monthly',
    sales: 420,
    revenue: 75600.00,
    status: 'Draft',
    description: 'Automated Bayesian outlier detection in revenue anomalies and sudden user drop-offs.',
    growth: 0.0
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep_01',
    title: 'Executive Revenue Summary Q3 2026',
    category: 'Revenue',
    description: 'Comprehensive financial breakdown including MRR, ARR, churn rate, ARPU and geographic distribution.',
    date: 'Sep 24, 2026',
    period: 'Jul 01 - Sep 24, 2026',
    status: 'Ready',
    fileFormat: 'PDF',
    fileSize: '3.4 MB',
    downloadCount: 142
  },
  {
    id: 'rep_02',
    title: 'Monthly User Growth & Acquisition Audit',
    category: 'Users',
    description: 'Cohort retention rates, organic vs paid acquisition funnel, and sign-up velocity breakdown.',
    date: 'Sep 20, 2026',
    period: 'Aug 01 - Aug 31, 2026',
    status: 'Ready',
    fileFormat: 'CSV',
    fileSize: '1.2 MB',
    downloadCount: 89
  },
  {
    id: 'rep_03',
    title: 'Sales & Product Performance Ledger',
    category: 'Sales',
    description: 'Itemized sales count by subscription tier, add-on expansion velocity, and refund statistics.',
    date: 'Sep 15, 2026',
    period: 'Jan 01 - Sep 15, 2026',
    status: 'Ready',
    fileFormat: 'XLSX',
    fileSize: '4.8 MB',
    downloadCount: 204
  },
  {
    id: 'rep_04',
    title: 'Enterprise Customer Health & Churn Index',
    category: 'Customers',
    description: 'Health scoring for accounts over $10k ARR, seat utilization ratios, and renewal probabilities.',
    date: 'Sep 10, 2026',
    period: 'Rolling 90 Days',
    status: 'Ready',
    fileFormat: 'PDF',
    fileSize: '2.1 MB',
    downloadCount: 67
  },
  {
    id: 'rep_05',
    title: 'Q4 2026 Revenue Forecast & Budget Model',
    category: 'Revenue',
    description: 'Predictive forecast based on current expansion velocity, renewal cycles, and historical seasonality.',
    date: 'Scheduled for Oct 01',
    period: 'Oct 01 - Dec 31, 2026',
    status: 'Scheduled',
    fileFormat: 'PDF',
    fileSize: 'Pending',
    downloadCount: 0
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'New payment received',
    description: 'Marcus Aurel (Vertex Scale) paid $1,490.00 for Enterprise SaaS Tier.',
    time: '8 mins ago',
    timestamp: Date.now() - 8 * 60 * 1000,
    isRead: false,
    type: 'payment',
    link: '/transactions'
  },
  {
    id: 'notif_02',
    title: 'Subscription upgraded',
    description: 'CloudScale Inc upgraded from Pro ($299/mo) to Enterprise ($1,490/mo).',
    time: '42 mins ago',
    timestamp: Date.now() - 42 * 60 * 1000,
    isRead: false,
    type: 'upgrade',
    link: '/customers'
  },
  {
    id: 'notif_03',
    title: 'New user registered',
    description: 'Sarah Lin joined as Lead Architect at Nova Pulse Media.',
    time: '2 hours ago',
    timestamp: Date.now() - 120 * 60 * 1000,
    isRead: false,
    type: 'user',
    link: '/users'
  },
  {
    id: 'notif_04',
    title: 'Payment failed',
    description: 'Invoice #INV-2026-0887 ($599.00) failed for Kasper Lindqvist. Card declined.',
    time: '5 hours ago',
    timestamp: Date.now() - 300 * 60 * 1000,
    isRead: true,
    type: 'alert',
    link: '/transactions'
  },
  {
    id: 'notif_05',
    title: 'Monthly report generated',
    description: 'August 2026 Revenue and Cohort Retention report is compiled and ready.',
    time: '1 day ago',
    timestamp: Date.now() - 1440 * 60 * 1000,
    isRead: true,
    type: 'report',
    link: '/reports'
  }
];

export const TRAFFIC_SOURCES_DATA: TrafficSource[] = [
  { source: 'Organic Search', visitors: 62240, percentage: 42, conversionRate: 5.1, color: '#3b82f6' },
  { source: 'Direct Traffic', visitors: 38530, percentage: 26, conversionRate: 6.4, color: '#10b981' },
  { source: 'Referral', visitors: 20750, percentage: 14, conversionRate: 4.8, color: '#8b5cf6' },
  { source: 'Social Media', visitors: 16300, percentage: 11, conversionRate: 2.9, color: '#f59e0b' },
  { source: 'Paid Campaigns', visitors: 10380, percentage: 7, conversionRate: 3.8, color: '#ef4444' }
];

export const CONVERSION_FUNNEL_DATA: FunnelStage[] = [
  { stage: 'Total Visitors', count: 148200, percentage: 100, dropoffRate: 0 },
  { stage: 'Signups Created', count: 24800, percentage: 16.7, dropoffRate: 83.3 },
  { stage: 'Activated Users', count: 12480, percentage: 8.4, dropoffRate: 49.7 },
  { stage: 'Paying Customers', count: 3620, percentage: 2.44, dropoffRate: 71.0 }
];

export const RETENTION_COHORTS_DATA: RetentionCohort[] = [
  { cohort: 'Apr 2026', size: 1840, m0: 100, m1: 82, m2: 74, m3: 69, m4: 66, m5: 64 },
  { cohort: 'May 2026', size: 2150, m0: 100, m1: 85, m2: 78, m3: 72, m4: 70, m5: 68 },
  { cohort: 'Jun 2026', size: 2480, m0: 100, m1: 88, m2: 81, m3: 77, m4: 74, m5: 72 },
  { cohort: 'Jul 2026', size: 2890, m0: 100, m1: 89, m2: 83, m3: 79, m4: 76, m5: 75 },
  { cohort: 'Aug 2026', size: 3120, m0: 100, m1: 91, m2: 85, m3: 82, m4: 79, m5: 78 }
];
