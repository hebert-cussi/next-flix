export interface Serie {
  id?: string;
  titulo: string;
  sinopsis: string;
  genero: string;
  estreno: number;
  calificacion?: number; 
  urlPortada?: string;
  platafroma?: string;
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