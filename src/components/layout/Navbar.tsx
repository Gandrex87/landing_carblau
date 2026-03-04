"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-headline font-bold text-primary tracking-tight">
          Carblau<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary transition-colors">Cómo funciona</button>
          
          <Dialog>
            <DialogTrigger asChild>
              <button className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Asesor Virtual
              </button>
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

          <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Testimonios</button>
        </div>

        <Button 
          variant="outline" 
          className="rounded-full border-primary/50 text-primary hover:bg-primary/10"
          onClick={() => scrollToSection('contact')}
        >
          Encuentra tu coche
        </Button>
      </div>
    </nav>
  );
}
