'use client';

import { Sparkles, Truck, Shield, Heart, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import SocialLinks from './SocialLinks';

// Animation variants with proper TypeScript typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] 
    }
  }
};

const highlightVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] 
    }
  }
};

// Service Card Component - Modern animated card
function ServiceCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-pink-100 hover:border-pink-300 relative overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      <div className="relative z-10">
        <motion.div 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-14 h-14 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center text-white mb-4 shadow-md"
        >
          <div className="text-pink-700">{icon}</div>
        </motion.div>
        <h3 className="text-xl lg:text-2xl font-bold font-serif-display text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
        
        {/* Hero Section - Animated entrance */}
        <motion.div 
          className="text-center space-y-6 sm:space-y-10 mb-16 sm:mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-800 leading-tight font-serif-display tracking-tight px-2"
          >
            Welcome to{' '}
            <motion.span 
              className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block mt-2 sm:mt-4 py-2"
              variants={highlightVariants}
            >
              flory_nshop.dz
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-2xl text-[#7e3440] max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Your trusted and elegant intermediary shopping.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center gap-6 pt-4"
          >
            {/* Customer Count Badge - Animated with pulse effect */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-full shadow-2xl border-4 border-pink-100 transform transition-transform duration-500 relative overflow-hidden"
            >
              {/* Animated background pulse */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    44,500+
                  </motion.p>
                  <p className="text-sm text-gray-500 font-semibold tracking-wider">Our Community</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <SocialLinks />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Services Grid Section - Staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          <ServiceCard
            icon={<Truck className="w-7 h-7" />}
            title="Fast Delivery"
            description="Yalidine delivery to all 58 Wilayas across Algeria with careful handling."
            index={0}
          />
          <ServiceCard
            icon={<Shield className="w-7 h-7" />}
            title="Secure Payment"
            description="50% deposit before delivery, 50% after you have safely received your order."
            index={1}
          />
          <ServiceCard
            icon={<Sparkles className="w-7 h-7" />}
            title="Premium Service"
            description="Trusted by thousands, we offer dedicated support and attention to detail."
            index={2}
          />
        </div>

        {/* Popular Sites Section - Animated cards */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 lg:mt-28 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14 border border-pink-100 relative overflow-hidden"
        >
          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl font-bold font-serif-display text-gray-800 mb-8 text-center relative z-10"
          >
            Popular Shopping Destinations
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {['SHEIN', 'TEMU', 'YesStyle', 'Sephora'].map((site, index) => (
              <motion.div
                key={site}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.08,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl font-bold text-base sm:text-lg text-gray-700 shadow-lg border border-pink-100 cursor-pointer relative overflow-hidden group"
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-0 group-hover:opacity-20"
                  initial={false}
                />
                
                <Globe className='w-4 h-4 mr-2 text-pink-500 relative z-10'/>
                <span className="relative z-10">{site}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}