import { useState } from "react";
import { motion } from "framer-motion";
import {
  Map, Shield, AlertTriangle, CheckCircle2, Clock, TrendingUp,
  ArrowRight, Activity, Target, BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

const complianceAreas = [
  { area: "GST Filing", score: 92, status: "excellent", filedOnTime: 11, total: 12, risk: "low" },
  { area: "TDS Compliance", score: 68, status: "moderate", filedOnTime: 3, total: 4, risk: "medium" },
  { area: "Income Tax", score: 45, status: "high-risk", filedOnTime: 0, total: 1, risk: "high" },
  { area: "Notice Response", score: 55, status: "moderate", filedOnTime: 1, total: 3, risk: "medium" },
  { area: "Reconciliation", score: 78, status: "good", filedOnTime: null, total: null, risk: "low" },
  { area: "E-Invoicing", score: 95, status: "excellent", filedOnTime: null, total: null, risk: "low" },
  { area: "Audit Readiness", score: 60, status: "moderate", filedOnTime: null, total: null, risk: "medium" },
  { area: "LUT/Bond Filing", score: 88, status: "good", filedOnTime: null, total: null, risk: "low" },
];

const riskPredictions = [
  { month: "Apr 2026", risk: 25, events: "GSTR-3B, GSTR-1 due" },
  { month: "May 2026", risk: 40, events: "TDS Q4 return due" },
  { month: "Jun 2026", risk: 15, events: "No major deadlines" },
  { month: "Jul 2026", risk: 85, events: "ITR deadline, GST annual" },
  { month: "Aug 2026", risk: 30, events: "GSTR-9 due" },
  { month: "Sep 2026", risk: 55, events: "TDS Q1 return, IT audit" },
];

const heatColor = (score: number) => {
  if (score >= 80) return { bg: "bg-emerald-500", text: "text-emerald-400", light: "bg-emerald-500/15" };
  if (score >= 60) return { bg: "bg-amber-500", text: "text-amber-400", light: "bg-amber-500/15" };
  return { bg: "bg-red-500", text: "text-red-400", light: "bg-red-500/15" };
};

const getBarColor = (risk: number) => {
  if (risk >= 70) return "#ef4444";
  if (risk >= 40) return "#f59e0b";
  return "#10b981";
};

const ComplianceHeatmapPage = () => {
  const overallScore = Math.round(complianceAreas.reduce((s, a) => s + a.score, 0) / complianceAreas.length);
  const overallColors = heatColor(overallScore);

  const radarData = complianceAreas.map((a) => ({ subject: a.area, score: a.score, fullMark: 100 }));

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      <section className="pt-44 pb-6">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20"><Map className="w-3 h-3 mr-1" /> Visual Analytics</Badge>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">Compliance <span className="text-accent">Heatmap & Risk Predictor</span></h1>
            <p className="text-muted-foreground">Visual overview of compliance health across all tax areas with forward-looking risk predictions.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-4">
          {/* Overall Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="premium-card border-accent/20">
              <CardContent className="pt-6 pb-5">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className={`w-24 h-24 rounded-2xl ${overallColors.light} flex items-center justify-center`}>
                    <span className={`text-4xl font-bold ${overallColors.text}`}>{overallScore}</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-bold">Overall Compliance Score</h3>
                    <p className="text-xs text-muted-foreground">Aggregated across {complianceAreas.length} compliance areas</p>
                    <div className="flex gap-3 mt-3">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]">
                        {complianceAreas.filter(a => a.score >= 80).length} Excellent
                      </Badge>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px]">
                        {complianceAreas.filter(a => a.score >= 60 && a.score < 80).length} Moderate
                      </Badge>
                      <Badge className="bg-red-500/10 text-red-400 border-red-500/30 text-[10px]">
                        {complianceAreas.filter(a => a.score < 60).length} At Risk
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar Chart + Heatmap Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Radar Chart */}
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-accent" /> Compliance Radar</CardTitle>
                <CardDescription className="text-xs">Multi-axis view of compliance performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                    <Radar name="Score" dataKey="score" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Heatmap Grid */}
            <div>
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> Score Heatmap</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {complianceAreas.map((area, i) => {
                  const colors = heatColor(area.score);
                  return (
                    <motion.div key={area.area} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
                      <Card className="premium-card hover:border-accent/30 transition-all cursor-pointer">
                        <CardContent className="pt-4 pb-3 text-center">
                          <div className={`w-14 h-14 rounded-xl ${colors.light} mx-auto mb-2 flex items-center justify-center`}>
                            <span className={`text-xl font-bold ${colors.text}`}>{area.score}</span>
                          </div>
                          <p className="text-xs font-semibold mb-1">{area.area}</p>
                          {area.filedOnTime !== null && (
                            <p className="text-[10px] text-muted-foreground">{area.filedOnTime}/{area.total} on time</p>
                          )}
                          <Badge variant="outline" className={`text-[9px] mt-1.5 ${
                            area.risk === "low" ? "text-emerald-400 border-emerald-500/30" :
                            area.risk === "medium" ? "text-amber-400 border-amber-500/30" :
                            "text-red-400 border-red-500/30"
                          }`}>{area.risk} risk</Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Risk Predictor Chart + Actions */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><Target className="w-4 h-4 text-accent" /> Risk Predictor (Next 6 Months)</CardTitle>
                <CardDescription className="text-xs">Forward-looking compliance risk based on upcoming obligations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={riskPredictions} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(value: number) => [`${value}%`, "Risk Level"]}
                    />
                    <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                      {riskPredictions.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(entry.risk)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 justify-center mt-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Low (&lt;40%)</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Medium (40-70%)</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><div className="w-2.5 h-2.5 rounded-sm bg-red-500" /> High (&gt;70%)</div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Risk Mitigation Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: "File Income Tax Return immediately", priority: "high", impact: "Removes overdue status, avoids penalty" },
                  { action: "Complete GSTR-2A reconciliation", priority: "medium", impact: "Recovers ₹45,000 in ITC claims" },
                  { action: "Respond to TDS default notice", priority: "high", impact: "Prevents further penalties under 234E" },
                  { action: "Prepare for tax audit (Sec 44AB)", priority: "medium", impact: "Ensure audit readiness before Sep deadline" },
                ].map((item) => (
                  <div key={item.action} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-semibold">{item.action}</p>
                      <Badge variant="outline" className={`text-[9px] flex-shrink-0 ${
                        item.priority === "high" ? "text-red-400 border-red-500/30" : "text-amber-400 border-amber-500/30"
                      }`}>{item.priority}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.impact}</p>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 text-xs gap-1 bg-accent hover:bg-accent/90">
                    <ArrowRight className="w-3 h-3" /> Consult Kota Associates
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs border-accent/20 text-accent">
                    Request Compliance Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ComplianceHeatmapPage;
