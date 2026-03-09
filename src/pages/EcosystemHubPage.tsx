import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Calculator, FileText, BarChart3, Target, Activity, Rocket,
  BookOpen, Users, Briefcase, TrendingUp, Zap, Search, Upload, Calendar,
  FolderLock, AlertTriangle, Star, ArrowRight, Globe, Cpu, Eye, Map
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

const ecosystemSections = [
  {
    title: "Client Acquisition",
    desc: "Interactive tools that engage prospects and convert them into clients",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    items: [
      { label: "GST Late Fee Calculator", href: "/tools", icon: Calculator },
      { label: "Income Tax Calculator", href: "/tools", icon: Calculator },
      { label: "E-Way Bill Calculator", href: "/tools", icon: Calculator },
      { label: "HSN Code Finder", href: "/hsn-code-finder", icon: Search },
      { label: "Tax Risk Analyzer", href: "/tax-risk-analyzer", icon: Target },
      { label: "Notice Upload", href: "/notice-upload", icon: Upload },
    ],
  },
  {
    title: "Compliance Intelligence",
    desc: "Real-time regulatory monitoring and impact analysis",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    items: [
      { label: "Intelligence Radar", href: "/tax-intelligence-radar", icon: Zap },
      { label: "Latest Tax Updates", href: "/tax-updates", icon: FileText },
      { label: "Tax News Radar", href: "/tax-news", icon: Globe },
      { label: "Compliance Calendar", href: "/compliance-calendar", icon: Calendar },
    ],
  },
  {
    title: "Business Dashboard",
    desc: "Centralized compliance management and monitoring",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
    items: [
      { label: "Tax Operating System", href: "/tax-operating-system", icon: Cpu },
      { label: "Command Center", href: "/compliance-dashboard", icon: BarChart3 },
      { label: "Compliance Health", href: "/compliance-health", icon: Activity },
      { label: "Compliance Heatmap", href: "/compliance-heatmap", icon: Map },
      { label: "Document Vault", href: "/document-vault", icon: FolderLock },
      { label: "Litigation Tracker", href: "/litigation-tracker", icon: AlertTriangle },
    ],
  },
  {
    title: "Knowledge Platform",
    desc: "Educational resources empowering taxpayers",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    items: [
      { label: "Know Your Rights", href: "/know-your-rights", icon: Shield },
      { label: "Know Taxation", href: "/know-taxation", icon: BookOpen },
      { label: "Tax Notice Help", href: "/tax-notice-help", icon: FileText },
      { label: "Industry Guides", href: "/industry-guides", icon: Briefcase },
      { label: "Blog & Insights", href: "/blog", icon: BookOpen },
    ],
  },
  {
    title: "Services & Revenue",
    desc: "Professional services, subscriptions, and marketplace",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    items: [
      { label: "All Services", href: "/services", icon: Briefcase },
      { label: "Client Portal", href: "/portal", icon: Users },
      { label: "Service Marketplace", href: "/service-marketplace", icon: Star },
      { label: "Subscription Plans", href: "/subscription-plans", icon: TrendingUp },
      { label: "Enterprise Solutions", href: "/large-scale-services", icon: Rocket },
    ],
  },
  {
    title: "Advanced Innovation",
    desc: "AI-powered predictive compliance tools",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    items: [
      { label: "Compliance Twin", href: "/compliance-twin", icon: Cpu },
      { label: "Tax Strategy Simulator", href: "/tax-strategy-simulator", icon: TrendingUp },
      { label: "Doc Analyzer", href: "/document-analyzer", icon: Eye },
      { label: "Tax Assistant", href: "/tax-assistant", icon: Zap },
      { label: "Startup Wizard", href: "/startup-wizard", icon: Rocket },
    ],
  },
];

const EcosystemHubPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Zap className="w-3 h-3 mr-1" /> Tax-Tech Ecosystem
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
              The Complete <span className="text-accent">Tax-Tech Ecosystem</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Consulting services, compliance tools, client dashboards, and regulatory intelligence — unified in one platform by Kota & Associates.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-accent hover:bg-accent/90 gap-1.5">
                <Link to="/tax-operating-system"><Cpu className="w-4 h-4" /> Open Tax OS</Link>
              </Button>
              <Button asChild variant="outline" className="border-accent/20 text-accent gap-1.5">
                <Link to="/compliance-dashboard"><BarChart3 className="w-4 h-4" /> Command Center</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Grid */}
      <section className="pb-28">
        <div className="container mx-auto px-4 space-y-10">
          {ecosystemSections.map((section, si) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.06 }}>
              <div className="mb-4">
                <h2 className={`text-lg font-bold ${section.color}`}>{section.title}</h2>
                <p className="text-xs text-muted-foreground">{section.desc}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <Link key={item.label} to={item.href}>
                    <Card className={`premium-card group hover:border-accent/30 transition-all cursor-pointer h-full`}>
                      <CardContent className="pt-5 pb-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${section.bg} ${section.border} border flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-5 h-5 ${section.color}`} />
                        </div>
                        <span className="text-sm font-semibold group-hover:text-accent transition-colors">{item.label}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EcosystemHubPage;
