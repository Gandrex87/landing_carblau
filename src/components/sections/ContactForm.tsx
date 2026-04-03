"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Reveal } from "@/components/ui/reveal";

const lines = [
  {
    content: <><span>No somos para todo el mundo. </span><span className="gradient-text">Y lo decimos en serio.</span></>,
    className: "text-4xl lg:text-5xl font-headline font-bold text-foreground"
  },
  {
    content: <>Si quieres llevarte un coche hoy mismo,{"\n"}no somos tu sitio. Si lo tuyo es decidir bien y reducir riesgos hablamos</>,
    className: "text-xl lg:text-2xl font-headline text-muted-foreground leading-snug whitespace-pre-line"
  },
];

const features: { Icon: React.ElementType; text: string }[] = [];

const TOTAL = lines.length + features.length;

function IlluminateText() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [lit, setLit] = useState<boolean[]>(Array(TOTAL).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Array.from({ length: TOTAL }).forEach((_, i) => {
      const el = refs.current[i];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setLit(prev => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            }), i * 180);
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="space-y-6">
      {lines.map((line, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          className={`text-line ${line.className} ${lit[i] ? "lit" : ""}`}
        >
          {line.content}
        </div>
      ))}
      <div className="pt-4 flex flex-col items-center gap-4">
        {features.map(({ Icon, text }, i) => (
          <div
            key={i}
            ref={el => { refs.current[lines.length + i] = el; }}
            className={`text-line flex items-center gap-4 ${lit[lines.length + i] ? "lit" : ""}`}
          >
            <div className="h-10 w-10 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground font-body">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "¡Solicitud enviada!",
        description: "Un asesor experto de Carblau te contactará en menos de 24 horas.",
      });

      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "No hemos podido guardar tu solicitud. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="relative py-24 bg-secondary/20 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[130px] -ml-40 -mb-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] -mr-24 -mt-24 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl relative z-10 flex flex-col items-center gap-14">
        {/* Texto centrado encima */}
        <div className="w-full text-center">
          <IlluminateText />
        </div>

        {/* Formulario centrado */}
        <Reveal direction="up" delay={150} className="w-full">
          <div className="glass-morphism p-8 rounded-3xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    className="bg-white/10 border-white/20 rounded-xl"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="bg-white/10 border-white/20 rounded-xl"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@carblau.com"
                  className="bg-white/10 border-white/20 rounded-xl"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Cuéntanos qué necesitas</Label>
                <Textarea
                  id="message"
                  placeholder="Ej: SUV familiar híbrido, presupuesto 30k, uso diario en ciudad..."
                  className="bg-white/10 border-white/20 rounded-xl min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 rounded-xl font-bold text-lg"
              >
                {isSubmitting ? "Enviando..." : "Comenzar proceso"}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
