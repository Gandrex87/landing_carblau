"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    q: "¿Cuánto cuesta el servicio?",
    a: "Cobramos una tarifa fija por encargo, independiente del precio del coche. Te la comunicamos en la primera conversación, sin letra pequeña. No hay comisiones ocultas ni porcentajes sobre el precio final.",
  },
  {
    q: "¿En qué zonas trabajáis?",
    a: "Operamos en toda España. La entrega se gestiona desde cualquier punto de origen hasta donde tú estés. También trabajamos con importaciones europeas si el encargo lo requiere.",
  },
  {
    q: "¿Cuánto tarda el proceso?",
    a: "Depende del encargo. Casos estándar: entre 1 y 3 semanas desde que definimos el perfil hasta que tienes el coche. Para búsquedas muy específicas puede extenderse, pero siempre con seguimiento constante.",
  },
  {
    q: "¿Qué pasa si no encontráis lo que busco?",
    a: "No cerramos el encargo hasta encontrar una opción que te convenza. Si tras una búsqueda exhaustiva no existe en el mercado en condiciones aceptables, te lo decimos claramente y no cobramos.",
  },
  {
    q: "¿Puedo venir a ver el coche antes de decidir?",
    a: "Sí. Organizamos la visita y si lo deseas te acompañamos. También podemos gestionar una inspección técnica independiente para que la decisión sea siempre tuya, con toda la información encima de la mesa.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-headline font-semibold text-base text-foreground group-hover:text-primary transition-colors">
          {q}
        </span>
        <span className="shrink-0 h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="text-muted-foreground text-sm leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-headline font-bold mb-3">Preguntas frecuentes</h3>
            <p className="text-muted-foreground">Lo que nos preguntan antes de dar el paso.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-border bg-card px-6">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
