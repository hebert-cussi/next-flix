import { Banner } from '@/components/home/Banner';

export default function HomePage() {
  return (
    <div>
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
          Series Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Aquí puedes agregar contenido destacado */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Gestión Completa</h3>
            <p className="text-gray-600">
              Administra todas tus series en un solo lugar
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-gray-600">
              Interfaz intuitiva para gestionar tu contenido
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Actualizaciones</h3>
            <p className="text-gray-600">
              Mantén tus series siempre actualizadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}