export interface Serie {
  id?: string;
  titulo: string;
  sinopsis: string;
  genero: string;
  estreno: number;
  calificacion?: number; 
  urlPortada?: string;
  plataforma?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateSerieDTO extends Omit<Serie, 'id' | 'createdAt' | 'updatedAt'> {
  rating: number; // En creación sí es requerido
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: boolean;
}

export const PLATAFORMAS = [
  { id: 'netflix', name: 'Netflix', color: '#E50914', icon: '🎬' },
  { id: 'amazon', name: 'Amazon Prime', color: '#00A8E1', icon: '📦' },
  { id: 'disney', name: 'Disney+', color: '#113CCF', icon: '🏰' },
  { id: 'hbo', name: 'HBO Max', color: '#5822B4', icon: '🎭' },
  { id: 'apple', name: 'Apple TV+', color: '#000000', icon: '🍎' },
  { id: 'paramount', name: 'Paramount+', color: '#0066FF', icon: '⛰️' },
  { id: 'starplus', name: 'Star+', color: '#FF4500', icon: '⭐' },
  { id: 'crunchyroll', name: 'Crunchyroll', color: '#F47521', icon: '🍿' },
  { id: 'other', name: 'Otra', color: '#6B7280', icon: '📺' },
] as const;