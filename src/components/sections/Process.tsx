
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
    description: "No buscamos un motor, buscamos una solución. Analizamos tus rutinas, viajes y necesidades familiares para entender qué necesitas realmente.",
    image: PlaceHolderImages.find(img => img.id === "step1-icon")!
  },
  {
    number: "02",
    title: "Búsqueda Global",
    description: "Rastreamos el mercado nacional e internacional para localizar las mejores unidades que encajen con tu perfil ideal.",
    image: PlaceHolderImages.find(img => img.id === "step2-icon")!
  },
  {
    number: "03",
    title: "Negociación Experta",
    description: "Nuestros expertos negocian por ti, asegurando las mejores condiciones y revisando exhaustivamente cada detalle técnico.",
    image: PlaceHolderImages.find(img => img.id === "step3-icon")!
  },
  {
    number: "04",
    title: "Entrega a Domicilio",
    description: "Recibes tu coche ideal listo para disfrutar, con todas las garantías y el soporte post-venta de Carblau.",
    image: PlaceHolderImages.find(img => img.id === "step4-icon")!
  }
];

export function Process() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 space-y-4">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm">El Método Carblau</h2>
          <h3 className="text-4xl lg:text-5xl font-headline font-bold">Cómo funcionamos</h3>
          <p className="text-muted-foreground text-lg">
            Un proceso transparente diseñado para que tú solo tengas que preocuparte de conducir.
          </p>
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
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-background border-white/5 h-full overflow-hidden hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={step.image.imageUrl}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={step.image.imageHint}
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold text-lg h-10 w-10 flex items-center justify-center rounded-lg shadow-xl">
                        {step.number}
                      </div>
                    </div>
                    <div className="p-8 space-y-4 flex-1">
                      <h4 className="text-2xl font-bold font-headline">{step.title}</h4>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-white/10" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-white/10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
