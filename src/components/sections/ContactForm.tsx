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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Phone } from "lucide-react";

const PHONE = "647530888";
const WHATSAPP_MSG = encodeURIComponent("Hola, me interesa vuestro servicio de búsqueda de coche personalizado.");

const lines = [
  {
    content: <><span>No somos para todo el mundo. 
      Si quieres llevarte un coche hoy mismo, no somos tu sitio. </span><span className="gradient-text"> 
        Si lo tuyo es decidir bien y reducir riesgos, hablamos.</span></>,
    className: "text-4xl lg:text-5xl font-headline font-bold text-foreground"
  },
  // {
  //   content: <>Si quieres llevarte un coche hoy mismo,{"\n"}no somos tu sitio. Si lo tuyo es decidir bien y reducir riesgos hablamos</>,
  //   className: "text-xl lg:text-2xl font-headline text-muted-foreground leading-snug whitespace-pre-line"
  // },
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
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[130px] -ml-40 -mb-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] -mr-24 -mt-24 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl relative z-10 flex flex-col items-center gap-14">
        {/* Texto centrado encima */}
        <div className="w-full text-center">
          <IlluminateText />
        </div>

        {/* Formulario centrado */}
        <Reveal direction="up" delay={150} className="w-full">
          <div className="glass-morphism p-8 rounded-3xl space-y-6">

            {/* CTA rápido */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Habla con nosotros ahora
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm w-[95vw] bg-background border-white/10">
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-2xl font-headline font-bold">¿Cómo prefieres contactar?</DialogTitle>
                  <p className="text-sm text-muted-foreground">Elige la opción que más te convenga.</p>
                </DialogHeader>
                <div className="flex flex-col gap-4 pt-2">
                  <a href={`tel:+34${PHONE}`} className="w-full">
                    <Button size="lg" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-4 text-left px-6 shadow-lg shadow-primary/20">
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
                    <Button size="lg" className="w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center gap-4 text-left px-6 shadow-lg shadow-[#25D366]/20">
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

            {/* Separador */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-muted-foreground">o si prefieres, déjanos tus datos</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

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
