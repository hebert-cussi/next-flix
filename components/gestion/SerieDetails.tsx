'use client';

import { Serie, PLATAFORMAS } from '@/interfaces/series.interface';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Calendar, Film, X, Info, Clock, Monitor, Play } from 'lucide-react';
import Image from 'next/image';

interface SerieDetailsProps {
  serie: Serie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SerieDetails = ({ serie, open, onOpenChange }: SerieDetailsProps) => {
  if (!serie) return null;

  const getRatingColor = (rating: number | undefined) => {
    const ratingValue = rating || 0;
    if (ratingValue >= 8) return 'text-green-600';
    if (ratingValue >= 6) return 'text-yellow-600';
    if (ratingValue >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatRating = (rating: number | undefined) => {
    if (rating === undefined || rating === null) return 'N/A';
    return rating.toFixed(1);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Fecha no disponible';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Obtener información de la plataforma
  const getPlatformInfo = (platformName?: string) => {
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

  const platformInfo = getPlatformInfo(serie.plataforma);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Imagen de cabecera */}
          <div className="relative h-64 md:h-80 bg-gradient-to-r from-secondary to-primary/30">
            {serie.urlPortada ? (
              <img
                src={serie.urlPortada}
                alt={serie.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Film className="h-20 w-20 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            {/* Botón cerrar */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 pt-0 relative">
            <div className="relative -mt-16 mb-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-secondary">
                      {serie.titulo}
                    </h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {serie.estreno}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Film className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 capitalize">
                          {serie.genero}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${getRatingColor(serie.calificacion)}`}>
                    <Star className="h-6 w-6 fill-current" />
                    <span className="text-2xl font-bold">
                      {formatRating(serie.calificacion)}
                    </span>
                    <span className="text-sm text-gray-500">/10</span>
                  </div>
                </div>

                {/* Tarjeta de plataforma */}
                {serie.plataforma && (
                  <div 
                    className="mt-4 p-3 rounded-lg flex items-center justify-between"
                    style={{ backgroundColor: `${platformInfo.color}10`, borderLeft: `4px solid ${platformInfo.color}` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                        style={{ backgroundColor: platformInfo.color, color: 'white' }}
                      >
                        {platformInfo.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Disponible en</p>
                        <p className="font-semibold" style={{ color: platformInfo.color }}>
                          {platformInfo.name}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="flex items-center space-x-2"
                      style={{ backgroundColor: platformInfo.color }}
                    >
                      <Play className="h-4 w-4" />
                      <span>Ver ahora</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Descripción */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center space-x-2">
                  <Info className="h-5 w-5 text-primary" />
                  <span>Sinopsis</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {serie.sinopsis || 'No hay descripción disponible para esta serie.'}
                </p>
              </div>

              {/* Información adicional */}

              {/* Fechas de creación/actualización */}
              {(serie.createdAt || serie.updatedAt) && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {serie.createdAt && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Agregada: {formatDate(serie.createdAt)}</span>
                      </div>
                    )}
                    {serie.updatedAt && serie.updatedAt !== serie.createdAt && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Actualizada: {formatDate(serie.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};