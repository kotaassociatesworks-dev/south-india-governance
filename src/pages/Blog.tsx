import { useState } from "react";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Mail, BookOpen, CheckCircle2 } from "lucide-react";

const Blog = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    // TODO: connect to /api/newsletter
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});
    }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <Layout>
      <PageSEO
        title="Tax & GST Insights — Kota Associates"
        description="GST circulars, budget analysis, compliance checklists and case studies from the chartered accountants at Kota Associates."
        canonical="/blog"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Insights", url: "/blog" }]}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Knowledge</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Insights & Updates</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-narrow max-w-2xl text-center">
          <BookOpen className="w-12 h-12 text-accent mx-auto mb-6" strokeWidth={1.2} />
          <h2 className="font-heading text-3xl text-primary mb-4">Coming Soon</h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Our Insights section will host GST circulars, budget analysis, e-way bill rule updates,
            compliance checklists and case studies — written by our senior advisors.
            Subscribe to receive them by email.
          </p>

          {subscribed ? (
            <div className="flex items-start gap-3 p-4 rounded bg-emerald-500/10 border border-emerald-500/40 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p className="text-sm">Thanks — we'll notify you when our first article is published.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-clean pl-10" />
              </div>
              <button type="submit" className="btn-gold">Subscribe</button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
