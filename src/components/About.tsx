import { Heart, Globe, TrendingUp, Users, Package, CreditCard, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        
        {/* Title Section - Animated entrance */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4 font-serif-display leading-tight">
            About{' '}
            <motion.span 
              className="bg-gradient-primary text-gradient-primary inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 150 }}
            >
              flory_nshop.dz
            </motion.span>
          </h1>
        </motion.div>

        {/* Core Value Sections - Staggered animation */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AboutCard
            icon={<Heart className="w-8 h-8" />}
            iconColor="text-pink-500"
            gradientStart="from-pink-100"
            gradientEnd="to-purple-100"
            title="Who We Are"
            content={[
                "flory_nshop.dz is your reliable intermediary service that bridges the gap between international shopping platforms and Algerian customers. We make global shopping accessible, easy, and secure for everyone.",
                "With over 44,500 satisfied followers, we've built a reputation for trust, reliability, and exceptional service across all 58 Wilayas of Algeria."
            ]}
            index={0}
          />

          <AboutCard
            icon={<Globe className="w-8 h-8" />}
            iconColor="text-purple-500"
            gradientStart="from-purple-100"
            gradientEnd="to-pink-100"
            title="What We Do"
            content={[
                "We specialize in helping you shop from the world's most popular international websites including SHEIN, TEMU, YesStyle, Sephora, and many more.",
                "From finding the perfect products to handling payment and delivery, we take care of everything so you can enjoy international shopping without the hassle."
            ]}
            index={1}
          />
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14 mb-16 border border-pink-100 relative overflow-hidden"
        >
          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50 to-transparent opacity-50"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl font-bold text-gray-800 mb-8 text-center font-serif-display relative z-10"
          >
            Why Choose Us?
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            <FeatureCard
              icon={<Package className="w-6 h-6" />}
              title="Wide Selection"
              description="Access to multiple international shopping platforms all in one place."
              index={0}
            />
            <FeatureCard
              icon={<Truck className="w-6 h-6" />}
              title="Nationwide Delivery"
              description="Fast and reliable Yalidine delivery service covering all 58 Wilayas."
              index={1}
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6" />}
              title="Flexible Payment"
              description="Secure payment: 50% deposit, 50% after receiving your order."
              index={2}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Trusted Community"
              description="Join 44,500+ happy customers who shop with confidence."
              index={3}
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Competitive Prices"
              description="Transparent pricing with our easy-to-use price estimator tool."
              index={4}
            />
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Customer First"
              description="Dedicated support team always ready to help you with your orders."
              index={5}
            />
          </div>
        </motion.div>

        {/* Call to Action/Connect Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-10 border border-pink-100 relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 opacity-50"
            animate={{ 
              background: [
                "linear-gradient(to bottom right, rgb(254, 242, 242), rgb(250, 245, 255), rgb(254, 242, 242))",
                "linear-gradient(to bottom right, rgb(250, 245, 255), rgb(254, 242, 242), rgb(250, 245, 255))",
                "linear-gradient(to bottom right, rgb(254, 242, 242), rgb(250, 245, 255), rgb(254, 242, 242))"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 font-serif-display"
            >
              Connect With Us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              Follow us on social media for the latest updates, exclusive deals, and shopping inspiration!
            </motion.p>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SocialLinks />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Component for the main two sections (Who We Are, What We Do)
function AboutCard({ icon, title, content, iconColor, gradientStart, gradientEnd, index }: { 
    icon: React.ReactNode; 
    title: string; 
    content: string[];
    iconColor: string;
    gradientStart: string;
    gradientEnd: string;
    index: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-pink-200 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
    >
      {/* Hover gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      <div className="relative z-10">
        <motion.div 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`w-14 h-14 bg-gradient-to-br ${gradientStart} ${gradientEnd} rounded-xl flex items-center justify-center ${iconColor} mb-4 sm:mb-6 shadow-md`}
        >
          {icon}
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 font-serif-display">{title}</h2>
        {content.map((paragraph, idx) => (
          <motion.p 
            key={idx} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
            className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3 last:mb-0"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

// Component for the "Why Choose Us" features
function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="bg-gradient-to-br from-pink-50/70 to-purple-50/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-shadow border border-pink-100 relative overflow-hidden group cursor-pointer"
    >
      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-0 group-hover:opacity-20"
        initial={false}
      />
      
      <div className="relative z-10">
        <div className="flex items-center mb-2">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mr-3 shadow-sm"
          >
            {icon}
          </motion.div>
          <h3 className="text-sm sm:text-lg font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm leading-snug">{description}</p>
      </div>
    </motion.div>
  );
}