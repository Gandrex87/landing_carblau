
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    number: "01",
    title: "Hablamos contigo",
    description:
      `No empezamos por los coches. 
      Empezamos por ti: cómo usas el coche, qué no quieres repetir y qué esperas de este proceso. 
      Si encajamos, definimos el encargo juntos.`,
    image: PlaceHolderImages.find(img => img.id === "step1-icon")!
  },
  {
    number: "02",
    title: "Iniciamos la búsqueda",
    description: `Sin stock que rotar. Sin presión por cerrar.\nBuscamos en las mejores fuentes hasta encontrar la unidad que realmente encaja contigo — no la primera disponible.`,
    image: PlaceHolderImages.find(img => img.id === "step2-icon")!
  },
  {
  number: "03",
  title: "Tu coche, en tu puerta",
  description: `En pocos días lo recibes listo para disfrutar: 
  revisado al detalle, reacondicionado y con un plan claro de garantía, uso y mantenimiento.
Sin letra pequeña. Sin sorpresas.`,
  image: PlaceHolderImages.find(img => img.id === "step3-icon")!
}
];

export function Process() {
  return (
    <section id="how-it-works" className="relative py-12 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px] -translate-y-1/2 -ml-32 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <p className="text-2xl lg:text-3xl font-headline font-light text-muted-foreground leading-snug">
              Trabajamos con{" "}
              <span className="text-foreground font-semibold">pocos encargos cada mes.</span>
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl lg:text-3xl font-headline font-bold">Cómo funcionamos</h3>
          </div>
        </Reveal>

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {steps.map((step, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Reveal delay={index * 120} className="h-full">
                  <Card className="bg-background border-white/5 h-full overflow-hidden hover:border-primary/30 transition-all duration-300 group">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image
                          src={step.image.imageUrl}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint={step.image.imageHint}
                        />
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground font-bold text-xs h-8 w-8 flex items-center justify-center rounded-lg shadow-2xl z-10">
                          {step.number}
                        </div>
                      </div>
                      <div className="p-5 space-y-2 flex-1">
                        <h4 className="text-lg font-bold font-headline tracking-tight">{step.title}</h4>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed whitespace-pre-line">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6 lg:hidden">
            <CarouselPrevious className="static translate-y-0 h-11 w-11 border-white/10" />
            <CarouselNext className="static translate-y-0 h-11 w-11 border-white/10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
