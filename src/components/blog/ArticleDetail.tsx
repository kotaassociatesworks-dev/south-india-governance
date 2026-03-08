import { motion } from "framer-motion";
import { Clock, ArrowRight, ChevronRight, Tag, BookOpen } from "lucide-react";
import { BlogArticle, blogArticles } from "@/data/blogData";
import ConsultationBanner from "@/components/blog/ConsultationBanner";
import AskExpertForm from "@/components/blog/AskExpertForm";
import DownloadChecklist from "@/components/blog/DownloadChecklist";

interface ArticleDetailProps {
  article: BlogArticle;
  onBack: () => void;
  onNavigate: (id: string) => void;
}

const ArticleDetail = ({ article, onBack, onNavigate }: ArticleDetailProps) => {
  const relatedArticles = blogArticles.filter((a) => article.relatedIds.includes(a.id));

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        ← Back to Articles
      </button>

      <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* 1. Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-accent/10 text-accent">
              {article.category}
            </span>
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} read
            </span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* 2. Introduction */}
        <div className="bg-background border border-border p-6 lg:p-8 mb-8">
          <p className="text-sm text-muted-foreground leading-relaxed">{article.introduction}</p>
        </div>

        {/* 3. Key Rule Highlights */}
        {article.highlights.map((hl, i) => (
          <motion.div
            key={hl.heading}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-background border border-border p-6 lg:p-8 mb-4"
          >
            <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-accent" />
              </div>
              {hl.heading}
            </h2>
            <div className="pl-10 space-y-2">
              {hl.points.map((pt) => (
                <div key={pt} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* 4. Important Notes */}
        {article.importantNotes.map((note) => (
          <div
            key={note.title}
            className="border-l-4 border-accent/50 bg-accent/5 p-6 mb-4"
          >
            <h3 className="font-heading text-base font-bold text-foreground mb-2">
              ⚠️ {note.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
          </div>
        ))}

        {/* 5. Practical Tips */}
        <div className="bg-background border border-border p-6 lg:p-8 mb-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">
            💡 {article.tips.heading}
          </h2>
          <div className="space-y-3">
            {article.tips.points.map((tip, i) => (
              <div key={tip} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-accent">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Professional Help CTA */}
        <ConsultationBanner />

        {/* Ask Expert + Download in sidebar layout */}
        <div className="grid lg:grid-cols-2 gap-6 my-10">
          <AskExpertForm />
          <DownloadChecklist />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-accent" />
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((ra) => (
                <motion.button
                  key={ra.id}
                  whileHover={{ y: -3 }}
                  onClick={() => onNavigate(ra.id)}
                  className="text-left bg-background border border-border p-5 hover:border-accent/40 transition-all group"
                >
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent block mb-2">
                    {ra.category}
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                    {ra.title}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {ra.readTime}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default ArticleDetail;
