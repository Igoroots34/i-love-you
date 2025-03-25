import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Gift, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  text: string;
}

const ScratchCardSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch messages from the server
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
  });

  useEffect(() => {
    if (messages.length > 0 && currentMessageId === null) {
      // Set a random message when component mounts
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessageId(messages[randomIndex].id);
    }
  }, [messages, currentMessageId]);

  const currentMessage = messages.find((m) => m.id === currentMessageId);

  const handleCardClick = () => {
    // Flip card
    setIsFlipped(!isFlipped);

    // Show confetti only when revealing (not when flipping back)
    if (!isFlipped) {
      setShowConfetti(true);
      // Hide confetti after animation completes
      setTimeout(() => setShowConfetti(false), 2000);

      // Automatically change the message after a delay when card is flipped to front
      if (messages.length > 1) {
        setTimeout(() => {
          let newMessageId;
          // Make sure we don't get the same message
          do {
            const randomIndex = Math.floor(Math.random() * messages.length);
            newMessageId = messages[randomIndex].id;
          } while (newMessageId === currentMessageId && messages.length > 1);

          setCurrentMessageId(newMessageId);
        }, 1500); // Change the message after 1.5 seconds of revealing
      }
    }
  };

  const refreshMessage = () => {
    if (messages.length > 0) {
      // Reset card first
      setIsFlipped(false);

      // After card is flipped back, set a new random message
      setTimeout(() => {
        let newMessageId;
        // Make sure we don't get the same message
        do {
          const randomIndex = Math.floor(Math.random() * messages.length);
          newMessageId = messages[randomIndex].id;
        } while (newMessageId === currentMessageId && messages.length > 1);

        setCurrentMessageId(newMessageId);
      }, 300);
    }
  };

  // Animated variants for front and back of card
  const frontVariants = {
    hidden: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.9,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const backVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Custom confetti hearts
  const renderConfetti = () => {
    const hearts = [];
    const colors = ['#00ff00', '#77ff77', '#33ff33', '#99ff99', '#ccffcc'];

    for (let i = 0; i < 40; i++) {
      const left = `${Math.random() * 100}%`;
      const animDuration = 1 + Math.random() * 2;
      const size = 40 + Math.random() * 20;
      const color = colors[Math.floor(Math.random() * colors.length)];

      hearts.push(
        <motion.div
          key={i}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: Math.random() * 360,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            scale: 1,
            opacity: 0,
          }}
          transition={{
            duration: animDuration,
            ease: 'easeIn',
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size,
            height: size,
            color: color,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      );
    }

    return hearts;
  };

  return (
    <section id="mensagem" className="py-16 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">
            Uma Mensagem Para Você
          </h2>
          <p className="text-lg text-gray-300 mt-3">
            Toque para revelar uma surpresa especial
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <div
            className="h-[300px] cursor-pointer relative"
            onClick={handleCardClick}
          >
            <div className="relative w-full h-full rounded-2xl shadow-2xl">
              <AnimatePresence initial={false} mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    className="absolute inset-0 flex items-center justify-center text-center p-6 bg-gradient-to-br from-lime-950 to-background rounded-2xl shadow-lg"
                    variants={frontVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: [0.8, 1.1, 1],
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          times: [0, 0.5, 0.8, 1],
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
                      </motion.div>
                      <p className="text-xl text-white">
                        Toque para revelar uma mensagem especial
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="absolute inset-0 flex items-center justify-center text-center p-6 bg-gradient-to-br from-primary/30 to-lime-950 rounded-2xl shadow-lg"
                    variants={backVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentMessageId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: 0.2,
                            duration: 0.5,
                          },
                        }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-2xl font-playfair text-white"
                      >
                        {currentMessage?.text || 'Carregando mensagem...'}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confetti container */}
              {showConfetti && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {renderConfetti()}
                </div>
              )}
            </div>

            <div className="text-center mt-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScratchCardSection;