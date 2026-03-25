'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/use-form';
import { SerieSchema, SerieFormData } from '@/validations/series.schema';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PLATAFORMAS } from '@/interfaces/series.interface';
interface SerieFormProps {
  onSubmit: (data: SerieFormData) => Promise<void>;
}

const initialValues: SerieFormData = {
  titulo: '',
  sinopsis: '',
  genero: '',
  estreno: new Date().getFullYear(),
  calificacion: 5,
  urlPortada: '',
  plataforma: ''
};

export const SerieForm = ({ onSubmit }: SerieFormProps) => {
  const [open, setOpen] = useState(false);
  
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useForm({
    initialValues,
    schema: SerieSchema,
    onSubmit: async (data) => {
      await onSubmit(data);
      setOpen(false);
      resetForm();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Agregar Serie</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agregar Nueva Serie</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            label="Título *"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
            error={errors.titulo}
            placeholder="Ej: Breaking Bad"
            required
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Descripción *
            </label>
            <textarea
              name="sinopsis"
              value={values.sinopsis}
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows={4}
              placeholder="Describe la serie..."
              required
            />
            {errors.sinopsis && (
              <p className="text-sm text-red-500">{errors.sinopsis}</p>
            )}
          </div>

          <Input
            label="Género *"
            name="genero"
            value={values.genero}
            onChange={handleChange}
            error={errors.genero}
            placeholder="Ej: Drama, Comedia, Acción"
            required
          />

          <Input
            label="Año de Lanzamiento *"
            name="estreno"
            type="number"
            value={values.estreno}
            onChange={handleChange}
            error={errors.estreno}
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Plataforma
            </label>
            <select
              name="plataforma"
              value={values.plataforma || ''}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Seleccionar plataforma</option>
              {PLATAFORMAS.map((platform) => (
                <option key={platform.id} value={platform.name}>
                  {platform.icon} {platform.name}
                </option>
              ))}
            </select>
            {errors.plataforma && (
              <p className="text-sm text-red-500">{errors.plataforma}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Calificación * (0-10)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="calificacion"
                min="0"
                max="10"
                step="0.1"
                value={values.calificacion}
                onChange={handleChange}
                className="flex-1"
              />
              <span className="text-sm font-semibold min-w-[40px]">
                {Number(values.calificacion).toFixed(1)}
              </span>
            </div>
            {errors.calificacion && (
              <p className="text-sm text-red-500">{errors.calificacion}</p>
            )}
          </div>

          <Input
            label="URL de Imagen"
            name="urlPortada"
            value={values.urlPortada || ''}
            onChange={handleChange}
            error={errors.urlPortada}
            placeholder="https://ejemplo.com/imagen.jpg"
          />

          {/* <Input
            label="Plataforma *"
            name="plataforma"
            value={values.plataforma}
            onChange={handleChange}
            error={errors.plataforma}
            placeholder="Ej: netflix"
            required
          /> */}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Serie'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};