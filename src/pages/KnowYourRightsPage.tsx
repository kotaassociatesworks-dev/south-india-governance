import { motion } from "framer-motion";
import { Shield, Scale, FileText, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const directTaxRights = [
  {
    title: "Right to be Informed",
    description: "Every taxpayer has the right to be informed about the provisions of the Income Tax Act, rules, and regulations. The tax department must provide clear information about obligations and entitlements.",
    icon: BookOpen,
  },
  {
    title: "Right to a Fair and Just Tax System",
    description: "Under Article 265 of the Constitution of India, no tax shall be levied or collected except by authority of law. Every assessee is entitled to a fair, transparent, and non-discriminatory tax assessment.",
    icon: Scale,
  },
  {
    title: "Right to Privacy and Confidentiality",
    description: "Under Section 138 of the Income Tax Act, 1961, information furnished by the taxpayer is confidential. No officer shall disclose details except as required under law.",
    icon: Shield,
  },
  {
    title: "Right to Appeal",
    description: "Every assessee has the right to appeal against any order of the Assessing Officer. Appeals can be filed before CIT(A), ITAT, High Court, and the Supreme Court under Sections 246A, 253, 260A, and 261.",
    icon: FileText,
  },
  {
    title: "Right to Representation",
    description: "Under Section 288, an assessee may appear before any income tax authority through an authorised representative including a Chartered Accountant, Advocate, or any other qualified person.",
    icon: CheckCircle,
  },
  {
    title: "Right to Timely Refunds",
    description: "Under Section 244A, the taxpayer has the right to receive refunds with interest. The department must process refunds within the prescribed time limit.",
    icon: AlertTriangle,
  },
  {
    title: "Right Against Retrospective Taxation",
    description: "The Taxation Laws (Amendment) Act, 2021 ensures that retrospective tax demands for indirect transfers are nullified, protecting taxpayer certainty.",
    icon: Shield,
  },
  {
    title: "Right to Rectification",
    description: "Under Section 154, any mistake apparent from the record in any order passed by the income tax authority can be rectified within 4 years from the date of the order.",
    icon: FileText,
  },
  {
    title: "Right to Fair Assessment",
    description: "Under Sections 143 and 144, assessments must follow principles of natural justice. The assessee must be given reasonable opportunity of being heard before any adverse order is passed.",
    icon: Scale,
  },
  {
    title: "Right to Advance Ruling",
    description: "Under Section 245Q, non-residents and certain residents can seek advance rulings on tax liability to avoid future disputes and ensure compliance certainty.",
    icon: BookOpen,
  },
];

const indirectTaxRights = [
  {
    title: "Right to Information under GST",
    description: "Every registered person has the right to be informed of the reasons behind any proceedings, demand, or investigation initiated by the GST authorities under CGST Act, 2017.",
    icon: BookOpen,
  },
  {
    title: "Right to Fair Assessment & Adjudication",
    description: "Under Sections 73 and 74 of CGST Act, proper notices must be served before raising demands. The taxpayer has the right to respond and be heard before any order is passed.",
    icon: Scale,
  },
  {
    title: "Right to Claim Input Tax Credit",
    description: "Under Section 16 of the CGST Act, every registered person is entitled to claim ITC on goods and services used in the course or furtherance of business, subject to conditions.",
    icon: CheckCircle,
  },
  {
    title: "Right to Appeal under GST",
    description: "Under Section 107, any person aggrieved by an order may appeal to the Appellate Authority within 3 months. Further appeals lie to the Appellate Tribunal (Section 112), High Court, and Supreme Court.",
    icon: FileText,
  },
  {
    title: "Right to Refund",
    description: "Under Section 54 of CGST Act, any person claiming refund of tax, interest, penalty, or any other amount paid may file a refund application within 2 years from the relevant date.",
    icon: AlertTriangle,
  },
  {
    title: "Right Against Arrest & Coercion",
    description: "Under Section 69 of CGST Act, arrest can only be made for offences where tax evasion exceeds specified limits. The arrested person must be produced before a Magistrate within 24 hours.",
    icon: Shield,
  },
  {
    title: "Right to Provisional Release of Goods",
    description: "Under Section 67(6) of CGST Act, goods seized during search can be released on execution of a bond and furnishing of security as prescribed.",
    icon: FileText,
  },
  {
    title: "Right to Cross-Examination",
    description: "In any proceedings where statements of third parties are relied upon, the taxpayer has the right to cross-examine such witnesses as per principles of natural justice.",
    icon: Scale,
  },
  {
    title: "Right under Customs Act",
    description: "Under the Customs Act, 1962, importers and exporters have the right to fair valuation (Section 14), right to appeal (Section 128), and right to claim drawback (Section 74 & 75).",
    icon: BookOpen,
  },
  {
    title: "Right to Anti-Profiteering",
    description: "Under Section 171 of CGST Act, any reduction in tax rate or benefit of ITC must be passed on to the consumer by commensurate reduction in prices.",
    icon: Shield,
  },
];

const RightsCard = ({ right, index }: { right: typeof directTaxRights[0]; index: number }) => {
  const Icon = right.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <AccordionItem value={`item-${index}`} className="border border-border bg-background px-6 mb-3">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-semibold text-foreground">{right.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground pl-14">
          {right.description}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

const KnowYourRightsPage = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            >
              Taxpayer Awareness
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Know Your Rights as a Taxpayer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-3xl mx-auto"
            >
              As an assessee under the Indian taxation framework, you are entitled to fundamental rights that protect your interests. 
              Understand your rights under both Direct and Indirect Tax laws.
            </motion.p>
          </div>

          <Tabs defaultValue="direct" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="direct" className="text-sm font-semibold tracking-wide uppercase">
                Direct Taxes
              </TabsTrigger>
              <TabsTrigger value="indirect" className="text-sm font-semibold tracking-wide uppercase">
                Indirect Taxes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="direct">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 p-6 border border-accent/30 bg-accent/5"
              >
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  Direct Tax — Assessee Rights
                </h3>
                <p className="text-sm text-muted-foreground">
                  Rights under the Income Tax Act, 1961, Constitution of India, and allied direct tax legislations. 
                  These rights protect assessees during assessment, appeal, and refund proceedings.
                </p>
              </motion.div>
              <Accordion type="single" collapsible className="space-y-0">
                {directTaxRights.map((right, i) => (
                  <RightsCard key={right.title} right={right} index={i} />
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="indirect">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 p-6 border border-accent/30 bg-accent/5"
              >
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  Indirect Tax — Taxpayer Rights
                </h3>
                <p className="text-sm text-muted-foreground">
                  Rights under the CGST Act, 2017, Customs Act, 1962, and allied indirect tax legislations. 
                  These rights ensure fair treatment in GST compliance, customs, and excise matters.
                </p>
              </motion.div>
              <Accordion type="single" collapsible className="space-y-0">
                {indirectTaxRights.map((right, i) => (
                  <RightsCard key={right.title} right={right} index={i} />
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default KnowYourRightsPage;
