import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen font-body selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}
