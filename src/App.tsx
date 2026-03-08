import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import PortalPage from "./pages/PortalPage";
import EWayBillService from "./pages/services/EWayBillService";
import GSTRegistration from "./pages/services/GSTRegistration";
import GSTReturnFiling from "./pages/services/GSTReturnFiling";
import Bookkeeping from "./pages/services/Bookkeeping";
import DraftingService from "./pages/services/DraftingService";
import BalanceSheetService from "./pages/services/BalanceSheetService";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ToolsPage from "./pages/ToolsPage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPage";
import PartnershipPage from "./pages/PartnershipPage";
import LargeScaleServicesPage from "./pages/LargeScaleServicesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/portal" element={<PageTransition><PortalPage /></PageTransition>} />
        <Route path="/portal/eway-bill" element={<PageTransition><EWayBillService /></PageTransition>} />
        <Route path="/portal/gst-registration" element={<PageTransition><GSTRegistration /></PageTransition>} />
        <Route path="/portal/gst-return-filing" element={<PageTransition><GSTReturnFiling /></PageTransition>} />
        <Route path="/portal/bookkeeping" element={<PageTransition><Bookkeeping /></PageTransition>} />
        <Route path="/portal/drafting" element={<PageTransition><DraftingService /></PageTransition>} />
        <Route path="/portal/balance-sheet" element={<PageTransition><BalanceSheetService /></PageTransition>} />
        <Route path="/services/eway-bill" element={<PageTransition><EWayBillService /></PageTransition>} />
        <Route path="/services/gst-registration" element={<PageTransition><GSTRegistration /></PageTransition>} />
        <Route path="/services/gst-return-filing" element={<PageTransition><GSTReturnFiling /></PageTransition>} />
        <Route path="/services/bookkeeping" element={<PageTransition><Bookkeeping /></PageTransition>} />
        <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
        <Route path="/partnership" element={<PageTransition><PartnershipPage /></PageTransition>} />
        <Route path="/large-scale-services" element={<PageTransition><LargeScaleServicesPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence>
          {showSplash && (
            <motion.div
              key="splash"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SplashScreen onComplete={() => setShowSplash(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        {!showSplash && (
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;