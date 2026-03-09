import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OurGoalSection from "@/components/OurGoalSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ServicesSection from "@/components/ServicesSection";
import TopClientsSection from "@/components/TopClientsSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import PartnershipSection from "@/components/PartnershipSection";
import IndustriesSection from "@/components/IndustriesSection";
import ThoughtLeadershipSection from "@/components/ThoughtLeadershipSection";
import TeamExpertiseSection from "@/components/TeamExpertiseSection";
import TimelineSection from "@/components/TimelineSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTABanner from "@/components/CTABanner";
import ContactSection from "@/components/ContactSection";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import LatestTaxUpdatesFeed from "@/components/LatestTaxUpdatesFeed";

const Index = () => {
  return (
    <main>
      <TrustBadgeBar />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OurGoalSection />
      <CapabilitiesSection />
      <ServicesSection />
      <ThoughtLeadershipSection />
      <TopClientsSection />
      <SuccessStoriesSection />
      <TeamExpertiseSection />
      <PartnershipSection />
      <IndustriesSection />
      <TimelineSection />
      <WhyChooseUs />
      <LatestTaxUpdatesFeed />
      <CTABanner />
      <ContactSection />
      <FloatingContact />
      <Footer />
    </main>
  );
};

export default Index;
