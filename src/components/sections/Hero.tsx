
"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-car")!;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Redefiniendo la búsqueda de coches</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight tracking-tight">
            No somos una tienda de coches al uso. <br />
            <span className="gradient-text">Y eso es bueno para ti.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-xl font-body leading-relaxed">
            Olvídate de las presiones de venta tradicionales. En Carblau encontramos el coche que realmente se adapta a tu estilo de vida, necesidades y presupuesto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-md px-8 h-14 rounded-full transition-all group"
              onClick={() => scrollToSection('advisor')}
            >
              Encuentra tu coche ideal
              <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5 text-md px-8 h-14 rounded-full transition-all"
              onClick={() => scrollToSection('how-it-works')}
            >
              Ver cómo funcionamos
            </Button>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                   <Image 
                    src={`https://picsum.photos/seed/${i + 10}/100/100`} 
                    alt="User" 
                    width={40} 
                    height={40}
                  />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              <span className="text-foreground block">Más de 500 clientes felices</span>
              <span className="text-muted-foreground">Expertos en personalización</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
