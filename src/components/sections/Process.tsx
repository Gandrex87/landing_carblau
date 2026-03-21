
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

const steps = [
  {
    number: "01",
    title: "Escucha",
    description:
      `Antes de hablar de coches, entendemos cómo vives. 
      Analizamos tu día a día, tus prioridades y aquello que no quieres volver a experimentar. Porque elegir bien empieza por escucharte de verdad.`,
    image: PlaceHolderImages.find(img => img.id === "step1-icon")!
  },
  {
    number: "02",
    title: "Búsqueda",
    description: `No vendemos lo que tenemos. Encontramos lo que necesitas.
    Sin stock que rotar. Sin presión por cerrar.
    Analizamos el mercado completo, filtramos opciones y seleccionamos únicamente las que realmente encajan contigo.`,
    image: PlaceHolderImages.find(img => img.id === "step2-icon")!
  },
  {
  number: "03",
  title: "Entrega",
  description: `Recibes tu coche listo para disfrutar.
Revisado en detalle, reacondicionado y acompañado de un plan claro de garantía, uso y mantenimiento.
Sin letra pequeña. Sin sorpresas.`,
  image: PlaceHolderImages.find(img => img.id === "step3-icon")!
}
];

export function Process() {
  return (
    <section id="how-it-works" className="pb-12 pt-0">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-6">
          <h3 className="text-2xl lg:text-3xl font-headline font-bold">Cómo funcionamos</h3>
        </div>

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
