import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import EngagementModel from "@/components/EngagementModel";
import IndustriesSection from "@/components/IndustriesSection";
import ResponsibleAI from "@/components/ResponsibleAI";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <EngagementModel />
        <IndustriesSection />
        <ResponsibleAI />
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}
