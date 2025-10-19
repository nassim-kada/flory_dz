'use client';

import { useState, useEffect, useRef } from 'react';
import { DollarSign, ArrowRight, Sparkles, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [dollarPrice, setDollarPrice] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [fee, setFee] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculatePrice = (usdPrice: number): { total: number; fee: number } => {
    const baseRate = 250;
    let serviceFee = 0;

    if (usdPrice >= 1 && usdPrice < 3) {
      serviceFee = 500;
    } else if (usdPrice >= 3 && usdPrice < 10) {
      serviceFee = 1000;
    } else if (usdPrice >= 10 && usdPrice < 25) {
      serviceFee = 1500;
    } else if (usdPrice >= 25) {
      serviceFee = 2000;
    }

    return {
      total: baseRate * usdPrice + serviceFee,
      fee: serviceFee
    };
  };

  useEffect(() => {
    const price = parseFloat(dollarPrice);
    if (!isNaN(price) && price >= 1) {
      const { total, fee: serviceFee } = calculatePrice(price);
      setResult(total);
      setFee(serviceFee);
      
      // Scroll to result on mobile/tablet
      setTimeout(() => {
        if (resultRef.current && window.innerWidth < 1024) {
          resultRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    } else {
      setResult(null);
      setFee(0);
    }
  }, [dollarPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div 
        className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-40"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-20 sm:top-40 right-5 sm:right-10 w-40 sm:w-72 h-40 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/2 w-40 sm:w-72 h-40 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-40"
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-4 sm:mb-8 lg:mb-12 space-y-2 sm:space-y-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-6 lg:px-8 py-1.5 sm:py-3 rounded-full text-xs sm:text-lg lg:text-xl font-bold tracking-wide shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            <span>flory_nshop.dz</span>
            <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </motion.div>
          <motion.h1 
            className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-gray-800 mt-2 sm:mt-6 lg:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Price Calculator
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-xs sm:text-lg lg:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Instant USD to DZD conversion
          </motion.p>
        </motion.div>

        {/* Main Calculator Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 lg:p-12 border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-center">
            {/* Input Section */}
            <motion.div 
              className="space-y-2 sm:space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-sm sm:text-lg font-bold text-gray-700 mb-2 sm:mb-4 flex items-center gap-1.5 sm:gap-3">
                <div className="p-1 sm:p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <span className="text-xs sm:text-base lg:text-lg">Enter Price in USD</span>
              </label>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="number"
                  value={dollarPrice}
                  onChange={(e) => setDollarPrice(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  className="w-full px-3 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 border-2 sm:border-3 border-gray-200 rounded-lg sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:from-white focus:to-blue-50 transition-all duration-300"
                />
                <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-2xl font-bold pointer-events-none">
                  $
                </div>
              </motion.div>
              
              <AnimatePresence>
                {dollarPrice && parseFloat(dollarPrice) >= 1 && (
                  <motion.div 
                    className="mt-2 sm:mt-6 p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl border border-blue-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 font-medium">Base Rate:</span>
                      <span className="font-bold text-gray-800">250 DA/USD</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm mt-1 sm:mt-2">
                      <span className="text-gray-600 font-medium">Service Fee:</span>
                      <span className="font-bold text-blue-600">{fee} DA</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Result Section */}
            <motion.div 
              ref={resultRef}
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="hidden lg:block absolute left-0 transform -translate-x-1/2">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12 text-blue-400" />
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {result !== null ? (
                  <motion.div 
                    key="result"
                    className="w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg sm:rounded-2xl p-4 sm:p-8 border-2 sm:border-3 border-green-300 relative overflow-hidden shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    {/* Animated particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-green-400 rounded-full"
                        initial={{ 
                          x: "50%", 
                          y: "50%",
                          scale: 0,
                          opacity: 1
                        }}
                        animate={{ 
                          x: `${Math.random() * 100}%`, 
                          y: `${Math.random() * 100}%`,
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                    
                    <div className="text-center relative z-10">
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-3">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Coins className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                        </motion.div>
                        <p className="text-xs sm:text-sm font-bold text-green-700 uppercase tracking-wider">
                          Total Price
                        </p>
                      </div>
                      <motion.p 
                        className="text-3xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-1 sm:mb-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {result.toLocaleString()}
                      </motion.p>
                      <p className="text-lg sm:text-2xl font-bold text-green-600">DA</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-2xl p-4 sm:p-8 border-2 sm:border-3 border-dashed border-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Coins className="w-10 h-10 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-2 sm:mb-4" />
                      </motion.div>
                      <p className="text-gray-400 text-xs sm:text-base lg:text-lg font-semibold">
                        Enter amount to see result
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Calculation Breakdown */}
          <AnimatePresence>
            {dollarPrice && parseFloat(dollarPrice) >= 1 && (
              <motion.div 
                className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t-2 border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 lg:gap-4 text-gray-600 text-xs sm:text-sm lg:text-base">
                  <motion.span 
                    className="font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {dollarPrice} USD
                  </motion.span>
                  <span className="text-base sm:text-xl lg:text-2xl">×</span>
                  <motion.span 
                    className="font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    250 DA
                  </motion.span>
                  <span className="text-base sm:text-xl lg:text-2xl">+</span>
                  <motion.span 
                    className="font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {fee} DA
                  </motion.span>
                  <span className="text-base sm:text-xl lg:text-2xl">=</span>
                  <motion.span 
                    className="text-sm sm:text-lg lg:text-xl font-bold text-green-600"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    {result?.toLocaleString()} DA
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}