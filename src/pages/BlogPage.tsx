import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Clock, ArrowRight, Search, Tag, TrendingUp, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles, blogCategories } from "@/data/blogData";
import ArticleDetail from "@/components/blog/ArticleDetail";
import AskExpertForm from "@/components/blog/AskExpertForm";
import DownloadChecklist from "@/components/blog/DownloadChecklist";
import StickyHelpButton from "@/components/blog/StickyHelpButton";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogArticles.filter((a) => {
    const matchCategory = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const popularArticles = blogArticles.filter((a) => a.popular);
  const latestArticles = [...blogArticles].slice(0, 3);

  // Article detail view
  if (activeArticle) {
    const article = blogArticles.find((a) => a.id === activeArticle);
    if (!article) return null;
    return (
      <main>
        <Navbar />
        <StickyHelpButton />
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
          <div className="container mx-auto px-4 lg:px-8">
            <ArticleDetail
              article={article}
              onBack={() => setActiveArticle(null)}
              onNavigate={(id) => {
                setActiveArticle(id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  // Listing view
  return (
    <main>
      <Navbar />
      <StickyHelpButton />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            >
              Knowledge Center
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Compliance Insights & Guides
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Expert articles on GST, taxation, E-Way Bills, and business compliance. Stay
              informed with the latest rules and best practices.
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
                  maxLength={200}
                  className="w-full h-11 pl-10 pr-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
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

          {/* Main content with sidebar */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Articles Grid */}
            <div>
              {/* Popular Articles */}
              {activeCategory === "All" && !searchQuery && (
                <div className="mb-10">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Popular Articles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {popularArticles.slice(0, 2).map((article, i) => (
                      <motion.button
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveArticle(article.id)}
                        className="text-left bg-background border-2 border-accent/20 p-6 hover:border-accent/50 hover:shadow-lg transition-all group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 px-2 py-1 bg-accent text-accent-foreground text-[9px] font-bold tracking-wider uppercase">
                          Popular
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-3 h-3 text-accent" />
                          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                            <span>{article.date}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest / All Articles */}
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : activeCategory !== "All"
                    ? activeCategory
                    : "Latest Articles"}
                </h2>
                {filtered.length === 0 ? (
                  <div className="bg-background border border-border p-10 text-center">
                    <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      No articles found. Try a different search or category.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filtered.map((article, i) => (
                      <motion.button
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ x: 4 }}
                        onClick={() => setActiveArticle(article.id)}
                        className="w-full text-left bg-background border border-border p-6 hover:border-accent/40 hover:shadow-md transition-all group flex gap-5"
                      >
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                          <BookOpen className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent">
                              {article.category}
                            </span>
                            {article.popular && (
                              <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 bg-accent/10 text-accent">
                                Popular
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading text-base font-semibold text-foreground mb-1 group-hover:text-accent transition-colors truncate">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{article.excerpt}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 self-center" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AskExpertForm />
              <DownloadChecklist />

              {/* Latest Updates Sidebar */}
              <div className="bg-background border border-border p-6">
                <h3 className="font-heading text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Latest Updates
                </h3>
                <div className="space-y-3">
                  {latestArticles.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setActiveArticle(a.id)}
                      className="w-full text-left group"
                    >
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {a.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BlogPage;
