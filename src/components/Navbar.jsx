'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">CityLiving</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/listing" className="text-gray-700 hover:text-blue-600 transition">
              Browse Listings
            </Link>
            <Link href="/add-listing" className="text-gray-700 hover:text-blue-600 transition">
              Add Listing
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link 
              href="/add-listing" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Post Your Property
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/listing"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Listings
            </Link>
            <Link 
              href="/add-listing"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Listing
            </Link>
            <Link 
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/add-listing"
              className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Post Your Property
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 