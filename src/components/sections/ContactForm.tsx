"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
    <section id="contact" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-headline font-bold">¿Listo para dar el paso?</h2>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              Déjanos tus datos y un breve resumen de lo que buscas. Preferimos calidad sobre cantidad: buscaremos el coche que realmente te haga feliz.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Atención personalizada", icon: "💎" },
                { title: "Garantía total Carblau", icon: "🛡️" },
                { title: "Entrega llave en mano", icon: "🔑" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-lg">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-morphism p-8 rounded-3xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input 
                    id="name" 
                    placeholder="Tu nombre" 
                    className="bg-white/5 border-white/10 rounded-xl"
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
                    className="bg-white/5 border-white/10 rounded-xl"
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
                  placeholder="hola@ejemplo.com" 
                  className="bg-white/5 border-white/10 rounded-xl"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">¿Qué buscas en tu próximo coche?</Label>
                <Textarea 
                  id="message" 
                  placeholder="Ej: SUV familiar híbrido, presupuesto 30k, uso diario en ciudad..." 
                  className="bg-white/5 border-white/10 rounded-xl min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 rounded-xl font-bold text-lg"
              >
                {isSubmitting ? "Enviando..." : "Solicitar contacto experto"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
