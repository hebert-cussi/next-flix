'use client';

import Link from 'next/link';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Banner = () => {
  return (
    <div className="relative h-[70vh] bg-gradient-to-r from-secondary via-secondary to-primary/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
              Bienvenido a <span className="text-primary">NextFLIX</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-200">
              Gestiona tu colección de series favoritas de manera fácil y rápida.
              Crea, visualiza y organiza todas tus series en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/gestion">
                <Button size="lg" className="flex items-center space-x-2 bg-primary hover:bg-primary/90">
                  <Play className="h-5 w-5" />
                  <span>Comenzar Ahora</span>
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border-white">
                <Info className="h-5 w-5" />
                <span>Más Información</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};