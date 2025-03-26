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
    // Data no formato BR: "06/10/2024"
    const brDate = "06/10/2024".split("/").reverse().join("-"); // Converte para "2024-10-06"
    const startDate = new Date(brDate).getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contador" className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">
            Nosso Tempo Juntos
          </h2>
          <p className="text-lg text-gray-300 mt-3">Cada segundo com você é um presente</p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-500/10 border border-solid border-stone-800 rounded-2xl backdrop-blur-sm shadow-2xl p-6 md:p-10">
          <div className="text-center mb-6">
            <p className="text-xl md:text-2xl text-primary font-light mb-2">Amando você desde</p>
            <p className="text-2xl md:text-3xl text-white font-playfair">06 de Outubro de 2024</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {["Dias", "Horas", "Minutos", "Segundos"].map((label, index) => (
              <div key={index} className="bg-lime-300/90 rounded-xl p-4 md:p-6 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-lime-700 mb-2">
                  {[time.days, time.hours, time.minutes, time.seconds][index]}
                </div>
                <div className="text-lime-800 text-sm md:text-base">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default TimerSection;
