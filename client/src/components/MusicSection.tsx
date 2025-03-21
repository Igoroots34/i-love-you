import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Music, Plus } from 'lucide-react';

interface Song {
  id: number;
  title: string;
}

const MusicSection = () => {
  const { toast } = useToast();
  const [newSongTitle, setNewSongTitle] = useState('');

  // Fetch songs
  const { data: songs = [], isLoading } = useQuery<Song[]>({
    queryKey: ['/api/songs'],
  });

  // Add new song
  const addSongMutation = useMutation({
    mutationFn: async (title: string) => {
      const res = await apiRequest('POST', '/api/songs', { title });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/songs'] });
      toast({
        title: "Música adicionada",
        description: "A nova música foi adicionada com sucesso!",
      });
      setNewSongTitle('');
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar música",
        description: "Não foi possível adicionar a música. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleAddSong = () => {
    if (!newSongTitle.trim()) {
      toast({
        title: "Campo em branco",
        description: "Por favor, insira o nome da música.",
        variant: "destructive",
      });
      return;
    }
    
    addSongMutation.mutate(newSongTitle);
  };

  return (
    <section id="musicas" className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Nossa Playlist</h2>
          <p className="text-lg text-gray-300 mt-3">A trilha sonora do nosso amor</p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC" 
              width="100%" 
              height="380" 
              frameBorder="0" 
              allowTransparency={true} 
              allow="encrypted-media" 
              className="rounded-xl shadow-2xl"
            ></iframe>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10 bg-slate-800/60 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl text-primary mb-4">Nossas Músicas Especiais</h3>
            
            {isLoading ? (
              <ul className="space-y-3 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="h-6 bg-slate-700 rounded w-3/4"></li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {songs.map((song) => (
                  <motion.li 
                    key={song.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <Music className="text-primary mr-3 h-4 w-4" />
                    <span>{song.title}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            
            <div className="mt-6 flex">
              <Input
                id="new-song"
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
                placeholder="Adicionar música especial..."
                className="flex-1 bg-slate-900/70 text-white focus-visible:ring-primary"
              />
              <Button 
                onClick={handleAddSong}
                disabled={addSongMutation.isPending}
                className="ml-2 bg-primary hover:bg-primary/80"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
