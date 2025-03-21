import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Gift, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/lib/queryClient';

interface Message {
  id: number;
  text: string;
}

const ScratchCardSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);

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

  const currentMessage = messages.find(m => m.id === currentMessageId);

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
  
  const cardVariants = {
    front: { 
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    back: { 
      rotateY: 180,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <section id="mensagem" className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Uma Mensagem Para Você</h2>
          <p className="text-lg text-gray-300 mt-3">Toque para revelar uma surpresa especial</p>
        </motion.div>
        
        <div className="max-w-md mx-auto">
          <div 
            className="h-[300px] perspective-1000 cursor-pointer" 
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="relative w-full h-full rounded-2xl preserve-3d shadow-2xl">
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-center p-6 bg-gradient-to-br from-slate-800 to-background rounded-2xl backface-hidden"
                animate={isFlipped ? "back" : "front"}
                variants={cardVariants}
              >
                <div>
                  <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-xl text-white">Toque para revelar uma mensagem especial</p>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-center p-6 bg-gradient-to-br from-primary/30 to-slate-800 rounded-2xl backface-hidden"
                initial={{ rotateY: 180 }}
                animate={isFlipped ? "front" : "back"}
                variants={cardVariants}
              >
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentMessageId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-playfair text-white"
                  >
                    {currentMessage?.text || "Carregando mensagem..."}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                refreshMessage();
              }}
              className="border-primary text-primary hover:bg-primary hover:text-white"
              disabled={messages.length <= 1}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Nova Mensagem
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScratchCardSection;
