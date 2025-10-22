'use client';

import { useState } from 'react';
// Corrected import paths to use relative paths instead of aliases,
// assuming components are co-located or accessible via relative path.
import Header from '@/components/Header';
import Home from '@/components/Home'; 
import About from '@/components/About'; 
// PriceEstimator is no longer imported here as it is on a dedicated route (/estimator)
// import PriceEstimator from './components/PriceEstimator'; 

export default function Page() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      // Removed 'estimator' case as it's now handled by its own route: /estimator
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* NOTE: You should update your Header component to use actual 
        Next.js <Link href="/estimator"> or <a> tag to navigate to the 
        new /estimator route, instead of just setting the activeSection state. 
      */}
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      {renderSection()}
    </div>
  );
}
