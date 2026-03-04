import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen font-body selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <Process />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}
