"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    type: "video" as const,
    media: "/video/Video_busqueda.mp4",
    model: "Volvo XC90 Recharge T8",
    brief: "Cliente que necesita 7 plazas, capacidad para pistas y nieve, fiable y confortable.",
    proposal: "Le proponemos el XC90 T8 por su equilibrio entre espacio, tracción AWD y consumo real moderado en uso híbrido.",
    risks: "Le explicamos los riesgos y aspectos de fiabilidad así como los trucos para que nunca le dé problemas.",
    name: "Carlos M.",
    location: "Madrid",
  },
  {
    type: "image" as const,
    media: "/casos_reales_2.webp",
    mediaAlt: "/casos_reales_2_1.webp",
    mediaAlt2: "/casos_reales_2_2.webp",
    model: "Toyota RAV4 Hybrid",
    brief: "Clienta que usa el coche a diario en ciudad, viajes de fin de semana ocasionales, presupuesto ajustado.",
    proposal: "Le proponemos el RAV4 Hybrid por su fiabilidad contrastada, bajo coste de mantenimiento y consumo real en ciudad.",
    risks: "Le explicamos qué revisar en segunda mano y cómo identificar unidades bien mantenidas frente a las que solo parecen serlo.",
    name: "Laura G.",
    location: "Barcelona",
  },
  {
    type: "video" as const,
    media: "/video/Premium_Car.mp4",
    model: "BMW Serie 3 320d",
    brief: "Cliente con muchos kilómetros anuales, carretera, comodidad y bajo coste por kilómetro.",
    proposal: "Le proponemos el 320d por eficiencia diésel real, dinámica de conducción y coste de uso muy competitivo.",
    risks: "Le explicamos los puntos críticos del motor B47 y la importancia del historial de mantenimiento en revisiones largas.",
    name: "Javier R.",
    location: "Valencia",
  },
];

// ── 3D Tilt + Glare card ──────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState<React.CSSProperties>({ opacity: 0 });
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;    // -0.5 → 0.5

      setStyle({
        transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`,
        transition: "transform 0.08s ease",
        boxShadow: `${-x * 20}px ${-y * 20}px 40px rgba(0,173,239,0.15), 0 20px 60px rgba(0,0,0,0.3)`,
      });
      setGlare({
        opacity: 1,
        background: `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setStyle({
      transform: "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)",
      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s cubic-bezier(0.16,1,0.3,1)",
      boxShadow: "none",
    });
    setGlare({ opacity: 0, transition: "opacity 0.4s ease" });
  }, []);

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-card rounded-3xl overflow-hidden border border-border flex flex-col h-full will-change-transform"
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
        style={{ ...glare, transition: "opacity 0.4s ease" }}
      />
      {children}
    </div>
  );
}

// ── Media (imagen o vídeo) ────────────────────────────────────────────────────
function MediaCard({ item }: { item: (typeof testimonials)[number] }) {
  const [playing, setPlaying] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = item.type === "image"
    ? [item.media, item.mediaAlt, (item as typeof item & { mediaAlt2?: string }).mediaAlt2].filter(Boolean) as string[]
    : [];

  useEffect(() => {
    if (item.type !== "image" || images.length <= 1) return;
    const interval = setInterval(() => setImageIndex(prev => (prev + 1) % images.length), 3000);
    return () => clearInterval(interval);
  }, [item, images.length]);

  if (item.type === "image") {
    return (
      <div className="w-full aspect-[4/3] overflow-hidden bg-secondary relative">
        {images.map((src, idx) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: imageIndex === idx ? 1 : 0,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] overflow-hidden bg-secondary relative">
      {playing ? (
        <video src={item.media} autoPlay controls preload="metadata" className="w-full h-full object-cover" />
      ) : (
        <>
          <video
            src={item.media}
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
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

// ── Sección ───────────────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section className="relative pt-12 pb-10 bg-secondary/30 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[110px] -mr-20 -mb-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal>
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl lg:text-3xl font-headline font-bold">Blau Reviews</h3>
          </div>
        </Reveal>

        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((item, i) => (
              <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Reveal delay={i * 130} direction="scale" className="h-full">
                  <TiltCard>
                    <MediaCard item={item} />

                    <div className="p-6 flex flex-col gap-4 flex-1">
                      <p className="font-headline font-bold text-foreground text-base">{item.model}</p>

                      <div className="space-y-3 text-sm leading-relaxed">
                        <p className="text-muted-foreground">{item.brief}</p>
                        <p className="text-foreground">{item.proposal}</p>
                        <p className="text-muted-foreground">{item.risks}</p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border">
                        <p className="font-semibold text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                      </div>
                    </div>
                  </TiltCard>
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
