'use client';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { DollarSign, ArrowRight, Coins, Calculator, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PriceEstimator() {
  const [dollarPrice, setDollarPrice] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [fee, setFee] = useState(0);
  const [activeSection, setActiveSection] = useState('estimator');
  const [isPageLoaded, setIsPageLoaded] = useState(false); // New state for content entrance
  const [isResultUpdated, setIsResultUpdated] = useState(false); // New state for result pop

  const router = useRouter();

  const calculatePrice = (usdPrice: number): { total: number; fee: number } => {
    // Current base rate (example value)
    const baseRate = 250;
    let serviceFee = 0;

    // Simplified service fee structure based on tiers
    if (usdPrice >= 1 && usdPrice < 3) {
      serviceFee = 500;
    } else if (usdPrice >= 3 && usdPrice < 10) {
      serviceFee = 1000;
    } else if (usdPrice >= 10 && usdPrice < 30) {
      serviceFee = 1500;
    } else if (usdPrice >= 30) {
      serviceFee = 2000;
    }
    

    return {
      total: baseRate * usdPrice + serviceFee,
      fee: serviceFee,
    };
  };

  useEffect(() => {
    // 1. Initial Page Load Animation
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const price = parseFloat(dollarPrice);
    if (!isNaN(price) && price > 0) {
      const { total, fee: serviceFee } = calculatePrice(price);
      setResult(Math.round(total)); // Round to nearest DA
      setFee(serviceFee);
      setIsResultUpdated(true); // Trigger result pop animation
      
      // Reset the pop state after the animation duration (e.g., 300ms)
      const timer = setTimeout(() => setIsResultUpdated(false), 300);
      return () => clearTimeout(timer);

    } else {
      setResult(null);
      setFee(0);
    }
  }, [dollarPrice]);

  // Handle navigation for the Header component
  const handleNavigate = (section: string) => {
    if (section === 'home' || section === 'about') {
      // Navigate to home page with the specific section
      router.push(`/#${section}`);
    }
    // For 'estimator', we're already on this page, so do nothing
  };

  // Base transition class for content entrance
  const contentTransitionClasses = `transition-all duration-700 ease-out ${
    isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
  }`;

  return (
    <div className="min-h-screen bg-pink-50/50">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Apply entrance animation to the main content container */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 ${contentTransitionClasses}`}>
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          {/* Subtle badge for category - added a small hover scale effect */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-1.5 rounded-full mb-4 sm:mb-6 shadow-inner transition-transform hover:scale-[1.05]">
            <Calculator className="w-4 h-4 text-pink-600" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-widest">Pricing Tool</span>
          </div>
          {/* Main title */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4 font-serif-display leading-tight">
            Price Estimator
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Calculate the final cost of your international purchase in Algerian Dinar (DA) instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Calculator Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 border-2 border-pink-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Input Side */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-gray-700 mb-3">
                    <div className="p-1.5 bg-pink-100 rounded-lg shadow-sm">
                      <DollarSign className="w-5 h-5 text-pink-600" />
                    </div>
                    Enter Item Price in USD
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={dollarPrice}
                      onChange={(e) => setDollarPrice(e.target.value)}
                      placeholder="e.g. 15.99"
                      min="0"
                      step="0.01"
                      // Input field animation: subtle scale and lift on focus
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold text-gray-800 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 transform focus:scale-[1.01] opacity-35 shadow-inner"
                    />
                    <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-pink-400 text-xl sm:text-2xl font-bold pointer-events-none">
                      $
                    </div>
                  </div>
                  {/* Small hint for the user */}
                  {dollarPrice && parseFloat(dollarPrice) < 1 && (
                     <p className="mt-2 text-sm text-red-500">Price must be at least \$1 for calculation.</p>
                  )}
                </div>
              </div>

              {/* Separator icon for desktop view - added a subtle pulse/spin effect */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
                <ArrowRight className="w-10 h-10 text-pink-300 animate-pulse-slow" />
              </div>

              {/* Output Side (Result) */}
              <div className="relative pt-4 lg:pt-0">
                {result !== null ? (
                  // Result Card Animation: 'isResultUpdated' triggers a temporary scale effect
                  <div className={`bg-gradient-to-br from-pink-100/70 via-white to-purple-100/70 rounded-2xl p-6 sm:p-8 border-2 border-pink-300 shadow-xl transition-all duration-300 transform ${isResultUpdated ? 'scale-[1.03] shadow-pink-400/50' : ''}`}>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Coins className="w-6 h-6 text-pink-600" />
                        <p className="text-sm font-bold text-pink-700 uppercase tracking-widest">
                          Estimated Total Price
                        </p>
                      </div>
                      {/* Add transition for the number itself for a smooth count-up/change */}
                      <p className="text-5xl sm:text-6xl font-black bg-gradient-primary text-gradient-primary leading-none mb-2 font-sans transition-colors duration-300">
                        {result.toLocaleString('en-US')}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-600">DA</p>

                      {/* Fee Breakdown */}
                    </div>
                  </div>
                ) : (
                  // Placeholder when no valid input is present
                  <div className="bg-pink-50 rounded-2xl p-6 sm:p-8 border-2 border-dashed border-pink-200">
                    <div className="text-center">
                      <Coins className="w-16 h-16 text-pink-300 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-500 text-base sm:text-lg font-semibold">
                        Enter a valid price above to calculate
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Terms - added a subtle animation on hover */}
          <div className="mt-8 bg-white rounded-2xl p-4 sm:p-6 border border-pink-100 shadow-md transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
            <p className="text-center text-gray-700 text-sm sm:text-base font-medium">
              <span className="font-bold text-pink-600">Payment Terms:</span> 50% deposit before delivery, 50% after receiving your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}