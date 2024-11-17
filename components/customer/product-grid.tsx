"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types";
import { useCart } from "@/hooks/use-cart";

interface ProductGridProps {
  searchQuery: string;
}

const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Radiant Cut Diamond Ring",
    description: "2.5 Carat GIA Certified Radiant Cut Diamond set in Platinum",
    price: 15999.99,
    stock: 3,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    name: "Sapphire Diamond Necklace",
    description: "Royal Blue Ceylon Sapphire with Diamond Halo Pendant in 18K White Gold",
    price: 4999.99,
    stock: 5,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    name: "Diamond Tennis Bracelet",
    description: "5 Carat Round Brilliant Diamond Tennis Bracelet in 18K White Gold",
    price: 7999.99,
    stock: 4,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    name: "Emerald Cut Diamond Earrings",
    description: "3 Carat Total Weight Emerald Cut Diamond Studs in Platinum",
    price: 12999.99,
    stock: 2,
    image: "https://images.unsplash.com/photo-1635767798638-3c6e43b3aa2d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "5",
    name: "Ruby Eternity Band",
    description: "Burmese Ruby and Diamond Eternity Band in 18K Rose Gold",
    price: 5999.99,
    stock: 6,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "6",
    name: "Diamond Solitaire Pendant",
    description: "1 Carat Round Brilliant Diamond Solitaire Pendant in 18K White Gold",
    price: 3999.99,
    stock: 8,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "7",
    name: "Oval Diamond Engagement Ring",
    description: "3 Carat Oval Diamond with Pave Band in Platinum",
    price: 18999.99,
    stock: 2,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "8",
    name: "Diamond Bangle Bracelet",
    description: "Pave Set Diamond Bangle in 18K Yellow Gold",
    price: 6999.99,
    stock: 4,
    image: "https://images.unsplash.com/photo-1635767798638-3c6e43b3aa2d?auto=format&fit=crop&q=80&w=400",
  }
];

export default function ProductGrid({ searchQuery }: ProductGridProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(DEMO_PRODUCTS);

  useEffect(() => {
    const filtered = DEMO_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {product.stock <= 3 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                Only {product.stock} left
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 h-12 overflow-hidden">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                ${product.price.toLocaleString()}
              </span>
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className="bg-primary hover:bg-primary/90"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}