'use client';

import { SerieForm } from '@/components/gestion/SerieForm';
import { SerieList } from '@/components/gestion/SerieList';
import { useSeries } from '@/hooks/use-series';
import { SerieFormData } from '@/validations/series.schema'

export default function GestionPage() {
  const { series, loading, createSerie, deleteSerie } = useSeries();

  const handleCreateSerie = async (data: SerieFormData) => {
    await createSerie(data);
  };

  const handleDeleteSerie = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta serie?')) {
      await deleteSerie(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">
            Gestión de Series
          </h1>
          <p className="text-gray-600 mt-2">
            Administra tu colección de series favoritas
          </p>
        </div>
        <SerieForm onSubmit={handleCreateSerie} />
      </div>

      <SerieList
        series={series}
        loading={loading}
        onDelete={handleDeleteSerie}
      />
    </div>
  );
}