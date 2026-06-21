import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import EngagementModel from "@/components/EngagementModel";
import IndustriesSection from "@/components/IndustriesSection";
import ResponsibleAI from "@/components/ResponsibleAI";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Data Kurator",
  url: "https://datakurator.com",
  logo: "https://datakurator.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@datakurator.com",
    contactType: "customer support",
  },
  description:
    "We help organizations accelerate AI adoption by building MVPs, PoCs, production-grade AI systems, and scalable data pipelines that drive measurable business value.",
  sameAs: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main id="main">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <TrustBar />
        </ErrorBoundary>
        <ErrorBoundary>
          <ServicesSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <EngagementModel />
        </ErrorBoundary>
        <ErrorBoundary>
          <IndustriesSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <ResponsibleAI />
        </ErrorBoundary>
        <ErrorBoundary>
          <FaqSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <FinalCta />
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <ContactSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}