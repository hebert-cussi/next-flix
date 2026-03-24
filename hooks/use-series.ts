import { useState, useEffect, useCallback } from 'react';
import { Serie, CreateSerieDTO } from '@/interfaces/series.interface';
import { seriesService } from '@/services/series.service';

export const useSeries = () => {
  const [series, setSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSeries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await seriesService.getAllSeries();
      setSeries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar series');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSerie = useCallback(async (serieData: CreateSerieDTO) => {
    setLoading(true);
    setError(null);
    try {
      const newSerie = await seriesService.createSerie(serieData);
      setSeries(prev => [newSerie, ...prev]);
      return newSerie;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear serie');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSerie = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await seriesService.deleteSerie(id);
      setSeries(prev => prev.filter(serie => serie.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar serie');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  return {
    series,
    loading,
    error,
    fetchSeries,
    createSerie,
    deleteSerie,
  };
};