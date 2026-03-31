import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen font-body selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <Process />
      <Testimonials />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}
