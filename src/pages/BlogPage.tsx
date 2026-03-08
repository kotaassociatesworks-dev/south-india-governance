import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Search, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    id: "gst-notice-reply",
    category: "GST Compliance",
    title: "How to Reply to a GST Notice: Complete Guide for Businesses",
    excerpt: "Received a GST notice? Don't panic. This comprehensive guide explains different types of GST notices (ASMT-10, DRC-01, DRC-03) and step-by-step process to draft a proper reply with supporting documents.",
    date: "March 2026",
    readTime: "8 min",
    content: `
## Types of GST Notices

### ASMT-10: Scrutiny Notice
This notice is issued when the tax officer finds discrepancies in your GST returns. Common triggers include:
- Mismatch between GSTR-1 and GSTR-3B
- Excess ITC claims
- Under-reporting of turnover

### DRC-01: Show Cause Notice
Issued under Section 73 or 74 of CGST Act when the department determines tax has not been paid, short-paid, or wrongly refunded.

### DRC-03: Voluntary Payment
You can make voluntary payments to settle tax demands before adjudication.

## Steps to Reply

1. **Read the notice carefully** - Identify the specific sections and periods mentioned
2. **Gather supporting documents** - Invoices, bank statements, returns filed
3. **Draft your reply** - Address each point raised in the notice
4. **File on GST portal** - Submit through the Returns → Notices tab
5. **Keep acknowledgment** - Save the ARN for future reference

## Important Timelines
- Reply must be filed within **30 days** of receiving the notice
- Extensions can be requested in writing
- Non-compliance can lead to ex-parte orders

*Need help with your GST notice? Contact Kota Associates for professional representation.*
    `,
  },
  {
    id: "gst-late-fee-rules",
    category: "GST Updates",
    title: "GST Late Fee Rules 2024-25: Maximum Caps and Calculations",
    excerpt: "Complete breakdown of GST late fee structure for GSTR-1, GSTR-3B, GSTR-9, and GSTR-9C. Know the maximum caps and how to minimize your late fee liability.",
    date: "February 2026",
    readTime: "6 min",
    content: `
## Late Fee Structure

### GSTR-3B Late Fee
- **With tax liability**: ₹25/day CGST + ₹25/day SGST (max ₹5,000 each)
- **Nil returns**: ₹10/day CGST + ₹10/day SGST (max ₹500 each)

### GSTR-1 Late Fee
- ₹50/day (₹25 CGST + ₹25 SGST)
- Nil returns: ₹20/day (max ₹500 each)

### GSTR-9 (Annual Return) Late Fee
- ₹100/day (₹50 CGST + ₹50 SGST)
- Maximum: 0.25% of turnover in the state/UT

### Interest on Late Payment
- 18% per annum on outstanding tax from due date
- Calculated from the day after due date until payment

## Tips to Minimize Late Fees
1. File nil returns on time even with zero transactions
2. Set up GST calendar reminders
3. Use our free GST Late Fee Calculator to estimate your liability
4. Consider professional filing services for timely compliance

*Kota Associates offers monthly GST filing services starting at ₹599.*
    `,
  },
  {
    id: "eway-bill-rules",
    category: "E-Way Bill",
    title: "E-Way Bill Rules 2024: Complete Guide for Transporters and Traders",
    excerpt: "Everything you need to know about E-Way Bill generation, validity, Part-A and Part-B requirements, exemptions, and penalties for non-compliance.",
    date: "January 2026",
    readTime: "10 min",
    content: `
## What is an E-Way Bill?

An E-Way Bill (Electronic Way Bill) is a document required for movement of goods worth more than ₹50,000 within or across state borders. It is generated on the E-Way Bill portal (ewaybillgst.gov.in).

## When is E-Way Bill Required?

- Supply of goods (sale/purchase)
- Reasons other than supply (job work, exhibition)
- Inward supply from unregistered person
- Movement of goods worth > ₹50,000

## Validity Based on Distance

| Distance | Validity |
|----------|----------|
| Up to 100 KM | 1 day |
| 100-300 KM | 3 days |
| 300-500 KM | 5 days |
| 500-1000 KM | 10 days |
| Every 100 KM | +1 day |

## Penalties for Non-Compliance
- Goods and vehicle can be detained
- Penalty of ₹10,000 or tax evaded (whichever is higher)
- Movement without valid E-Way Bill is an offence under Section 129

*Need bulk E-Way Bill generation? Kota Associates offers bulk upload service at competitive rates.*
    `,
  },
  {
    id: "gst-refund-process",
    category: "GST Compliance",
    title: "GST Refund Process: How to Claim and Track Your Refund",
    excerpt: "Step-by-step guide to claiming GST refunds for exports, inverted duty structure, excess tax payment, and accumulated ITC. Includes timelines and required documents.",
    date: "December 2025",
    readTime: "7 min",
    content: `
## Types of GST Refunds

### 1. Export Refund
- Zero-rated supplies under LUT/Bond
- Refund of IGST paid on exports
- Timeline: 60 days from filing application

### 2. Inverted Duty Structure
- When input tax rate > output tax rate
- Formula: Maximum refund = (Turnover of inverted rated supply × Net ITC ÷ Adjusted total turnover) - Tax payable

### 3. Excess Balance in Electronic Cash Ledger
- Direct refund through RFD-01
- No restrictions on amount

## Documents Required
1. RFD-01 application on GST portal
2. Statement of invoices (RFD-01A)
3. Bank realization certificate (for exports)
4. Shipping bills / Bill of export
5. CA certificate (for refund > ₹2 lakh)

## Common Rejection Reasons
- Incomplete documentation
- Mismatch in return data
- Non-compliance of conditions
- Filing beyond 2-year limitation

*Our team at Kota Associates has successfully processed hundreds of GST refund claims across South India.*
    `,
  },
  {
    id: "partnership-deed-guide",
    category: "Legal Services",
    title: "Partnership Deed Drafting: Essential Clauses Every Business Needs",
    excerpt: "A well-drafted partnership deed protects all partners' interests. Learn about mandatory and recommended clauses under the Indian Partnership Act, 1932.",
    date: "November 2025",
    readTime: "5 min",
    content: `
## Why is a Partnership Deed Important?

A partnership deed is a legal agreement between partners that defines the terms of the partnership. While not legally mandatory, it protects partners from disputes and provides clarity on profit sharing, responsibilities, and exit mechanisms.

## Essential Clauses

1. **Name and address** of the firm and all partners
2. **Nature of business** to be carried on
3. **Capital contribution** by each partner
4. **Profit and loss sharing ratio**
5. **Salary, commission, and interest** provisions
6. **Rights and duties** of each partner
7. **Dispute resolution** mechanism
8. **Admission and retirement** of partners
9. **Dissolution** provisions
10. **Bank account** operations and signing authority

## Registration Benefits
- Admissible as evidence in court
- Partners can file suits against each other
- Partners can file suits against third parties

*Kota Associates drafts comprehensive partnership deeds starting at ₹4,999. Contact us for a consultation.*
    `,
  },
];

