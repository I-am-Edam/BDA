export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'customer';
  permissions?: string[];
}

export interface AdminProfile {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  idNumber: string;
  emailAddress: string;
  designation: string;
  supervisor: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreVisit {
  id: string;
  staffId: string;
  storeName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  conversationNotes: string;
  visitDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SalesReport {
  id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  totalSales: number;
  totalOrders: number;
  products: {
    productId: string;
    quantity: number;
    revenue: number;
  }[];
  createdAt: Date;
}

export interface StaffReport {
  id: string;
  staffId: string;
  date: Date;
  storeVisits: StoreVisit[];
  totalVisits: number;
  status: 'pending' | 'approved' | 'rejected';
  supervisorComments?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShipmentRequest {
  id: string;
  orderId: string;
  status: 'pending' | 'approved' | 'rejected';
  shippingAddress: string;
  trackingNumber?: string;
  requestDate: Date;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}