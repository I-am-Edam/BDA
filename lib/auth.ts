"use client";

import { User } from "@/types";

export const checkPermission = (user: User, permission: string): boolean => {
  if (user.role === 'admin') return true;
  return user.permissions?.includes(permission) || false;
};

export const PERMISSIONS = {
  VIEW_ORDERS: 'view_orders',
  MANAGE_ORDERS: 'manage_orders',
  VIEW_CUSTOMERS: 'view_customers',
  MANAGE_CUSTOMERS: 'manage_customers',
  VIEW_PRODUCTS: 'view_products',
  MANAGE_PRODUCTS: 'manage_products',
  VIEW_REPORTS: 'view_reports',
  MANAGE_REPORTS: 'manage_reports',
  MANAGE_STAFF: 'manage_staff',
} as const;