const categories = ["All", ...new Set(articles.map((a) => a.category))];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchCategory = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (activeArticle) {
    const article = articles.find((a) => a.id === activeArticle);
    if (!article) return null;
    return (
      <main>
        <Navbar />
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <button onClick={() => setActiveArticle(null)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              ← Back to Articles
            </button>
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">{article.category}</span>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readTime} read</span>
                <span>{article.date}</span>
              </div>
              <div className="bg-background border border-border p-8 lg:p-10 prose prose-sm max-w-none">
                {article.content.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} className="font-heading text-xl font-bold text-foreground mt-6 mb-3">{line.replace("## ", "")}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="font-heading text-lg font-semibold text-foreground mt-4 mb-2">{line.replace("### ", "")}</h3>;
                  if (line.startsWith("- ")) return <li key={i} className="text-sm text-muted-foreground ml-4 mb-1">{line.replace("- ", "")}</li>;
                  if (line.startsWith("| ")) return null; // skip table markup
                  if (line.startsWith("*") && line.endsWith("*")) return <p key={i} className="text-sm text-accent font-semibold mt-4 italic">{line.replace(/\*/g, "")}</p>;
                  if (line.trim()) return <p key={i} className="text-sm text-muted-foreground mb-3">{line}</p>;
                  return null;
                })}
              </div>
            </motion.article>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              Knowledge Center
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Compliance Insights & Guides
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground max-w-2xl mx-auto">
              Expert articles on GST, taxation, E-Way Bills, and business compliance. Stay informed with the latest rules and best practices.
            </motion.p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full h-11 pl-10 pr-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((article, i) => (
              <motion.button
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveArticle(article.id)}
                className="text-left bg-background border border-border p-8 hover:border-accent/40 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-3 h-3 text-accent" />
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">{article.category}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BlogPage;
