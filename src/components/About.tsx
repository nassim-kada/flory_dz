import { Heart, Globe, TrendingUp, Users, Package, CreditCard, Truck } from 'lucide-react';
import SocialLinks from './SocialLinks'; // Assuming SocialLinks is defined elsewhere (e.g., in Home.tsx context)

export default function About() {
  return (
    // Use the soft pink background for a consistent look
    <div className="min-h-screen bg-pink-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4 font-serif-display leading-tight">
            About{' '}
            <span className="bg-gradient-primary text-gradient-primary">
              flory_nshop.dz
            </span>
          </h1>
        </div>

        {/* Core Value Sections - Collapse naturally to single column on mobile */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
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
          />
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14 mb-16 border border-pink-100">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-8 text-center font-serif-display">Why Choose Us?</h2>
          {/* Feature grid: 2 columns on mobile, 3 columns on tablet/desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard
              icon={<Package className="w-6 h-6" />}
              title="Wide Selection"
              description="Access to multiple international shopping platforms all in one place."
            />
            <FeatureCard
              icon={<Truck className="w-6 h-6" />}
              title="Nationwide Delivery"
              description="Fast and reliable Yalidine delivery service covering all 58 Wilayas."
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6" />}
              title="Flexible Payment"
              description="Secure payment: 50% deposit, 50% after receiving your order."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Trusted Community"
              description="Join 44,500+ happy customers who shop with confidence."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Competitive Prices"
              description="Transparent pricing with our easy-to-use price estimator tool."
            />
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Customer First"
              description="Dedicated support team always ready to help you with your orders."
            />
          </div>
        </div>

        {/* Call to Action/Connect Section */}
        <div className="text-center bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-pink-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 font-serif-display">Connect With Us</h2>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, exclusive deals, and shopping inspiration!
          </p>
          {/* Assuming SocialLinks component is available and styled correctly */}
          <div className="flex justify-center">
            {/* Note: SocialLinks component implementation is needed for this to work */}
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for the main two sections (Who We Are, What We Do)
function AboutCard({ icon, title, content, iconColor, gradientStart, gradientEnd }: { 
    icon: React.ReactNode; 
    title: string; 
    content: string[];
    iconColor: string;
    gradientStart: string;
    gradientEnd: string;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-pink-200 hover:shadow-2xl transition-shadow duration-300">
      <div className={`w-14 h-14 bg-gradient-to-br ${gradientStart} ${gradientEnd} rounded-xl flex items-center justify-center ${iconColor} mb-4 sm:mb-6 shadow-md`}>
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 font-serif-display">{title}</h2>
      {content.map((paragraph, index) => (
          <p key={index} className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3 last:mb-0">
              {paragraph}
          </p>
      ))}
    </div>
  );
}

// Component for the "Why Choose Us" features
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-pink-50/50 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] border border-pink-100">
      <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mr-3">
            {icon}
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm leading-snug">{description}</p>
    </div>
  );
}
