"use client";

import { Reveal } from "@/components/ui/reveal";
import { Star } from "lucide-react";

const stats = [
  { value: "+12", label: "coches entregados" },
  { value: "4.9", label: "valoración media Google", star: true },
  { value: "<48h", label: "tiempo de respuesta" },
  { value: "100%", label: "clientes satisfechos" },
];

export function TrustBar() {
  return (
    <section className="relative py-10 border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-3xl font-headline font-bold text-foreground">{s.value}</span>
                  {s.star && <Star className="h-5 w-5 fill-primary text-primary" />}
                </div>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
