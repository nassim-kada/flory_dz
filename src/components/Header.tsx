import { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About Us', href: '/#about' }, 
    { id: 'estimator', label: 'Price Estimator', href: '/estimator' },
  ];
  
  const isEstimatorLink = (id: string) => id === 'estimator';

  const handleSpaNavigation = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false); 
  };
  
  // Fixed isActive function to avoid hydration mismatch
  const isActive = (item: typeof navItems[0]) => {
    // For estimator link, use client-side detection only after hydration
    if (isEstimatorLink(item.id)) {
      // Return false during SSR, will be corrected on client
      if (!isClient) return false;
      return window.location.pathname === item.href;
    }
    // For SPA sections, use the prop
    return activeSection === item.id;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg shadow-pink-50/20 z-50 transition-all">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <button
            onClick={() => handleSpaNavigation('home')}
            className="text-xl sm:text-3xl font-bold font-serif-display bg-gradient-primary text-gradient-primary hover:opacity-90 transition-opacity tracking-wide"
          >
            flory_nshop.dz 
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 p-1 rounded-full bg-pink-50/50 border border-pink-100">
            {navItems.map((item) => {
              const currentIsActive = isActive(item);
              
              if (isEstimatorLink(item.id)) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 tracking-wider ${
                      currentIsActive
                        ? 'bg-gradient-primary text-white shadow-md shadow-pink-400/50' 
                        : 'text-gray-600 hover:bg-pink-100/70 hover:text-pink-600'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSpaNavigation(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 tracking-wider ${
                      currentIsActive
                        ? 'bg-gradient-primary text-white shadow-md shadow-pink-400/50' 
                        : 'text-gray-600 hover:bg-pink-100/70 hover:text-pink-600'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full transition-colors bg-pink-50 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-pink-600" />
            ) : (
              <Menu className="w-6 h-6 text-pink-600" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-pink-100/80">
            {navItems.map((item) => {
              const currentIsActive = isActive(item);
              
              if (isEstimatorLink(item.id)) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`block w-full text-left px-6 py-3 my-1 rounded-lg font-medium transition-all tracking-wider text-base ${
                      currentIsActive
                        ? 'bg-pink-100 text-pink-600 font-bold border-r-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-500'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSpaNavigation(item.id)}
                    className={`block w-full text-left px-6 py-3 my-1 rounded-lg font-medium transition-all tracking-wider text-base ${
                      currentIsActive
                        ? 'bg-pink-100 text-pink-600 font-bold border-r-4 border-pink-500' 
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-500'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }
            })}
          </div>
        )}
      </nav>
    </header>
  );
}