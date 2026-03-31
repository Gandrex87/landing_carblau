"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const testimonials = [
  {
    type: "image" as const,
    media: "/img1.webp",
    name: "Carlos M.",
    location: "Madrid",
    text: "En menos de dos semanas me buscaron el coche exacto que quería. Sin perder el tiempo con concesionarios, sin regateos. Un servicio que no sabía que necesitaba.",
  },
  {
    type: "image" as const,
    media: "/img2.webp",
    name: "Laura G.",
    location: "Barcelona",
    text: "Me asesoraron desde cero. No tenía ni idea de qué modelo quería y ellos me ayudaron a definirlo según mi día a día. El resultado fue perfecto.",
  },
  {
    type: "image" as const,
    media: "/img3.webp",
    name: "Javier R.",
    location: "Valencia",
    text: "Transparentes en todo momento: precio, estado del vehículo, gestión. Nunca me sentí vendido, sino acompañado. Repetiría sin dudarlo.",
  },
];

function MediaCard({ item }: { item: (typeof testimonials)[number] }) {
  const [playing, setPlaying] = useState(false);

  if (item.type === "image") {
    return (
      <div
        className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary"
        style={{
          backgroundImage: `url(${item.media})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary relative">
      {playing ? (
        <video
          src={item.media}
          autoPlay
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${item.media})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Reproducir vídeo"
          >
            <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 fill-white text-white ml-1" />
            </div>
          </button>
        </>
      )}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Personas reales que confiaron en nosotros para encontrar su coche ideal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-3xl overflow-hidden shadow-md border border-border flex flex-col"
            >
              <MediaCard item={item} />
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="text-foreground leading-relaxed">"{item.text}"</p>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
