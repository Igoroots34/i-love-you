import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Dream {
  id: number;
  text: string;
  completed: boolean;
}

const DreamsSection = () => {
  const { toast } = useToast();
  const [newDreamText, setNewDreamText] = useState('');

  // Fetch dreams
  const { data: dreams = [], isLoading } = useQuery<Dream[]>({
    queryKey: ['/api/dreams'],
  });

  // Filter dreams by completion status
  const todoList = dreams.filter(dream => !dream.completed);
  const completedList = dreams.filter(dream => dream.completed);

  // Add new dream
  const addDreamMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await apiRequest('POST', '/api/dreams', { text });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dreams'] });
      toast({
        title: "Sonho adicionado",
        description: "Seu novo sonho foi adicionado com sucesso!",
      });
      setNewDreamText('');
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar sonho",
        description: "Não foi possível adicionar o sonho. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Update dream (toggle completed status)
  const updateDreamMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number, completed: boolean }) => {
      const res = await apiRequest('PATCH', `/api/dreams/${id}`, { completed });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dreams'] });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar sonho",
        description: "Não foi possível atualizar o status do sonho. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleAddDream = () => {
    if (!newDreamText.trim()) {
      toast({
        title: "Campo em branco",
        description: "Por favor, insira um sonho para adicionar.",
        variant: "destructive",
      });
      return;
    }
    
    addDreamMutation.mutate(newDreamText);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="sonhos" className="py-16 bg-slate-900/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Nossos Sonhos Juntos</h2>
          <p className="text-lg text-gray-300 mt-3">O que queremos construir lado a lado</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/60 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl text-primary mb-4">Sonhos a Realizar</h3>
            
            {isLoading ? (
              <ul className="space-y-3 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <li key={i} className="h-10 bg-slate-700 rounded"></li>
                ))}
              </ul>
            ) : (
              <motion.ul 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {todoList.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">Ainda não há sonhos para realizar. Adicione alguns!</p>
                ) : (
                  todoList.map((dream) => (
                    <motion.li
                      key={dream.id}
                      variants={item}
                      className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <Checkbox 
                          id={`dream-${dream.id}`}
                          checked={dream.completed}
                          onCheckedChange={(checked) => {
                            updateDreamMutation.mutate({ 
                              id: dream.id, 
                              completed: checked as boolean 
                            });
                          }}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label 
                          htmlFor={`dream-${dream.id}`}
                          className="ml-3"
                        >
                          {dream.text}
                        </label>
                      </div>
                    </motion.li>
                  ))
                )}
              </motion.ul>
            )}
            
            <div className="mt-6 flex">
              <Input
                id="new-dream"
                value={newDreamText}
                onChange={(e) => setNewDreamText(e.target.value)}
                placeholder="Adicionar um sonho..."
                className="flex-1 bg-slate-900/70 text-white focus-visible:ring-primary"
              />
              <Button 
                onClick={handleAddDream}
                disabled={addDreamMutation.isPending}
                className="ml-2 bg-primary hover:bg-primary/80"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/60 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl text-primary mb-4">Sonhos Realizados</h3>
            
            {isLoading ? (
              <ul className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <li key={i} className="h-10 bg-slate-700 rounded"></li>
                ))}
              </ul>
            ) : (
              <motion.ul 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {completedList.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">Ainda não há sonhos realizados. Marque os sonhos como concluídos para eles aparecerem aqui.</p>
                ) : (
                  completedList.map((dream) => (
                    <motion.li
                      key={dream.id}
                      variants={item}
                      className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <Checkbox 
                          id={`completed-dream-${dream.id}`}
                          checked={dream.completed}
                          onCheckedChange={(checked) => {
                            updateDreamMutation.mutate({ 
                              id: dream.id, 
                              completed: checked as boolean 
                            });
                          }}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label 
                          htmlFor={`completed-dream-${dream.id}`}
                          className="ml-3"
                        >
                          {dream.text}
                        </label>
                      </div>
                    </motion.li>
                  ))
                )}
              </motion.ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
