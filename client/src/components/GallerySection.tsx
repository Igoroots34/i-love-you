import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

const GallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { toast } = useToast();

  // Fetch photos from the server
  const { data: photos = [], isLoading, error } = useQuery<Photo[]>({
    queryKey: ['/api/photos'],
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar fotos",
        description: "Não foi possível carregar as fotos. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  // Handle key press for lightbox (Escape key to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhoto) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="galeria" className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Nossas Memórias</h2>
          <p className="text-lg text-gray-300 mt-3">Cada foto conta um pouco da nossa história</p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-800 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="overflow-hidden rounded-xl shadow-lg cursor-pointer relative group"
                onClick={() => openLightbox(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver foto
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              onClick={closeLightbox}
              aria-label="Fechar"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedPhoto.url} 
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
