import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { calculateInvoiceGST, estimateGSTReturn, type GSTInvoiceItem, type GSTRate, type SupplyType } from "@/lib/engines/gstEngine";

const fmt = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const RATES: GSTRate[] = [5, 12, 18, 28];
const COLORS = ['#d4af37', '#3b82f6', '#10b981', '#f59e0b'];

const GSTCalculatorPage = () => {
  const [tab, setTab] = useState<'invoice' | 'return'>('invoice');
  const [items, setItems] = useState<GSTInvoiceItem[]>([
    { description: 'Software License', quantity: 1, unitPrice: 100000, gstRate: 18, supplyType: 'intraState' },
  ]);
  const [salesAmt, setSalesAmt] = useState(1000000);
  const [salesRate, setSalesRate] = useState<GSTRate>(18);
  const [salesType, setSalesType] = useState<SupplyType>('intraState');
  const [purchaseAmt, setPurchaseAmt] = useState(600000);
  const [purchaseRate, setPurchaseRate] = useState<GSTRate>(18);
  const [purchaseType, setPurchaseType] = useState<SupplyType>('intraState');

  const invoiceResult = useMemo(() => calculateInvoiceGST(items), [items]);
  const returnResult = useMemo(() => estimateGSTReturn(
    [{ amount: salesAmt, rate: salesRate, type: salesType }],
    [{ amount: purchaseAmt, rate: purchaseRate, type: purchaseType }]
  ), [salesAmt, salesRate, salesType, purchaseAmt, purchaseRate, purchaseType]);

  const addItem = () => setItems(prev => [...prev, { description: '', quantity: 1, unitPrice: 0, gstRate: 18, supplyType: 'intraState' }]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, key: keyof GSTInvoiceItem, val: any) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [key]: val } : item));
  };

  const pieParts = [
    { name: 'CGST', value: tab === 'invoice' ? invoiceResult.cgst : returnResult.cgstPayable },
    { name: 'SGST', value: tab === 'invoice' ? invoiceResult.sgst : returnResult.sgstPayable },
    { name: 'IGST', value: tab === 'invoice' ? invoiceResult.igst : returnResult.igstPayable },
  ].filter(p => p.value > 0);

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">GST <span className="gradient-text">Calculation Suite</span></h1>
            <p className="text-muted-foreground mt-2">Invoice simulation & return estimation</p>
          </motion.div>

          <div className="flex gap-2 mb-8">
            {(['invoice', 'return'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-accent text-accent-foreground' : 'bg-muted/30 text-muted-foreground border border-border/40'}`}>
                {t === 'invoice' ? 'Invoice Simulator' : 'Return Estimator'}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-4">
              {tab === 'invoice' ? (
                <div className="glass-card rounded-xl p-6 border border-border/40">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-heading text-base font-semibold text-foreground">Invoice Items</h3>
                    <button onClick={addItem} className="flex items-center gap-1 text-xs text-accent font-medium hover:underline"><Plus className="w-3.5 h-3.5" />Add Item</button>
                  </div>
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 items-center p-3 bg-muted/20 rounded-lg">
                        <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Description"
                          className="col-span-3 bg-transparent border border-border/40 rounded px-2 py-1.5 text-xs text-foreground" />
                        <input type="number" value={item.quantity} onChange={e => updateItem(i, 'quantity', Number(e.target.value))} placeholder="Qty"
                          className="col-span-1 bg-transparent border border-border/40 rounded px-2 py-1.5 text-xs text-foreground" />
                        <input type="number" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', Number(e.target.value))} placeholder="Price"
                          className="col-span-2 bg-transparent border border-border/40 rounded px-2 py-1.5 text-xs text-foreground" />
                        <select value={item.gstRate} onChange={e => updateItem(i, 'gstRate', Number(e.target.value))}
                          className="col-span-2 bg-transparent border border-border/40 rounded px-2 py-1.5 text-xs text-foreground">
                          {RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                        <select value={item.supplyType} onChange={e => updateItem(i, 'supplyType', e.target.value)}
                          className="col-span-3 bg-transparent border border-border/40 rounded px-2 py-1.5 text-xs text-foreground">
                          <option value="intraState">Intra-State</option>
                          <option value="interState">Inter-State</option>
                        </select>
                        <button onClick={() => removeItem(i)} className="col-span-1 text-red-400 hover:text-red-300"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-xl p-6 border border-border/40 space-y-6">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Sales (Output)</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <input type="number" value={salesAmt} onChange={e => setSalesAmt(Number(e.target.value))} placeholder="Amount"
                        className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground" />
                      <select value={salesRate} onChange={e => setSalesRate(Number(e.target.value) as GSTRate)}
                        className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground">
                        {RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                      </select>
                      <select value={salesType} onChange={e => setSalesType(e.target.value as SupplyType)}
                        className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground">
                        <option value="intraState">Intra-State</option>
                        <option value="interState">Inter-State</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Purchases (Input)</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <input type="number" value={purchaseAmt} onChange={e => setPurchaseAmt(Number(e.target.value))} placeholder="Amount"
                        className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground" />
                      <select value={purchaseRate} onChange={e => setPurchaseRate(Number(e.target.value) as GSTRate)}
                        className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground">
                        {RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                      </select>
                      <select value={purchaseType} onChange={e => setPurchaseType(e.target.value as SupplyType)}
                        className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground">
                        <option value="intraState">Intra-State</option>
                        <option value="interState">Inter-State</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-card rounded-xl p-6 border border-accent/20">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">
                  {tab === 'invoice' ? 'Invoice Summary' : 'Net GST Liability'}
                </h3>
                {tab === 'invoice' ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Taxable Value</span><span className="text-foreground">{fmt(invoiceResult.taxableValue)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">CGST</span><span>{fmt(invoiceResult.cgst)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">SGST</span><span>{fmt(invoiceResult.sgst)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">IGST</span><span>{fmt(invoiceResult.igst)}</span></div>
                    <div className="border-t border-accent/20 pt-2 flex justify-between font-semibold">
                      <span>Invoice Total</span><span className="gradient-text text-lg">{fmt(invoiceResult.invoiceTotal)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Output GST</span><span>{fmt(returnResult.outputGST)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Input Tax Credit</span><span className="text-emerald-400">-{fmt(returnResult.inputTaxCredit)}</span></div>
                    <div className="border-t border-accent/20 pt-2 flex justify-between font-semibold">
                      <span>Net Payable</span><span className="gradient-text text-lg">{fmt(returnResult.netLiability)}</span>
                    </div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">CGST Payable</span><span>{fmt(returnResult.cgstPayable)}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">SGST Payable</span><span>{fmt(returnResult.sgstPayable)}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">IGST Payable</span><span>{fmt(returnResult.igstPayable)}</span></div>
                  </div>
                )}
              </div>

              {pieParts.length > 0 && (
                <div className="glass-card rounded-xl p-6 border border-border/40">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-2">GST Breakdown</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={pieParts} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                        {pieParts.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default GSTCalculatorPage;
