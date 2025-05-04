
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import DengueDetector from '@/components/DengueDetector';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
        <DengueDetector />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
