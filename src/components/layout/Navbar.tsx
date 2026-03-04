
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
          <button onClick={() => scrollToSection('advisor')} className="hover:text-primary transition-colors">Asesor Virtual</button>
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
