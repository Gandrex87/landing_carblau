"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, Sparkles, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Hero() {
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

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-md px-10 h-14 rounded-full transition-all group shadow-xl shadow-primary/20 w-full sm:w-auto"
                >
                  Deja que nuestra IA te asesore
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

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 text-md px-10 h-14 rounded-full transition-all w-full sm:w-auto"
                >
                  Contactanos
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-[95vw] bg-background border-white/10">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-headline font-bold">Contacto Directo</DialogTitle>
                  <p className="text-sm text-muted-foreground">Déjanos tus datos y te llamaremos en menos de 24h.</p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input 
                      id="name" 
                      placeholder="Tu nombre" 
                      className="bg-white/5 border-white/10"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+34" 
                        className="bg-white/5 border-white/10"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="email@..." 
                        className="bg-white/5 border-white/10"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">¿Qué buscas?</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Ej: SUV híbrido, presupuesto 35k..." 
                      className="bg-white/5 border-white/10 min-h-[80px]"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground font-bold h-12"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}