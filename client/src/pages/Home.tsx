import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import TimerSection from '@/components/TimerSection';
import GallerySection from '@/components/GallerySection';
import TimelineSection from '@/components/TimelineSection';
import ScratchCardSection from '@/components/ScratchCardSection';
import MoviesSection from '@/components/MoviesSection';
import MusicSection from '@/components/MusicSection';
import DreamsSection from '@/components/DreamsSection';
import DaisyIcon from '@/components/DaisyIcon';
import { motion } from 'framer-motion';

const Home = () => {
  useEffect(() => {
    document.title = "Nossa História de Amor";
  }, []);

  const daisyPositions = [
    { top: '20%', left: '5%', width: 40, animationDelay: 0 },
    { top: '60%', right: '10%', width: 30, animationDelay: 2 },
    { top: '30%', left: '80%', width: 35, animationDelay: 4 },
    { top: '80%', left: '30%', width: 25, animationDelay: 3 },
    { top: '15%', right: '25%', width: 45, animationDelay: 1 },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Floating daisies */}
      {daisyPositions.map((position, index) => (
        <div
          key={index}
          className="fixed opacity-60 z-0 pointer-events-none"
          style={{ 
            top: position.top, 
            left: position.left, 
            right: position.right,
          }}
        >
          <motion.div
            animate={{ y: [-20, 0, -20] }}
            transition={{ 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: position.animationDelay 
            }}
          >
            <DaisyIcon width={position.width} />
          </motion.div>
        </div>
      ))}

      <Navigation />

      {/* Header with hero */}
      <header className="pt-20 pb-10 md:pt-32 md:pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-white">
                <span className="block">Uma História de</span>
                <span className="text-primary">Amor</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-300"
            >
              Cada momento juntos é uma página em nosso livro de amor...
            </motion.p>
          </div>
        </div>
        <div className="absolute inset-0 bg-dark-purple opacity-30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-80 z-0"></div>
      </header>

      <TimerSection />
      <GallerySection />
      <TimelineSection />
      <ScratchCardSection />
      <MoviesSection />
      <MusicSection />
      <DreamsSection />

      {/* Footer */}
      <footer className="py-8 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Com todo meu amor, para você.</p>
          <div className="mt-4 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
              fill="currentColor" stroke="currentColor" strokeWidth="2" 
              className="mx-auto"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
