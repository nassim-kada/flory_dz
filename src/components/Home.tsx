'use client';

import { Sparkles, Truck, Shield, Heart, Instagram, Facebook, Globe } from 'lucide-react';

import SocialLinks from './SocialLinks';

// Service Card Component - Refined shadow and hover effects
function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group bg-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-pink-100 hover:border-pink-300">
      <div className="w-14 h-14 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform shadow-md">
        <div className="text-pink-700 group-hover:text-pink-800 transition-colors">{icon}</div>
      </div>
      <h3 className="text-xl lg:text-2xl font-bold font-serif-display text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    // Softer, more luxurious background
    <div className="min-h-screen bg-pink-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 sm:space-y-10 mb-16 sm:mb-24">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-800 leading-tight font-serif-display tracking-tight px-2">
    Welcome to{' '}
    {/* Elegant gradient text using Crafty Girls font */}
    <span className="bg-gradient-primary text-gradient-primary block mt-2 sm:mt-4 py-2">
      flory_nshop.dz
    </span>
</h1>


<p className="text-lg sm:text-2xl text-[#7e3440] max-w-4xl mx-auto leading-relaxed font-medium">
        Your trusted and elegant intermediary shopping.
</p>


          <div className="flex flex-col items-center gap-6 pt-4">
            
            {/* Customer Count Badge - More prominent and rounded */}
            <div className="bg-white p-6 rounded-full shadow-2xl border-4 border-pink-100 transform hover:scale-[1.02] transition-transform duration-500">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
                <div>
                  <p className="text-3xl sm:text-5xl font-black bg-gradient-primary text-gradient-primary leading-none">
                    44,500+
                  </p>
                  <p className="text-sm text-gray-500 font-semibold tracking-wider">Our Community</p>
                </div>
              </div>
            </div>

            <SocialLinks />
          </div>
        </div>

        {/* --- */}

        {/* Services Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          <ServiceCard
            icon={<Truck className="w-7 h-7" />}
            title="Fast Delivery"
            description="Yalidine delivery to all 58 Wilayas across Algeria with careful handling."
          />
          <ServiceCard
            icon={<Shield className="w-7 h-7" />}
            title="Secure Payment"
            description="50% deposit before delivery, 50% after you have safely received your order."
          />
          <ServiceCard
            icon={<Sparkles className="w-7 h-7" />}
            title="Premium Service"
            description="Trusted by thousands, we offer dedicated support and attention to detail."
          />
        </div>

        {/* --- */}

        {/* Popular Sites Section - Now with 4 sites */}
        <div className="mt-20 lg:mt-28 bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14 border border-pink-100">
          <h3 className="text-2xl sm:text-4xl font-bold font-serif-display text-gray-800 mb-8 text-center">
            Popular Shopping Destinations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {['SHEIN', 'TEMU', 'YesStyle', 'Sephora'].map((site) => (
              <div
                key={site}
                className="flex items-center justify-center p-4 sm:p-6 bg-pink-50 rounded-xl font-bold text-base sm:text-lg text-gray-700 hover:scale-[1.03] hover:shadow-lg transition-all border border-pink-100 cursor-pointer"
              >
                <Globe className='w-4 h-4 mr-2 text-pink-500'/>
                {site}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}