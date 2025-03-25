import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
}

const TimelineSection = () => {
  const { toast } = useToast();
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    description: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch timeline events
  const { data: events = [], isLoading, error } = useQuery<TimelineEvent[]>({
    queryKey: ['/api/timeline'],
  });

  // Add new timeline event
  const addEventMutation = useMutation({
    mutationFn: async (eventData: Omit<TimelineEvent, 'id'>) => {
      const res = await apiRequest('POST', '/api/timeline', eventData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/timeline'] });
      toast({
        title: "Evento adicionado",
        description: "O novo evento foi adicionado à timeline com sucesso!",
      });
      setNewEvent({ date: '', title: '', description: '' });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar evento",
        description: "Não foi possível adicionar o evento. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.date || !newEvent.title || !newEvent.description) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    addEventMutation.mutate(newEvent);
  };

  // Format date for display
  const formatDateString = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d 'de' MMMM, yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
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
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="timeline" className="py-16 bg-lime-950/10 backdrop-blur-lg relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Nossa História</h2>
          <p className="text-lg text-gray-300 mt-3">Cada momento que nos define</p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {isLoading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="pl-8 animate-pulse">
                  <div className="h-3 w-20 bg-lime-700 rounded mb-2"></div>
                  <div className="h-5 w-40 bg-lime-700 rounded mb-2"></div>
                  <div className="h-16 w-full bg-lime-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  variants={item}
                  className="relative pl-8 pb-8 before:content-[''] before:absolute before:left-0 before:top-6 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-primary/20 last:before:hidden"
                >
                  <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full bg-primary"></div>
                  <p className="text-sm text-primary font-semibold mb-1">
                    {formatDateString(event.date)}
                  </p>
                  <h3 className="text-xl text-white font-playfair font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-300">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/80 text-white" size="lg">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Nova Memória
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Memória</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">Data</label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Título</label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Título do evento"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Descrição</label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Descreva esse momento especial..."
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={addEventMutation.isPending}>
                      {addEventMutation.isPending ? "Adicionando..." : "Adicionar"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
