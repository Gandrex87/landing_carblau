"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, Sparkles, MessageSquare, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PHONE = "617914623";
const WHATSAPP_MSG = encodeURIComponent("Hola, me interesa vuestro servicio de búsqueda de coche personalizado.");

export function Hero() {
  return (
    <section className="relative pt-24 pb-8 overflow-hidden">
      {/* Ambient orbs — más intensos */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/25 rounded-full blur-[140px] -mr-56 -mt-56 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-headline font-bold leading-tight tracking-tight">
            No somos una tienda de coches al uso. <br />
            <span className="gradient-text">Y no queremos serlo.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Aquí no te vendemos lo que tenemos. Buscamos lo que encaja contigo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            {/* CTA principal — Asesor Virtual */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-md px-10 h-14 rounded-full transition-all group shadow-xl shadow-primary/20 w-full sm:w-auto"
                >
                  Encontrar mi coche ideal
                  <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] h-[90vh] md:h-[85vh] p-0 bg-background border-white/10 overflow-hidden flex flex-col">
                <DialogHeader className="px-6 py-3 border-b border-white/5 bg-secondary/20 shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <DialogTitle className="text-lg font-headline font-bold">Asesor Virtual Exclusivo</DialogTitle>
                    </div>
                  </div>
                </DialogHeader>
                <div className="flex-1 w-full bg-background relative">
                  <iframe
                    src="https://my-frontend-app-1063747381969.europe-west1.run.app/"
                    className="absolute inset-0 w-full h-full border-0"
                    title="Asesor Virtual Exclusivo de Carblau"
                    allow="microphone"
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* CTA secundario — Contacto directo */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/5 text-md px-10 h-14 rounded-full transition-all w-full sm:w-auto"
                >
                  Hablar con nosotros
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm w-[95vw] bg-background border-white/10">
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-2xl font-headline font-bold">¿Cómo prefieres contactar?</DialogTitle>
                  <p className="text-sm text-muted-foreground">Elige la opción que más te convenga.</p>
                </DialogHeader>

                <div className="flex flex-col gap-4 pt-2">
                  {/* Llamada */}
                  <a href={`tel:+34${PHONE}`} className="w-full">
                    <Button
                      size="lg"
                      className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-4 text-left px-6 shadow-lg shadow-primary/20"
                    >
                      <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">Llamar ahora</p>
                        <p className="text-sm opacity-80 font-normal">+34 {PHONE}</p>
                      </div>
                    </Button>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/34${PHONE}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      size="lg"
                      className="w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center gap-4 text-left px-6 shadow-lg shadow-[#25D366]/20"
                    >
                      <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
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
        </div>
      </div>
    </section>
  );
}
