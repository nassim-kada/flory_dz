import { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // State to control the header's initial animation
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true);
    // Set isLoaded to true after a short delay or on mount for animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
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
    // Header Entrance Animation: uses isLoaded state for slide-down/fade-in
    <header className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg shadow-pink-50/20 z-50 transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - added 'hover:scale-[1.03]' for a subtle pop */}
          <button
            onClick={() => handleSpaNavigation('home')}
            className="text-xl sm:text-3xl font-bold font-serif-display bg-gradient-primary text-gradient-primary transition-transform hover:scale-[1.03] hover:opacity-90 tracking-wide"
          >
            flory_nshop.dz 
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 p-1 rounded-full bg-pink-50/50 border border-pink-100">
            {navItems.map((item) => {
              const currentIsActive = isActive(item);
              
              // Navigation Item Hover Animation: slight lift and scale on hover
              const baseClasses = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 tracking-wider transform hover:-translate-y-0.5 hover:scale-[1.02]`;

              if (isEstimatorLink(item.id)) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`${baseClasses} ${
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
                    className={`${baseClasses} ${
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

          {/* Mobile Menu Button - added 'active:scale-95' for click feedback */}
          <button
            className="md:hidden p-2 rounded-full transition-all bg-pink-50 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500 active:scale-95"
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

        {/* Mobile Dropdown Menu Slide-In: uses the custom 'animate-slide-down-fade' class */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-pink-100/80 animate-slide-down-fade">
            {navItems.map((item) => {
              const currentIsActive = isActive(item);
              
              // Added 'active:bg-pink-200' for visual feedback on touch/click
              const mobileBaseClasses = `block w-full text-left px-6 py-3 my-1 rounded-lg font-medium transition-all tracking-wider text-base active:bg-pink-200`;

              if (isEstimatorLink(item.id)) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`${mobileBaseClasses} ${
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
                    className={`${mobileBaseClasses} ${
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