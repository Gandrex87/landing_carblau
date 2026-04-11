"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    q: "¿Cómo cobramos?",
    a: "Nuestro trabajo está incluido dentro del precio final del coche.\n\nTú defines el presupuesto total, y nosotros nos encargamos de encontrar la mejor unidad posible dentro de ese margen, ajustando la operación para cubrir búsqueda, gestión, transporte, preparación y garantía.\n\nY si en algún caso realizamos servicios independientes (como sólo revisión de una unidad concreta, gestión o transporte), se presupuestan aparte de forma transparente.",
  },
  {
    q: "¿En qué zona trabajáis?",
    a: "Trabajamos en toda la Península. Te entregamos tu coche directamente donde estés.",
  },
  {
    q: "¿Cuánto tarda el encargo?",
    a: "En la mayoría de los casos, entre 1 y 3 semanas desde que definimos bien lo que buscas hasta que encontramos una unidad adecuada. En búsquedas muy concretas o exclusivas puede llevar algo más de tiempo.\n\nEn cualquier caso, te mantenemos informado en todo momento.",
  },
  {
    q: "¿Qué pasa si no encontráis lo que busco?",
    a: "Si después de buscar con criterio no aparece una unidad que esté a la altura, te lo decimos con total claridad. Preferimos no cerrar una operación antes que recomendar algo que no lo merece.\n\nY, si tiene sentido, te plantearemos otras alternativas.",
  },
  {
    q: "¿Puedo ver el coche antes de decidir?",
    a: "No trabajamos con stock, por lo que normalmente no tenemos una unidad concreta para enseñar.\n\nSi quieres conocer un modelo, te recomendamos ver alguna unidad disponible en el mercado para hacerte una idea real.\n\nNuestro enfoque es otro: localizar la unidad adecuada en nuestras fuentes, revisarla al detalle y asegurarnos de que merece la pena para que puedas usarla con tranquilidad.\n\nSi prefieres avanzar con una unidad que ya hayas visto, también podemos ayudarte con la revisión, los trámites o el transporte.",
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
        <div className="text-muted-foreground text-sm leading-relaxed pb-5 space-y-3">
          {a.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
        </div>
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
