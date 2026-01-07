'use client';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { DollarSign, ArrowRight, Coins, Calculator, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ConfigResponse } from '@/types/config';

export default function PriceEstimator() {
  const [exchangeRate, setExchangeRate] = useState<number>(250);
  const [loading, setLoading] = useState<boolean>(true);
  const [dollarPrice, setDollarPrice] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [fee, setFee] = useState(0);
  const [activeSection, setActiveSection] = useState('estimator');
  const [isPageLoaded, setIsPageLoaded] = useState(false); 
  const [isResultUpdated, setIsResultUpdated] = useState(false); 
  
  const router = useRouter();

  useEffect(() => {
    loadExchangeRate();
  }, []);

  async function loadExchangeRate() {
    try {
      setLoading(true);
      const response = await fetch('/api/config');
      
      if (!response.ok) {
        throw new Error('Failed to fetch config');
      }
      
      const data: ConfigResponse = await response.json();
      
      if (data.error) {
        console.error('Config error:', data.error);
      }
      
      setExchangeRate(data.exchangeRate);
      console.log('Loaded successfully, exchange rate:', data.exchangeRate);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to load exchange rate:', errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const calculatePrice = (usdPrice: number): { total: number; fee: number } => {
    let serviceFee = 0;

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
      total: exchangeRate * usdPrice + serviceFee,
      fee: serviceFee,
    };
  };

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const price = parseFloat(dollarPrice);
    if (!isNaN(price) && price > 0) {
      const { total, fee: serviceFee } = calculatePrice(price);
      setResult(Math.round(total));
      setFee(serviceFee);
      setIsResultUpdated(true);
      
      const timer = setTimeout(() => setIsResultUpdated(false), 300);
      return () => clearTimeout(timer);

    } else {
      setResult(null);
      setFee(0);
    }
  }, [dollarPrice, exchangeRate]);

  const handleNavigate = (section: string) => {
    if (section === 'home' || section === 'about') {
      router.push(`/#${section}`);
    }
  };

  const contentTransitionClasses = `transition-all duration-700 ease-out ${
    isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
  }`;

  return (
    <div className="min-h-screen bg-pink-50/50">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 ${contentTransitionClasses}`}>
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-1.5 rounded-full mb-4 sm:mb-6 shadow-inner transition-transform hover:scale-[1.05]">
            <Calculator className="w-4 h-4 text-pink-600" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-widest">Pricing Tool</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4 font-serif-display leading-tight">
            Price Estimator
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Calculate the final cost of your international purchase in Algerian Dinar (DA) instantly.
          </p>
          
          {!loading && (
            <p className="text-sm text-gray-500 mt-2">
              Current Exchange Rate: <span className="font-semibold text-pink-600">{exchangeRate} DA/USD</span>
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 border-2 border-pink-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
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
                      disabled={loading}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold text-gray-800 bg-pink-50 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 transform focus:scale-[1.01] shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-pink-400 text-xl sm:text-2xl font-bold pointer-events-none">
                      $
                    </div>
                  </div>
                  {dollarPrice && parseFloat(dollarPrice) < 1 && (
                     <p className="mt-2 text-sm text-red-500">Price must be at least $1 for calculation.</p>
                  )}
                  {loading && (
                    <p className="mt-2 text-sm text-gray-500">Loading exchange rate...</p>
                  )}
                </div>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
                <ArrowRight className="w-10 h-10 text-pink-300 animate-pulse-slow" />
              </div>

              <div className="relative pt-4 lg:pt-0">
                {result !== null ? (
                  <div className={`bg-gradient-to-br from-pink-100/70 via-white to-purple-100/70 rounded-2xl p-6 sm:p-8 border-2 border-pink-300 shadow-xl transition-all duration-300 transform ${isResultUpdated ? 'scale-[1.03] shadow-pink-400/50' : ''}`}>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Coins className="w-6 h-6 text-pink-600" />
                        <p className="text-sm font-bold text-pink-700 uppercase tracking-widest">
                          Estimated Total Price
                        </p>
                      </div>
                      <p className="text-5xl sm:text-6xl font-black bg-gradient-primary text-gradient-primary leading-none mb-2 font-sans transition-colors duration-300">
                        {result.toLocaleString('en-US')}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-600">DA</p>
                    </div>
                  </div>
                ) : (
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