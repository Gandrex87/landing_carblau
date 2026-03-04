
"use client";

import { Sparkles } from "lucide-react";

export function Advisor() {
  return (
    <section id="advisor" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles className="h-4 w-4" />
            <span>Innovación en Carblau</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-headline font-bold">Asesor Virtual Exclusivo</h2>
          <p className="text-muted-foreground text-lg">
            Nuestra IA entiende tu estilo de vida antes que nuestros expertos humanos. 
            Cuéntanos quién eres y qué necesitas en una charla natural.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-background shadow-2xl aspect-[16/9] lg:aspect-[21/9] min-h-[500px]">
          <iframe 
            src="https://my-frontend-app-1063747381969.europe-west1.run.app/" 
            className="w-full h-full border-0"
            title="Asesor Virtual Exclusivo de Carblau"
            allow="microphone"
          />
        </div>
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Esta interacción preliminar ayuda a nuestros especialistas a preparar las mejores opciones para ti.</p>
        </div>
      </div>
    </section>
  );
}
