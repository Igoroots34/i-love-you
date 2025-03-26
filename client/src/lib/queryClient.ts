import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const apiRequest = async (method: string, endpoint: string, body?: any) => {
  // Se for um ambiente de desenvolvimento ou estático
  if (process.env.NODE_ENV === 'development' || import.meta.env.MODE === 'production') {
    // Mapear endpoints para arquivos JSON locais
    const jsonEndpointMap: { [key: string]: string } = {
      '/api/dreams': '/data/dreams.json',
      '/api/movies': '/data/movies.json',
      '/api/photos': '/data/photos.json',
      '/api/songs': '/data/songs.json',
      '/api/timeline': '/data/timeline.json',
      '/api/users': '/data/users.json',
      '/api/messages': '/data/messages.json',
      // Adicione outros mapeamentos aqui
    };

    const jsonPath = jsonEndpointMap[endpoint];
    
    if (jsonPath) {
      const response = await fetch(jsonPath);
      return {
        json: () => response.json(),
        ok: response.ok
      };
    }
  }

  // Lógica original de API para outros ambientes
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined
  });

  return response;
};