import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const TimerSection = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // October 6, 2024
    const startDate = new Date('October 6, 2024 00:00:00').getTime();
    
    const updateCounter = () => {
      const now = new Date().getTime();
      const difference = now - startDate;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTime({ days, hours, minutes, seconds });
    };
    
    // Initial update
    updateCounter();
    
    // Update every second
    const interval = setInterval(updateCounter, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="contador" className="py-16  relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white ">Nosso Tempo Juntos</h2>
          <p className="text-lg text-gray-300 mt-3">Cada segundo com você é um presente</p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gray-500/10 rounded-2xl backdrop-blur-sm shadow-2xl p-6 md:p-10"
        >
          <div className="text-center mb-6">
            <p className="text-xl md:text-2xl text-primary font-light mb-2">Amando você desde</p>
            <p className="text-2xl md:text-3xl text-white font-playfair">06 de Outubro de 2024</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <motion.div variants={item} className="bg-lime-300/90 rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-lime-700 mb-2">{time.days}</div>
              <div className="text-lime-800 text-sm md:text-base">Dias</div>
            </motion.div>
            
            <motion.div variants={item} className="bg-lime-300/90 rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-lime-700 mb-2">{time.hours}</div>
              <div className="text-lime-800 text-sm md:text-base">Horas</div>
            </motion.div>
            
            <motion.div variants={item} className="bg-lime-300/90 rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-lime-700 mb-2">{time.minutes}</div>
              <div className="text-lime-800 text-sm md:text-base">Minutos</div>
            </motion.div>
            
            <motion.div variants={item} className="bg-lime-300/90  rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-lime-700 mb-2">{time.seconds}</div>
              <div className="text-lime-800 text-sm md:text-base">Segundos</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimerSection;
