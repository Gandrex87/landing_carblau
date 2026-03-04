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
    title: "Análisis de Vida",
    description: "Analizamos tus rutinas y necesidades para entender qué necesitas realmente.",
    image: PlaceHolderImages.find(img => img.id === "step1-icon")!
  },
  {
    number: "02",
    title: "Búsqueda Global",
    description: "Rastreamos el mercado para localizar las mejores unidades para ti.",
    image: PlaceHolderImages.find(img => img.id === "step2-icon")!
  },
  {
    number: "03",
    title: "Negociación Experta",
    description: "Negociamos por ti, asegurando las mejores condiciones y detalles técnicos.",
    image: PlaceHolderImages.find(img => img.id === "step3-icon")!
  },
  {
    number: "04",
    title: "Entrega a Domicilio",
    description: "Recibes tu coche ideal listo para disfrutar, con todas las garantías.",
    image: PlaceHolderImages.find(img => img.id === "step4-icon")!
  }
];

export function Process() {
  return (
    <section id="how-it-works" className="pb-16 pt-0">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-6">
          <h3 className="text-2xl lg:text-3xl font-headline font-bold">Cómo funcionamos</h3>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {steps.map((step, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <Card className="bg-background border-white/5 h-full overflow-hidden hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={step.image.imageUrl}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={step.image.imageHint}
                      />
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold text-sm h-7 w-7 flex items-center justify-center rounded-md shadow-xl">
                        {step.number}
                      </div>
                    </div>
                    <div className="p-4 space-y-2 flex-1">
                      <h4 className="text-lg font-bold font-headline">{step.title}</h4>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-white/10" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-white/10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
