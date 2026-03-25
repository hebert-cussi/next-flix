'use client';

import { Serie, PLATAFORMAS } from '@/interfaces/series.interface';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Star, Calendar, Film, Eye, Info, Monitor } from 'lucide-react';
import { useState } from 'react';
import { SerieDetails } from './SerieDetails'

interface SerieListProps {
  series: Serie[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}

export const SerieList = ({ series, loading, onDelete }: SerieListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedSerie, setSelectedSerie] = useState<Serie | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (!id) return;
    
    if (confirm('¿Estás seguro de que deseas eliminar esta serie?')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleViewDetails = (serie: Serie) => {
    setSelectedSerie(serie);
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className="h-6 w-6 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!series || series.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-sm">
        <Film className="h-20 w-20 text-gray-300 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No hay series disponibles
        </h3>
        <p className="text-gray-500 mb-6">
          Comienza agregando tu primera serie usando el botón Agregar Serie
        </p>
        <div className="inline-flex items-center space-x-2 text-sm text-gray-400">
          <Eye className="h-4 w-4" />
          <span>¡Tu colección te espera!</span>
        </div>
      </div>
    );
  }
  
  const getRatingColor = (rating: number | undefined) => {
    const ratingValue = rating || 0;
    if (ratingValue >= 8) return 'text-green-600 bg-green-50';
    if (ratingValue >= 6) return 'text-yellow-600 bg-yellow-50';
    if (ratingValue >= 4) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };
  
  const formatRating = (rating: number | undefined) => {
    if (rating === undefined || rating === null) return 'N/A';
    return rating.toFixed(1);
  };

  const getPlatformIcon = (platformName?: string) => {
    const platform = PLATAFORMAS.find(p => p.name === platformName);
    if (platform) {
      return {
        icon: platform.icon,
        color: platform.color,
        name: platform.name
      };
    }
    return {
      icon: '📺',
      color: '#6B7280',
      name: platformName || 'No especificada'
    };
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {series.map((serie) => {
        const platformInfo = getPlatformIcon(serie.plataforma);
        return( 
        <Card 
          key={serie.id || Math.random()} 
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Imagen de la serie */}
          <div className="relative h-56 bg-gradient-to-br from-secondary to-primary/20 overflow-hidden cursor-pointer" onClick={() => handleViewDetails(serie)}>
          
            {serie.urlPortada ? (
              <img
                src={serie.urlPortada}
                alt={serie.titulo || 'Serie'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {                  
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'flex items-center justify-center h-full';
                    placeholder.innerHTML = '<svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>';
                    parent.appendChild(placeholder);
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Film className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            )}
            
            {/* Badge de calificación */}
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${getRatingColor(serie.calificacion)}`}>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-current" />
                <span>{formatRating(serie.calificacion)}</span>
              </div>
            </div>
           {/* Badge de plataforma */}
            {serie.plataforma && (
              <div 
                className="absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                style={{ backgroundColor: platformInfo.color }}
              >
               <div className="flex items-center space-x-1">
                <span>{platformInfo.icon}</span>
                  <span>{platformInfo.name}</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div  className="bg-white/90 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Info className="h-6 w-6 text-primary" />
              </div>
          </div>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-start gap-2">
              <span className="text-lg line-clamp-1 flex-1 cursor-pointer hover:text-primary transition-colors" onClick={() => handleViewDetails(serie)}>
                {serie.titulo || 'Sin título'}
              </span>
              {serie.id && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(serie.id!)}
                  disabled={deletingId === serie.id}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {deletingId === serie.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              )}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              {serie.sinopsis || 'Sin sinopsis disponible'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Film className="h-4 w-4 text-gray-400" />
                <span className="capitalize">{serie.genero || 'Sin género'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{serie.estreno || 'N/A'}</span>
              </div>
            </div>
            {serie.plataforma && (
                  <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                    <Monitor className="h-3 w-3" />
                    <span>Disponible en: {serie.plataforma}</span>
                  </div>
                )}
          </CardContent>
          
          <CardFooter className="pt-2 pb-4">
            <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-colors"
                onClick={() => handleViewDetails(serie)}
              >
              <Eye className="h-4 w-4" />
              <span>Ver detalles</span>
              {/* <div className="flex items-center justify-between w-full text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>Serie</span>
                </span>
                {serie.createdAt && (
                  <span>
                    Agregada: {new Date(serie.createdAt).toLocaleDateString('es-ES')}
                  </span>
                )}
              </div> */}
            </Button>
          </CardFooter>
        </Card>
        )
      })}
    </div>
    <SerieDetails
        serie={selectedSerie}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};