
"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Link href="/" className="inline-block">
            <Image
              src="/logo_car_blau.webp"
              alt="Carblau Logo"
              width={140}
              height={35}
              className="h-8 w-auto object-contain brightness-110"
            />
          </Link>
          <p className="text-xs text-muted-foreground tracking-wide">
            Criterio. Transparencia. Tranquilidad
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Carblau. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-foreground transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
