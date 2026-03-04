"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Hero() {
  return (
    <section className="relative pt-24 pb-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-headline font-bold leading-tight tracking-tight">
            No somos una tienda de coches al uso. <br />
            <span className="gradient-text">Y eso es bueno para ti.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Olvídate de las presiones de venta tradicionales. En Carblau encontramos el coche que realmente se adapta a tu estilo de vida.
          </p>

          <div className="flex justify-center pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-md px-10 h-14 rounded-full transition-all group shadow-xl shadow-primary/20"
                >
                  Encuentra tu coche ideal
                  <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 bg-background border-white/10 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 border-b border-white/5 bg-secondary/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-headline font-bold">Asesor Virtual Exclusivo</DialogTitle>
                      <p className="text-xs text-muted-foreground">Analizando tu estilo de vida para encontrar tu coche ideal</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
