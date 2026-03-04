import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServicePageLayout = ({ title, subtitle, children }) => {
  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              {subtitle}
            </p>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
              {title}
            </h1>
          </div>

          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ServicePageLayout;
