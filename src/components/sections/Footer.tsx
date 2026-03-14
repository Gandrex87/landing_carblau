"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo_car_blau.png" 
                alt="Carblau Logo" 
                width={140} 
                height={35} 
                className="h-8 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-muted-foreground font-body">
              Encuentra el coche que mejor se adapta a tu estilo de vida con nuestro asesoramiento exclusivo.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-6">Servicios</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Búsqueda a la carta</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Revisiones técnicas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Importación</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Financiación</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6">Compañía</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cómo funcionamos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6">Contacto</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span>hola@carblau.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>+34 900 123 456</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Carblau. Todos los derechos reservados.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-foreground transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
