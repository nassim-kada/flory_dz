'use client';

import { useState, useEffect } from 'react';
import { DollarSign, ArrowRight, Coins, Calculator, Tag } from 'lucide-react';

export default function PriceEstimator() {
  const [dollarPrice, setDollarPrice] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [fee, setFee] = useState(0);

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
    // else if usdPrice is 0 or less, serviceFee remains 0.

    return {
      total: baseRate * usdPrice + serviceFee,
      fee: serviceFee,
    };
  };

  useEffect(() => {
    const price = parseFloat(dollarPrice);
    if (!isNaN(price) && price > 0) {
      const { total, fee: serviceFee } = calculatePrice(price);
      setResult(Math.round(total)); // Round to nearest DA
      setFee(serviceFee);
    } else {
      setResult(null);
      setFee(0);
    }
  }, [dollarPrice]);

  return (
    // Use the soft pink background for consistency
    <div className="min-h-screen bg-pink-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          {/* Subtle badge for category */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-1.5 rounded-full mb-4 sm:mb-6 shadow-inner">
            <Calculator className="w-4 h-4 text-pink-600" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-widest">Pricing Tool</span>
          </div>
          {/* Main title using the display font (Crafty Girls) */}
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
            {/* Layout stacks vertically on mobile, uses 2 columns on large screens */}
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
                      // Input styling enhanced with soft colors and rounded corners
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold text-gray-800 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all shadow-inner"
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

              {/* Separator icon for desktop view */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
                <ArrowRight className="w-10 h-10 text-pink-300" />
              </div>

              {/* Output Side (Result) */}
              <div className="relative pt-4 lg:pt-0">
                {result !== null ? (
                  <div className="bg-gradient-to-br from-pink-100/70 via-white to-purple-100/70 rounded-2xl p-6 sm:p-8 border-2 border-pink-300 shadow-xl transition-all duration-500">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Coins className="w-6 h-6 text-pink-600" />
                        <p className="text-sm font-bold text-pink-700 uppercase tracking-widest">
                          Estimated Total Price
                        </p>
                      </div>
                      <p className="text-5xl sm:text-6xl font-black bg-gradient-primary text-gradient-primary leading-none mb-2 font-sans">
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

          {/* Footer Terms */}
          <div className="mt-8 bg-white rounded-2xl p-4 sm:p-6 border border-pink-100 shadow-md">
            <p className="text-center text-gray-700 text-sm sm:text-base font-medium">
              <span className="font-bold text-pink-600">Payment Terms:</span> 50% deposit before delivery, 50% after receiving your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
