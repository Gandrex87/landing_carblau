"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, ChevronDown, ChevronUp, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const PHONE = "647530888";
const WHATSAPP_MSG = encodeURIComponent("Hola, me interesa vuestro servicio de búsqueda de coche personalizado.");

const testimonials = [
  {
    type: "image" as const,
    media: "/image_car_1_1.webp",
    mediaAlt: "/image_car_1_2.webp",
    model: "Mercedes-Benz C220 CDi (2007)",
    brief: "Guillermo recorre más de 30.000 km al año. Su Alfa Romeo 166 ya superaba los 400.000 km y buscaba algo capaz de ofrecerle lo mismo: comodidad, solvencia y la tranquilidad de poder afrontar otros 300.000 km sin grandes intervenciones mecánicas.",
    proposal: "Entre las distintas opciones, encontramos en el Mercedes Clase C 220 CDI una de las mejores respuestas. Se trata de una berlina cómoda, seria y, todavía, construida para durar.",
    risks: "Localizamos una unidad en muy buen estado y, después de revisarla y reacondicionarla a fondo, quedó prácticamente como nueva. Más que estrenar coche, Guillermo quería volver a sentir esa tranquilidad de saber que podía hacer miles de kilómetros sin pensar en averías.",
  },
  {
    type: "image" as const,
    media: "/casos_reales_2.webp",
    mediaAlt: "/casos_reales_2_2.webp",
    model: "Kia Sorento 2.2 CRDI 4x4 (2014)",
    brief: "Juan necesitaba un 7 plazas fiable para recibir a hijos y nietos, con capacidad para moverse por caminos y nieve sin problemas.",
    proposal: "Le recomendamos un Kia Sorento diésel, cómodo y con la versatilidad que buscaba tanto para la familia como para salir del asfalto. Pero sobre todo robusto y fiable en trayectos cortos y mixtos.",
    risks: "Encontramos una unidad en muy buen estado y la dejamos prácticamente como nueva. Nuestro cliente tiene lo que buscaba. Lo que más valoró Juan fue no tener que preocuparse de nada y sentir que, por fin, estaba comprando con criterio y no por impulso.",
  },
  {
    type: "image" as const,
    media: "/image_car_3_1.webp",
    model: "Peugeot Partner",
    brief: "Thomas necesitaba una furgoneta de trabajo para el campo: trayectos muy cortos, repetidos varias veces al día, con presupuesto ajustado y cero complicaciones.",
    proposal: "Le propusimos una Peugeot Partner de la primera generación, conocida por su robustez y sencillez mecánica, mucho más honesta para ese uso que opciones más modernas.",
    risks: "Encontramos una unidad de único propietario, la reacondicionamos a fondo: revisamos el sistema de refrigeración, elevamos la altura y montamos neumáticos reforzados para caminos. Thomas la recibió y se sorprendió del estado. Por fin, un vehículo que cumple sin protestar. Lo que Thomas buscaba no era un coche más moderno, sino una herramienta de trabajo fiable que simplemente cumpliera cada día.",
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

// ── Texto expandible ──────────────────────────────────────────────────────────
function ExpandableText({ item }: { item: (typeof testimonials)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="text-muted-foreground">{item.brief}</p>
        {expanded && (
          <>
            <p className="text-foreground">{item.proposal}</p>
            <p className="text-muted-foreground">{item.risks}</p>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => setExpanded(prev => !prev)}
        className="mt-auto pt-4 border-t border-border flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
      >
        {expanded ? (
          <>
            Mostrar menos <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            Leer más <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>
    </>
  );
}

// ── Sección ───────────────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section style={{ backgroundColor: "#1C1714" }} className="relative pt-12 pb-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[110px] -mr-20 -mb-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal>
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl lg:text-3xl font-headline font-bold">Decisiones CarBlau</h3>
            <p className="text-muted-foreground text-base mt-2">Coches que ya forman parte de la vida de nuestros clientes</p>
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

                      <ExpandableText item={item} />
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

        <Reveal direction="up" delay={200}>
          <div className="mt-14 flex flex-col items-center text-center gap-4">
            <p className="text-muted-foreground text-base">
              ¿Te identificas con alguna de estas historias?
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  style={{ backgroundColor: "#ADD4D3" }}
                  className="text-primary-foreground hover:opacity-90 text-md px-10 h-14 rounded-full transition-all shadow-xl shadow-primary/20"
                >
                  Cuéntanos tu caso
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm w-[95vw] bg-background border-white/10">
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-2xl font-headline font-bold">¿Cómo prefieres contactar?</DialogTitle>
                  <p className="text-sm text-muted-foreground">Elige la opción que más te convenga.</p>
                </DialogHeader>
                <div className="flex flex-col gap-4 pt-2">
                  <a href={`tel:+34${PHONE}`} className="w-full">
                    <Button size="lg" style={{ backgroundColor: "#ADD4D3" }} className="w-full h-16 rounded-2xl hover:opacity-90 text-primary-foreground flex items-center gap-4 text-left px-6 shadow-lg">
                      <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">Llamar ahora</p>
                        <p className="text-sm opacity-80 font-normal">+34 {PHONE}</p>
                      </div>
                    </Button>
                  </a>
                  <a href={`https://wa.me/34${PHONE}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button size="lg" style={{ backgroundColor: "#1D412B" }} className="w-full h-16 rounded-2xl hover:opacity-90 text-white flex items-center gap-4 text-left px-6 shadow-lg">
                      <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">WhatsApp</p>
                        <p className="text-sm opacity-80 font-normal">Escríbenos ahora</p>
                      </div>
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
