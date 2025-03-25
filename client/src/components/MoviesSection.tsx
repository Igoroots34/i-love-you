import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus, Film } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  genre: string;
  watched: boolean;
}


const MoviesSection = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    imageUrl: '',
    genre: ''
  });

  // Fetch movies
  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies'],
  });

  // Update movie (toggle watched status)
  const updateMovieMutation = useMutation({
    mutationFn: async ({ id, watched }: { id: number, watched: boolean }) => {
      const res = await apiRequest('PATCH', `/api/movies/${id}`, { watched });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/movies'] });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar filme",
        description: "Não foi possível marcar o filme. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Add new movie
  const addMovieMutation = useMutation({
    mutationFn: async (movie: Omit<Movie, 'id' | 'watched'>) => {
      const res = await apiRequest('POST', '/api/movies', movie);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/movies'] });
      toast({
        title: "Filme adicionado",
        description: "O novo filme foi adicionado com sucesso!",
      });
      setNewMovie({ title: '', imageUrl: '', genre: '' });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar filme",
        description: "Não foi possível adicionar o filme. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovie.title) {
      toast({
        title: "Título em branco",
        description: "Por favor, insira pelo menos o título do filme.",
        variant: "destructive",
      });
      return;
    }

    // If no image URL provided, use a default placeholder
    const movieData = {
      ...newMovie,
      imageUrl: newMovie.imageUrl || 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };

    addMovieMutation.mutate(movieData);
  };

  // Animation variants
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
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="filmes" className="py-16 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Filmes Para Assistirmos</h2>
          <p className="text-lg text-stone-300 mt-3">Nossa lista cinematográfica</p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-stone-800 rounded-xl overflow-hidden shadow-lg">
                <div className="h-48 bg-stone-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-stone-700 rounded"></div>
                  <div className="h-4 w-1/3 bg-stone-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-stone-800/60 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-playfair font-bold text-white mb-1">{movie.title}</h3>
                  <p className="text-sm text-stone-400 mb-3">{movie.genre}</p>
                  <div className="flex items-center">
                    <Checkbox
                      id={`watched-${movie.id}`}
                      checked={movie.watched}
                      onCheckedChange={(checked) => {
                        updateMovieMutation.mutate({ id: movie.id, watched: checked as boolean });
                      }}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor={`watched-${movie.id}`} className="ml-2 text-stone-300">
                      {movie.watched ? 'Já assistimos' : 'Ainda não assistimos'}
                    </label>
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/80 text-white" size="lg">
                <Plus className="mr-2 h-4 w-4" /> Adicionar Filme
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Filme</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Título do Filme</label>
                  <Input
                    id="title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    placeholder="Nome do filme"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="genre" className="text-sm font-medium">Gênero do Filme</label>
                  <Input
                    id="genre"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    placeholder="Ex: Ação, Comédia, Drama"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="imageUrl" className="text-sm font-medium">
                    URL da Imagem <span className="text-stone-400 text-xs">(opcional)</span>
                  </label>
                  <Input
                    id="imageUrl"
                    value={newMovie.imageUrl}
                    onChange={(e) => setNewMovie({ ...newMovie, imageUrl: e.target.value })}
                    placeholder="https://example.com/movie-image.jpg"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={addMovieMutation.isPending}>
                    {addMovieMutation.isPending ? "Adicionando..." : "Adicionar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default MoviesSection;
