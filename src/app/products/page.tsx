'use client';

import ProductCard from '../components/ProductCard';
import { Product } from '../../../types/product';
import Cookies from 'js-cookie';

import { SubsciptionPlans } from '../Utils/SubsciptionPlans';

export default function ProductsPage() {
  // Static product data
  const staticProducts: Product[] = [
    {
      Product_Id: "1234567890",
      Product_Name: "Basic Plan",
      Product_Description: "Perfect for beginners with essential features. Get started with our basic package that includes all the fundamentals you need.",
      Product_Price: 9.99,
      Product_Images: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
      Product_DurationInDays: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Product_isActive: true
    },
    { 
      Product_Id: "1234567890",
      Product_Name: "Pro Plan",
      Product_Description: "Advanced features for power users. Upgrade to pro and unlock premium functionality with priority support.",
      Product_Price: 19.99,
      Product_Images: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      Product_DurationInDays: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Product_isActive: true
    },
    {
      Product_Id: "1234567890",
      Product_Name: "Enterprise Plan",
      Product_Description: "Full-featured solution for large teams and businesses. Scale your operations with enterprise-grade features.",
      Product_Price: 49.99,
      Product_Images: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
      Product_DurationInDays: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Product_isActive: true
    },
    {
      Product_Id: "1234567890",
      Product_Name: "Premium Plan",
      Product_Description: "Exclusive features and VIP support. Get the ultimate experience with our premium package.",
      Product_Price: 29.99,
      Product_Images: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      Product_DurationInDays: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Product_isActive: false
    }
  ];
  

  const handleBuy = (product: Product) => {
    let userIdCookie = Cookies.get('userData');
    
    if (!userIdCookie) {
      alert('Please login first to purchase');
      return;
    }
    const userData = JSON.parse(userIdCookie);
    const userId = userData._id as string;
SubsciptionPlans({ ...product, userId } as unknown as Product);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Products & Plans
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of premium products and subscription plans
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticProducts.map((product: Product, index: number) => (
            <ProductCard 
              key={index} 
              product={product} 
              onBuy={handleBuy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
