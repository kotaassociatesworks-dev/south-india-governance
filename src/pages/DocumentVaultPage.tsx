import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, FileText, Upload, Trash2, Search, Filter, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["All", "GST Returns", "Notices", "Financial Statements", "Agreements", "Other"];
const years = ["2025", "2024", "2023", "2022"];

const mockDocs = [
  { id: 1, name: "GSTR-1 January 2025.pdf", category: "GST Returns", year: "2025", size: "245 KB", date: "2025-02-10" },
  { id: 2, name: "GSTR-3B December 2024.pdf", category: "GST Returns", year: "2024", size: "180 KB", date: "2025-01-15" },
  { id: 3, name: "GST Notice ASMT-10.pdf", category: "Notices", year: "2024", size: "520 KB", date: "2024-11-20" },
  { id: 4, name: "Balance Sheet FY 2023-24.xlsx", category: "Financial Statements", year: "2024", size: "1.2 MB", date: "2024-09-30" },
  { id: 5, name: "Partnership Deed.pdf", category: "Agreements", year: "2023", size: "890 KB", date: "2023-06-15" },
  { id: 6, name: "Profit & Loss FY 2022-23.xlsx", category: "Financial Statements", year: "2023", size: "980 KB", date: "2023-08-20" },
];

const DocumentVaultPage = () => {
  const [docs, setDocs] = useState(mockDocs);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const filtered = docs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || d.category === catFilter;
    const matchYear = yearFilter === "All" || d.year === yearFilter;
    return matchSearch && matchCat && matchYear;
  });

  const handleUpload = (e) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs = Array.from(files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      category: "Other",
      year: "2025",
      size: `${(f.size / 1024).toFixed(0)} KB`,
      date: new Date().toISOString().split("T")[0],
    }));
    setDocs((prev) => [...newDocs, ...prev]);
  };

  const handleDelete = (id) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Document Vault</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Secure Document Vault</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Store, organize, and access your compliance documents securely.</p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..." className="pl-10" />
            </div>
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground"
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground"
            >
              <option value="All">All Years</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <label>
              <Button asChild className="cursor-pointer">
                <span><Upload className="w-4 h-4 mr-1" /> Upload</span>
              </Button>
              <input type="file" multiple onChange={handleUpload} className="hidden" />
            </label>
          </div>

          {/* Document List */}
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No documents found.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/50 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-accent shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.category} • {doc.year} • {doc.size}</p>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">{doc.date}</span>
                    <button onClick={() => handleDelete(doc.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            This is a frontend demo. Connect to Lovable Cloud for persistent, encrypted document storage.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default DocumentVaultPage;
