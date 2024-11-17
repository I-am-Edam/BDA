import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingBag, Users, BarChart3, Package } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            Business Management System
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Streamline your business operations with our comprehensive management solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <ShoppingBag className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Customer Portal</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse products and place orders securely
              </p>
              <Link href="/customer" className="w-full">
                <Button className="w-full">Access Store</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Staff Portal</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Manage orders and customer relationships
              </p>
              <Link href="/staff" className="w-full">
                <Button className="w-full">Staff Login</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access reports and system management
              </p>
              <Link href="/admin" className="w-full">
                <Button className="w-full">Admin Access</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}