"use client";

import ProductTable from "@/components/admin/product-table";

export default function StaffProducts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Inventory</h1>
      </div>

      <ProductTable readOnly />
    </div>
  );
}