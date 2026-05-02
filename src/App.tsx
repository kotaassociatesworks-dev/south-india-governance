import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const Home             = lazy(() => import("./pages/Home"));
const About            = lazy(() => import("./pages/About"));
const Services         = lazy(() => import("./pages/Services"));
const ComplianceGuide  = lazy(() => import("./pages/ComplianceGuide"));
const EWayBills        = lazy(() => import("./pages/EWayBills"));
const Calculators      = lazy(() => import("./pages/Calculators"));
const Contact          = lazy(() => import("./pages/Contact"));
const Blog             = lazy(() => import("./pages/Blog"));
const Portal           = lazy(() => import("./pages/Portal"));
const NotFound         = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/compliance" element={<ComplianceGuide />} />
            <Route path="/eway-bills" element={<EWayBills />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
