import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ComplianceAlert from "./ComplianceAlert";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <a href="#main" className="skip-link">Skip to content</a>
    <ComplianceAlert />
    <Navbar />
    <main id="main" className="flex-1">{children}</main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default Layout;
