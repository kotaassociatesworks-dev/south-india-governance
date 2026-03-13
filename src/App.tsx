import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";

// Eager load the homepage for fast initial paint
import Index from "./pages/Index";

// Lazy load all other pages
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PortalPage = lazy(() => import("./pages/PortalPage"));
const EWayBillService = lazy(() => import("./pages/services/EWayBillService"));
const GSTRegistration = lazy(() => import("./pages/services/GSTRegistration"));
const GSTReturnFiling = lazy(() => import("./pages/services/GSTReturnFiling"));
const Bookkeeping = lazy(() => import("./pages/services/Bookkeeping"));
const DraftingService = lazy(() => import("./pages/services/DraftingService"));
const BalanceSheetService = lazy(() => import("./pages/services/BalanceSheetService"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const PartnershipPage = lazy(() => import("./pages/PartnershipPage"));
const LargeScaleServicesPage = lazy(() => import("./pages/LargeScaleServicesPage"));
const KnowYourRightsPage = lazy(() => import("./pages/KnowYourRightsPage"));
const KnowTaxationPage = lazy(() => import("./pages/KnowTaxationPage"));
const TaxNoticeHelpPage = lazy(() => import("./pages/TaxNoticeHelpPage"));
const TaxRiskAnalyzerPage = lazy(() => import("./pages/TaxRiskAnalyzerPage"));
const NoticeUploadPage = lazy(() => import("./pages/NoticeUploadPage"));
const SubscriptionPlansPage = lazy(() => import("./pages/SubscriptionPlansPage"));
const StartupWizardPage = lazy(() => import("./pages/StartupWizardPage"));
const ComplianceCalendarPage = lazy(() => import("./pages/ComplianceCalendarPage"));
const DocumentVaultPage = lazy(() => import("./pages/DocumentVaultPage"));
const ServiceMarketplacePage = lazy(() => import("./pages/ServiceMarketplacePage"));
const LitigationTrackerPage = lazy(() => import("./pages/LitigationTrackerPage"));
const IndustryGuidesPage = lazy(() => import("./pages/IndustryGuidesPage"));
const ComplianceHealthPage = lazy(() => import("./pages/ComplianceHealthPage"));
const TaxAssistantPage = lazy(() => import("./pages/TaxAssistantPage"));
const TaxNewsRadarPage = lazy(() => import("./pages/TaxNewsRadarPage"));
const DocumentAnalyzerPage = lazy(() => import("./pages/DocumentAnalyzerPage"));
const TaxUpdatesPage = lazy(() => import("./pages/TaxUpdatesPage"));
const ComplianceDashboardPage = lazy(() => import("./pages/ComplianceDashboardPage"));
const ComplianceTwinPage = lazy(() => import("./pages/ComplianceTwinPage"));
const TaxIntelligenceRadarPage = lazy(() => import("./pages/TaxIntelligenceRadarPage"));
const TaxOperatingSystemPage = lazy(() => import("./pages/TaxOperatingSystemPage"));
const EcosystemHubPage = lazy(() => import("./pages/EcosystemHubPage"));
const HSNCodeFinderPage = lazy(() => import("./pages/HSNCodeFinderPage"));
const TaxStrategySimulatorPage = lazy(() => import("./pages/TaxStrategySimulatorPage"));
const ComplianceHeatmapPage = lazy(() => import("./pages/ComplianceHeatmapPage"));
const FinancialCommandCenterPage = lazy(() => import("./pages/FinancialCommandCenterPage"));
const AICFOSystemPage = lazy(() => import("./pages/AICFOSystemPage"));
const IncomeTaxCalculatorPage = lazy(() => import("./pages/IncomeTaxCalculatorPage"));
const GSTCalculatorPage = lazy(() => import("./pages/GSTCalculatorPage"));
const CapitalGainsCalculatorPage = lazy(() => import("./pages/CapitalGainsCalculatorPage"));
const PayrollCalculatorPage = lazy(() => import("./pages/PayrollCalculatorPage"));
const BusinessGrowthSimulatorPage = lazy(() => import("./pages/BusinessGrowthSimulatorPage"));
const ProfitLossTrackerPage = lazy(() => import("./pages/ProfitLossTrackerPage"));
const BankruptcyRiskPage = lazy(() => import("./pages/BankruptcyRiskPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading skeleton for lazy routes
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground tracking-wide">Loading…</span>
    </div>
  </div>
);

const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>
    <PageTransition>{children}</PageTransition>
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/services" element={<LazyPage><ServicesPage /></LazyPage>} />
        <Route path="/portal" element={<LazyPage><PortalPage /></LazyPage>} />
        <Route path="/portal/eway-bill" element={<LazyPage><EWayBillService /></LazyPage>} />
        <Route path="/portal/gst-registration" element={<LazyPage><GSTRegistration /></LazyPage>} />
        <Route path="/portal/gst-return-filing" element={<LazyPage><GSTReturnFiling /></LazyPage>} />
        <Route path="/portal/bookkeeping" element={<LazyPage><Bookkeeping /></LazyPage>} />
        <Route path="/portal/drafting" element={<LazyPage><DraftingService /></LazyPage>} />
        <Route path="/portal/balance-sheet" element={<LazyPage><BalanceSheetService /></LazyPage>} />
        <Route path="/services/eway-bill" element={<LazyPage><EWayBillService /></LazyPage>} />
        <Route path="/services/gst-registration" element={<LazyPage><GSTRegistration /></LazyPage>} />
        <Route path="/services/gst-return-filing" element={<LazyPage><GSTReturnFiling /></LazyPage>} />
        <Route path="/services/bookkeeping" element={<LazyPage><Bookkeeping /></LazyPage>} />
        <Route path="/tools" element={<LazyPage><ToolsPage /></LazyPage>} />
        <Route path="/blog" element={<LazyPage><BlogPage /></LazyPage>} />
        <Route path="/admin" element={<LazyPage><AdminPage /></LazyPage>} />
        <Route path="/partnership" element={<LazyPage><PartnershipPage /></LazyPage>} />
        <Route path="/large-scale-services" element={<LazyPage><LargeScaleServicesPage /></LazyPage>} />
        <Route path="/know-your-rights" element={<LazyPage><KnowYourRightsPage /></LazyPage>} />
        <Route path="/know-taxation" element={<LazyPage><KnowTaxationPage /></LazyPage>} />
        <Route path="/tax-notice-help" element={<LazyPage><TaxNoticeHelpPage /></LazyPage>} />
        <Route path="/tax-risk-analyzer" element={<LazyPage><TaxRiskAnalyzerPage /></LazyPage>} />
        <Route path="/notice-upload" element={<LazyPage><NoticeUploadPage /></LazyPage>} />
        <Route path="/subscription-plans" element={<LazyPage><SubscriptionPlansPage /></LazyPage>} />
        <Route path="/startup-wizard" element={<LazyPage><StartupWizardPage /></LazyPage>} />
        <Route path="/compliance-calendar" element={<LazyPage><ComplianceCalendarPage /></LazyPage>} />
        <Route path="/document-vault" element={<LazyPage><DocumentVaultPage /></LazyPage>} />
        <Route path="/service-marketplace" element={<LazyPage><ServiceMarketplacePage /></LazyPage>} />
        <Route path="/litigation-tracker" element={<LazyPage><LitigationTrackerPage /></LazyPage>} />
        <Route path="/login" element={<LazyPage><LoginPage /></LazyPage>} />
        <Route path="/signup" element={<LazyPage><SignupPage /></LazyPage>} />
        <Route path="/industry-guides" element={<LazyPage><IndustryGuidesPage /></LazyPage>} />
        <Route path="/compliance-health" element={<LazyPage><ComplianceHealthPage /></LazyPage>} />
        <Route path="/tax-assistant" element={<LazyPage><TaxAssistantPage /></LazyPage>} />
        <Route path="/tax-news" element={<LazyPage><TaxNewsRadarPage /></LazyPage>} />
        <Route path="/document-analyzer" element={<LazyPage><DocumentAnalyzerPage /></LazyPage>} />
        <Route path="/tax-updates" element={<LazyPage><TaxUpdatesPage /></LazyPage>} />
        <Route path="/compliance-dashboard" element={<LazyPage><ComplianceDashboardPage /></LazyPage>} />
        <Route path="/compliance-twin" element={<LazyPage><ComplianceTwinPage /></LazyPage>} />
        <Route path="/tax-intelligence-radar" element={<LazyPage><TaxIntelligenceRadarPage /></LazyPage>} />
        <Route path="/tax-operating-system" element={<LazyPage><TaxOperatingSystemPage /></LazyPage>} />
        <Route path="/ecosystem" element={<LazyPage><EcosystemHubPage /></LazyPage>} />
        <Route path="/hsn-code-finder" element={<LazyPage><HSNCodeFinderPage /></LazyPage>} />
        <Route path="/tax-strategy-simulator" element={<LazyPage><TaxStrategySimulatorPage /></LazyPage>} />
        <Route path="/compliance-heatmap" element={<LazyPage><ComplianceHeatmapPage /></LazyPage>} />
        <Route path="/command-center" element={<LazyPage><FinancialCommandCenterPage /></LazyPage>} />
        <Route path="/ai-cfo" element={<LazyPage><AICFOSystemPage /></LazyPage>} />
        <Route path="/income-tax-calculator" element={<LazyPage><IncomeTaxCalculatorPage /></LazyPage>} />
        <Route path="/gst-calculator" element={<LazyPage><GSTCalculatorPage /></LazyPage>} />
        <Route path="/capital-gains-calculator" element={<LazyPage><CapitalGainsCalculatorPage /></LazyPage>} />
        <Route path="/payroll-calculator" element={<LazyPage><PayrollCalculatorPage /></LazyPage>} />
        <Route path="/growth-simulator" element={<LazyPage><BusinessGrowthSimulatorPage /></LazyPage>} />
        <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
