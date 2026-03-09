import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, ExternalLink, Bell, ArrowRight, FileText, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { taxUpdatesData, type TaxUpdate } from "@/data/taxUpdatesData";

const subcategories = {
  gst: ["All", "GST Circulars", "GST Notifications", "Rule Amendments", "Filing Deadlines", "GST Council Decisions"],
  "income-tax": ["All", "CBDT Circulars", "Tax Rule Changes", "New Compliance Requirements", "Deadline Extensions"],
};

const UpdateCard = ({ update, index }: { update: TaxUpdate; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Card className="premium-card group hover:border-accent/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider border-accent/30 text-accent">
              {update.subcategory}
            </Badge>
            <CardTitle className="text-base font-semibold leading-snug group-hover:text-accent transition-colors">
              {update.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{update.description}</p>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {update.source}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 text-xs gap-1 h-7 px-2">
            Read More <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const TaxUpdatesPage = () => {
  const [activeTab, setActiveTab] = useState<"gst" | "income-tax">("gst");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subPhone, setSubPhone] = useState("");

  const filtered = useMemo(() => {
    return taxUpdatesData.filter((u) => {
      if (u.category !== activeTab) return false;
      if (activeFilter !== "All" && u.subcategory !== activeFilter) return false;
      if (search && !u.title.toLowerCase().includes(search.toLowerCase()) && !u.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, search, activeFilter]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed successfully! You'll receive tax update alerts.");
    setSubName("");
    setSubEmail("");
    setSubPhone("");
  };

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Live Updates</Badge>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              Latest Tax <span className="text-accent">Updates</span>
            </h1>
            <p className="text-muted-foreground text-lg">Stay ahead with real-time GST and Income Tax regulatory updates from official sources.</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as any); setActiveFilter("All"); }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="gst" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Scale className="w-4 h-4" /> GST Updates
              </TabsTrigger>
              <TabsTrigger value="income-tax" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <FileText className="w-4 h-4" /> Income Tax Updates
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search updates..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 w-64 bg-muted/30" />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 border-accent/30 text-accent hover:bg-accent/10">
                    <Bell className="w-4 h-4" /> Subscribe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Subscribe to Tax Update Alerts</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubscribe} className="space-y-4 pt-2">
                    <div><Label>Name</Label><Input value={subName} onChange={(e) => setSubName(e.target.value)} required /></div>
                    <div><Label>Email</Label><Input type="email" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} required /></div>
                    <div><Label>Phone</Label><Input type="tel" value={subPhone} onChange={(e) => setSubPhone(e.target.value)} required /></div>
                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Subcategory Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {subcategories[activeTab].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${activeFilter === cat ? "bg-accent text-accent-foreground" : "bg-muted/40 text-muted-foreground hover:bg-muted/60"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <TabsContent value="gst" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {filtered.map((u, i) => <UpdateCard key={u.id} update={u} index={i} />)}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No updates match your criteria.</p>}
          </TabsContent>
          <TabsContent value="income-tax" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {filtered.map((u, i) => <UpdateCard key={u.id} update={u} index={i} />)}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No updates match your criteria.</p>}
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </main>
  );
};

export default TaxUpdatesPage;
