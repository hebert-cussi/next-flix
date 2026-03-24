import * as v from 'valibot';

export const SerieSchema = v.object({
  titulo: v.pipe(
    v.string(),
    v.minLength(3, 'El título debe tener al menos 3 caracteres'),
    v.maxLength(100, 'El título no puede exceder los 100 caracteres')
  ),
  sinopsis: v.pipe(
    v.string(),
    v.minLength(10, 'La descripción debe tener al menos 10 caracteres'),
    v.maxLength(500, 'La descripción no puede exceder los 500 caracteres')
  ),
  genero: v.pipe(
    v.string(),
    v.minLength(2, 'El género debe tener al menos 2 caracteres'),
    v.maxLength(50, 'El género no puede exceder los 50 caracteres')
  ),
  estreno: v.pipe(
    v.union([v.number(), v.string()]),
    v.transform(Number),
    v.number(),
    v.minValue(1900, 'El año debe ser mayor o igual a 1900'),
    v.maxValue(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`)
  ),
  calificacion: v.pipe(
    v.union([v.number(), v.string()]),
    v.transform(Number),
    v.number(),
    v.minValue(0, 'La calificación debe ser entre 0 y 10'),
    v.maxValue(10, 'La calificación debe ser entre 0 y 10')
  ),
  urlPortada: v.optional(v.pipe(v.string(), v.url('Debe ser una URL válida'))),
  plataforma: v.pipe(
    v.string(),
    v.minLength(2, 'La plataforma debe tener al menos 2 caracteres'),
    v.maxLength(50, 'La plataforma no puede exceder los 50 caracteres')
  ),
});

export type SerieFormData = v.InferOutput<typeof SerieSchema>;