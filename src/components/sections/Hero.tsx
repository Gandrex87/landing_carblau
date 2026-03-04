"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 pb-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-headline font-bold leading-tight tracking-tight">
            No somos una tienda de coches al uso. <br />
            <span className="gradient-text">Y eso es bueno para ti.</span>
          </h1>
          
          <p className="text-md lg:text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Olvídate de las presiones de venta tradicionales. En Carblau encontramos el coche que realmente se adapta a tu estilo de vida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-md px-8 h-12 rounded-full transition-all group"
              onClick={() => scrollToSection('advisor')}
            >
              Encuentra tu coche ideal
              <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5 text-md px-8 h-12 rounded-full transition-all"
              onClick={() => scrollToSection('how-it-works')}
            >
              Ver cómo funcionamos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
