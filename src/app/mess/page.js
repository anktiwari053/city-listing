 'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocationHeader from '@/components/LocationHeader';

export default function MessPage() {
  const [messServices, setMessServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    city: '',
    mealType: '',
    priceRange: [0, 10000]
  });

  useEffect(() => {
    async function fetchMessServices() {
      try {
        const response = await fetch('/api/mess');
        if (!response.ok) {
          throw new Error('Failed to fetch mess services');
        }
        const data = await response.json();
        setMessServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessServices();
  }, []);

  // Filter mess services based on selected filters
  const filteredMessServices = messServices.filter(mess => {
    if (filter.city && mess.city !== filter.city) return false;
    if (filter.mealType && !mess.mealType.includes(filter.mealType)) return false;
    if (mess.price < filter.priceRange[0] || mess.price > filter.priceRange[1]) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LocationHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mess Services</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                id="city"
                value={filter.city}
                onChange={(e) => setFilter({...filter, city: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Cities</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <select
                id="mealType"
                value={filter.mealType}
                onChange={(e) => setFilter({...filter, mealType: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Types</option>
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: ₹{filter.priceRange[0]} - ₹{filter.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={filter.priceRange[1]}
                onChange={(e) => setFilter({...filter, priceRange: [filter.priceRange[0], parseInt(e.target.value)]})}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessServices.map((mess) => (
              <Link href={`/mess/${mess.id}`} key={mess.id}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={mess.images[0]}
                      alt={mess.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      {mess.rating} ★
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{mess.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{mess.location}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">₹{mess.price}/{mess.priceUnit}</p>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {mess.mealType}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Speciality:</span> {mess.speciality}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Meals:</span> {mess.timing}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredMessServices.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                No mess services found matching your filters. Try adjusting your search criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}