'use client';

import { Product } from '../../../types/product';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onBuy?: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDuration = (date: Date) => {
    const days = Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days` : 'Expired';
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.Product_Images}
          alt={product.Product_Name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Status Badge */}
        {!product.Product_isActive && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Unavailable
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.Product_Price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.Product_Name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.Product_Description}
        </p>
        
        {/* Duration */}
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Valid for {formatDuration(product.Product_DurationInDays)}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {product.Product_isActive ? (
            <>
              {/* Buy Button */}
              <button
                onClick={() => onBuy?.(product)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
              >
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Buy Now
                </div>
              </button>
              
              {/* View Plans Button */}
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 border border-gray-200">
                View Plans
              </button>
            </>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-xl font-semibold cursor-not-allowed"
            >
              Currently Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
