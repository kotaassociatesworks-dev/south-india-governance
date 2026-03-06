import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OurGoalSection from "@/components/OurGoalSection";
import ServicesSection from "@/components/ServicesSection";
import TopClientsSection from "@/components/TopClientsSection";
import PartnershipSection from "@/components/PartnershipSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OurGoalSection />
      <ServicesSection />
      <TopClientsSection />
      <PartnershipSection />
      <IndustriesSection />
      <WhyChooseUs />
      <ContactSection />
      <FloatingContact />
      <Footer />
    </main>
  );
};

export default Index;
