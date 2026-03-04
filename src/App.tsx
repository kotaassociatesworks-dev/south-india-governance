import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import EWayBillService from "./pages/services/EWayBillService";
import GSTRegistration from "./pages/services/GSTRegistration";
import GSTReturnFiling from "./pages/services/GSTReturnFiling";
import Bookkeeping from "./pages/services/Bookkeeping";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/eway-bill" element={<EWayBillService />} />
          <Route path="/services/gst-registration" element={<GSTRegistration />} />
          <Route path="/services/gst-return-filing" element={<GSTReturnFiling />} />
          <Route path="/services/bookkeeping" element={<Bookkeeping />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
