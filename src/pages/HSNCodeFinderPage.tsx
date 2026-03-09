import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, FileText, ArrowRight, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

const hsnData = [
  { code: "0101", desc: "Live horses, asses, mules and hinnies", rate: 0, chapter: "01" },
  { code: "0201", desc: "Meat of bovine animals, fresh or chilled", rate: 0, chapter: "02" },
  { code: "0401", desc: "Milk and cream, not concentrated", rate: 0, chapter: "04" },
  { code: "0901", desc: "Coffee, whether or not roasted", rate: 5, chapter: "09" },
  { code: "1001", desc: "Wheat and meslin", rate: 0, chapter: "10" },
  { code: "1006", desc: "Rice", rate: 5, chapter: "10" },
  { code: "1701", desc: "Cane or beet sugar", rate: 5, chapter: "17" },
  { code: "2201", desc: "Waters, including mineral and aerated", rate: 18, chapter: "22" },
  { code: "2402", desc: "Cigars, cheroots, cigarillos and cigarettes", rate: 28, chapter: "24" },
  { code: "3004", desc: "Medicaments for therapeutic or prophylactic uses", rate: 12, chapter: "30" },
  { code: "3304", desc: "Beauty or make-up preparations", rate: 28, chapter: "33" },
  { code: "3401", desc: "Soap, organic surface-active products", rate: 18, chapter: "34" },
  { code: "3926", desc: "Articles of plastics", rate: 18, chapter: "39" },
  { code: "4011", desc: "New pneumatic tyres, of rubber", rate: 28, chapter: "40" },
  { code: "4202", desc: "Trunks, suitcases, handbags, wallets", rate: 18, chapter: "42" },
  { code: "4802", desc: "Paper and paperboard, uncoated", rate: 12, chapter: "48" },
  { code: "5208", desc: "Woven fabrics of cotton", rate: 5, chapter: "52" },
  { code: "6109", desc: "T-shirts, singlets and vests, knitted", rate: 5, chapter: "61" },
  { code: "6204", desc: "Women's suits, dresses, skirts", rate: 12, chapter: "62" },
  { code: "6402", desc: "Footwear with outer soles of rubber/plastics", rate: 18, chapter: "64" },
  { code: "7013", desc: "Glassware for table, kitchen, toilet", rate: 18, chapter: "70" },
  { code: "7210", desc: "Flat-rolled products of iron or steel", rate: 18, chapter: "72" },
  { code: "7308", desc: "Structures of iron or steel", rate: 18, chapter: "73" },
  { code: "7615", desc: "Aluminium household articles", rate: 12, chapter: "76" },
  { code: "8414", desc: "Air or vacuum pumps, compressors, fans", rate: 18, chapter: "84" },
  { code: "8471", desc: "Automatic data-processing machines (Computers)", rate: 18, chapter: "84" },
  { code: "8517", desc: "Telephone sets, smartphones", rate: 12, chapter: "85" },
  { code: "8528", desc: "Monitors and projectors; television receivers", rate: 18, chapter: "85" },
  { code: "8703", desc: "Motor cars for transport of persons", rate: 28, chapter: "87" },
  { code: "8711", desc: "Motorcycles and cycles with auxiliary motor", rate: 28, chapter: "87" },
  { code: "9401", desc: "Seats and parts thereof", rate: 18, chapter: "94" },
  { code: "9403", desc: "Furniture and parts thereof", rate: 18, chapter: "94" },
  { code: "9503", desc: "Toys, scale models, puzzles", rate: 12, chapter: "95" },
  { code: "9613", desc: "Cigarette lighters and other lighters", rate: 28, chapter: "96" },
  { code: "9954", desc: "Construction services", rate: 18, chapter: "SAC" },
  { code: "9961", desc: "Financial and related services", rate: 18, chapter: "SAC" },
  { code: "9971", desc: "Financial intermediation services", rate: 18, chapter: "SAC" },
  { code: "9983", desc: "Other professional, technical services", rate: 18, chapter: "SAC" },
  { code: "9985", desc: "Support services", rate: 18, chapter: "SAC" },
  { code: "9992", desc: "Education services", rate: 0, chapter: "SAC" },
  { code: "9963", desc: "Accommodation, food and beverage services", rate: 18, chapter: "SAC" },
  { code: "9964", desc: "Passenger transport services", rate: 5, chapter: "SAC" },
  { code: "9966", desc: "Freight transport and logistics services", rate: 18, chapter: "SAC" },
  { code: "9972", desc: "Real estate services", rate: 18, chapter: "SAC" },
  { code: "9982", desc: "Legal and accounting services", rate: 18, chapter: "SAC" },
  { code: "9984", desc: "Telecommunications, broadcasting services", rate: 18, chapter: "SAC" },
  { code: "9981", desc: "Research and development services", rate: 18, chapter: "SAC" },
  { code: "9986", desc: "Government and defence services", rate: 0, chapter: "SAC" },
  { code: "9991", desc: "Public administration services", rate: 0, chapter: "SAC" },
  { code: "9993", desc: "Human health and social care services", rate: 0, chapter: "SAC" },
];

const rateColor = (rate: number) => {
  if (rate === 0) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (rate <= 5) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
  if (rate <= 12) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  return "bg-red-500/10 text-red-400 border-red-500/30";
};

const HSNCodeFinderPage = () => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return hsnData.filter(
      (h) => h.code.includes(q) || h.desc.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query]);

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      <section className="pt-44 pb-6">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20"><Search className="w-3 h-3 mr-1" /> Lookup Tool</Badge>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">HSN / SAC <span className="text-accent">Code Finder</span></h1>
            <p className="text-muted-foreground">Search by code number or product/service description to find GST rates instantly.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              className="pl-12 h-14 text-base border-accent/20 focus:border-accent"
              placeholder="Search HSN/SAC code or description (e.g. 8517 or smartphone)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {!query && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Enter a code or description to begin searching</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Smartphone", "Cotton", "Transport", "Education", "Furniture"].map((s) => (
                  <Button key={s} size="sm" variant="outline" className="text-xs border-accent/20 text-accent" onClick={() => setQuery(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground mb-4">No matching HSN/SAC codes found for "{query}"</p>
              <Button variant="outline" className="text-xs gap-1 border-accent/20 text-accent">
                <ArrowRight className="w-3 h-3" /> Consult Kota Associates for Help
              </Button>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-3">{results.length} result{results.length > 1 ? "s" : ""} found</p>
              {results.map((h) => (
                <motion.div key={h.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="premium-card hover:border-accent/30 transition-colors">
                    <CardContent className="pt-4 pb-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-14 h-10 rounded bg-muted/30 border border-border/30 flex items-center justify-center font-mono text-sm font-bold text-accent">
                          {h.code}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{h.desc}</p>
                          <p className="text-[10px] text-muted-foreground">Chapter {h.chapter}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs font-bold ${rateColor(h.rate)}`}>
                        {h.rate}%
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              <Card className="premium-card border-accent/20 mt-6">
                <CardContent className="pt-5 pb-4 text-center">
                  <p className="text-xs text-muted-foreground mb-3">Need help with GST classification or rate disputes?</p>
                  <Button className="bg-accent hover:bg-accent/90 text-xs gap-1">
                    <ArrowRight className="w-3 h-3" /> Consult Kota Associates
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HSNCodeFinderPage;
