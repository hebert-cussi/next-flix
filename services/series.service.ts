import { Serie, CreateSerieDTO } from '@/interfaces/series.interface';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api';

export class SeriesService {
  private static instance: SeriesService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}${API_ENDPOINTS.SERIES}`;
  }

  public static getInstance(): SeriesService {
    if (!SeriesService.instance) {
      SeriesService.instance = new SeriesService();
    }
    return SeriesService.instance;
  }

  async getAllSeries(): Promise<Serie[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 0 // No cache para desarrollo
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error al obtener series: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en getAllSeries:', error);
      throw error;
    }
  }

  async createSerie(serie: CreateSerieDTO): Promise<Serie> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serie),
      });
      
      if (!response.ok) {
        throw new Error(`Error al crear serie: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en createSerie:', error);
      throw error;
    }
  }

  async deleteSerie(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error al eliminar serie: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en deleteSerie:', error);
      throw error;
    }
  }
}

export const seriesService = SeriesService.getInstance();