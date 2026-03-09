import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Scale, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { taxUpdatesData } from "@/data/taxUpdatesData";

const LatestTaxUpdatesFeed = () => {
  const latest = taxUpdatesData.slice(0, 5);

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <TrendingUp className="w-3 h-3 mr-1" /> Live Feed
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-3">
            Latest Tax <span className="text-accent">Updates</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Real-time regulatory updates on GST and Income Tax from official sources.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {latest.map((update, i) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="premium-card h-full group hover:border-accent/30 transition-all">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-accent/30 text-accent">
                      {update.category === "gst" ? <Scale className="w-3 h-3 mr-1" /> : <FileText className="w-3 h-3 mr-1" />}
                      {update.category === "gst" ? "GST" : "Income Tax"}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2 group-hover:text-accent transition-colors leading-snug">{update.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{update.description.slice(0, 120)}...</p>
                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{update.source}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/tax-updates">
            <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 gap-2">
              View All Updates <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestTaxUpdatesFeed;
