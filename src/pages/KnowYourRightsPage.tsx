import { motion } from "framer-motion";
import {
  Shield, Scale, FileText, AlertTriangle, CheckCircle, BookOpen,
  Users, ChevronRight, Landmark, BadgeIndianRupee, Eye, Lock,
  UserCheck, Gavel, MessageSquare, ArrowRight, Building2, Briefcase
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";

/* ───────── DIRECT TAX RIGHTS ───────── */
const directTaxRights = [
  {
    title: "Right to be Informed",
    icon: Eye,
    description:
      "Every assessee has the fundamental right to be informed about the provisions of the Income Tax Act, 1961, applicable rules, circulars, and notifications issued by CBDT. The tax authorities are duty-bound to communicate the reasons for any proceedings, enquiry, or demand raised against the taxpayer. This includes the right to receive proper notice before any assessment or reassessment under Sections 143(2), 148, and 148A.",
    keyPoints: [
      "Right to receive show-cause notices with specific grounds",
      "Access to Taxpayer's Charter under Section 119A introduced by Finance Act, 2020",
      "Right to information about time limits for proceedings",
      "Entitlement to receive copies of all orders passed",
    ],
  },
  {
    title: "Right to Appeal",
    icon: Scale,
    description:
      "The Income Tax Act provides a comprehensive appellate mechanism ensuring every assessee has multi-tier remedies against adverse orders. The right to appeal is a substantive right and cannot be denied on procedural technicalities alone.",
    keyPoints: [
      "First Appeal to CIT(A) under Section 246A within 30 days",
      "Second Appeal to ITAT under Section 253 within 60 days",
      "Reference to High Court under Section 260A on substantial questions of law",
      "Special Leave Petition to Supreme Court under Article 136 of the Constitution",
      "Right to stay of demand pending appeal under Section 220(6)",
      "Condonation of delay provisions under Section 253(5)",
    ],
  },
  {
    title: "Right to Confidentiality",
    icon: Lock,
    description:
      "Under Section 138 of the Income Tax Act, all information furnished by a taxpayer is treated as confidential. No income tax authority shall disclose any particulars contained in any statement, return, accounts, or documents except in specified circumstances authorized by law. Breach of confidentiality is a punishable offence.",
    keyPoints: [
      "Section 138 restricts unauthorized disclosure",
      "Information sharing only with specified authorities under Section 138(1)",
      "Penalty for breach of confidentiality under Section 280",
      "Protection extends to personal and financial details",
    ],
  },
  {
    title: "Right to Representation",
    icon: UserCheck,
    description:
      "Under Section 288 of the Income Tax Act, every assessee is entitled to appear before any income tax authority through an authorised representative. This right ensures that taxpayers can avail professional assistance during complex assessment and appellate proceedings.",
    keyPoints: [
      "Representation through Chartered Accountant, Advocate, or Tax Practitioner",
      "Authorised representative can sign returns, attend hearings, and make submissions",
      "Right available before all income tax authorities including ITAT",
      "Power of Attorney or Vakalatnama sufficient for authorization",
    ],
  },
  {
    title: "Right Against Harassment",
    icon: Shield,
    description:
      "The Taxpayer's Charter introduced under Section 119A mandates that the Income Tax Department treat every taxpayer with courtesy and consideration. Officers are prohibited from conducting oppressive or unwarranted proceedings. The taxpayer has recourse to the Grievance Redressal Mechanism and the Income Tax Ombudsman.",
    keyPoints: [
      "Protection under the Taxpayer's Charter (Section 119A)",
      "Right to file complaints with the Grievance Cell",
      "Provisions against unnecessary surveys under Section 133A",
      "Safeguards during search and seizure under Section 132",
      "Restrictions on repeated assessments without valid reasons",
    ],
  },
  {
    title: "Right to Fair Assessment",
    icon: Gavel,
    description:
      "Under Sections 143 and 144 of the Income Tax Act, assessments must conform to principles of natural justice. The assessee must be given a reasonable opportunity of being heard before any adverse order is passed. Faceless Assessment under Section 144B further ensures transparency and eliminates human interface.",
    keyPoints: [
      "Mandatory notice before assessment under Section 143(2)",
      "Right to be heard — Audi Alteram Partem",
      "Speaking orders with reasons under Section 144",
      "Faceless Assessment Scheme under Section 144B for objectivity",
      "Right to cross-examine witnesses whose statements are relied upon",
      "Time limits for completion of assessments under Section 153",
    ],
  },
];

/* ───────── INCOME TAX AUTHORITIES ───────── */
const incomeTaxAuthorities = [
  {
    designation: "Central Board of Direct Taxes (CBDT)",
    role: "Apex statutory authority constituted under the Central Board of Revenue Act, 1963. CBDT formulates policy, issues circulars, notifications, and directions binding on all subordinate authorities. It supervises the entire direct tax administration across India.",
    powers: "Policy formulation, issuing binding circulars (Section 119), relaxation of provisions, supervision of all direct tax authorities.",
    level: "Apex Body",
    icon: Landmark,
  },
  {
    designation: "Principal Chief Commissioner of Income Tax (Pr. CCIT)",
    role: "Heads the largest administrative region. Exercises supervisory control over all Chief Commissioners and subordinate officers within the region. Responsible for revenue targets and administrative efficiency.",
    powers: "Administrative supervision, transfer of cases (Section 127), coordination between zones.",
    level: "Level 1",
    icon: Users,
  },
  {
    designation: "Chief Commissioner of Income Tax (CCIT)",
    role: "Supervises Principal Commissioners and Commissioners within the zone. Exercises powers of revision and oversight on administrative matters. Handles inter-commissionerate coordination.",
    powers: "Revisionary powers, administrative transfers, monitoring revenue collection.",
    level: "Level 2",
    icon: Users,
  },
  {
    designation: "Principal Commissioner / Commissioner of Income Tax (Pr. CIT / CIT)",
    role: "Heads a commissionerate. Exercises quasi-judicial powers including revision of orders under Section 263 (prejudicial to revenue) and Section 264 (in favour of assessee). Supervises Assessing Officers.",
    powers: "Revision under Sections 263 & 264, approval for search warrants, transfer of cases, supervision of assessments.",
    level: "Level 3",
    icon: Briefcase,
  },
  {
    designation: "Commissioner of Income Tax (Appeals) — CIT(A)",
    role: "First Appellate Authority under the Income Tax Act. Hears appeals against orders of the Assessing Officer under Section 246A. Has the power to confirm, reduce, enhance, or annul the assessment. Now operates under Faceless Appeal Scheme.",
    powers: "Appellate jurisdiction under Section 250, power to admit additional evidence under Rule 46A, power of enhancement.",
    level: "Appellate",
    icon: Scale,
  },
  {
    designation: "Additional / Joint Commissioner of Income Tax",
    role: "Exercises concurrent jurisdiction with the Commissioner. Handles high-value assessments, transfer pricing cases, and approval for assessments/reassessments in specific cases.",
    powers: "Approval for reopening assessments (Section 151), jurisdiction over transfer pricing matters, adjudication of high-value cases.",
    level: "Level 4",
    icon: Users,
  },
  {
    designation: "Assessing Officer (DCIT / ACIT / ITO)",
    role: "The primary officer responsible for assessment of income, issuance of notices, scrutiny of returns, and passing of assessment orders. Deputy Commissioner (DCIT), Assistant Commissioner (ACIT), and Income Tax Officer (ITO) all function as Assessing Officers for different categories of cases.",
    powers: "Assessment under Sections 143, 144, 147; issuance of demands; penalty proceedings; survey powers under Section 133A.",
    level: "Level 5-6",
    icon: FileText,
  },
  {
    designation: "Tax Recovery Officer (TRO)",
    role: "Specifically designated for recovery of tax arrears under the Second Schedule of the Income Tax Act. Authorized to attach and sell movable/immovable property, garnishee bank accounts, and arrest defaulting taxpayers in extreme cases.",
    powers: "Attachment of property, garnishee orders, arrest of defaulters under the Second Schedule.",
    level: "Recovery",
    icon: BadgeIndianRupee,
  },
  {
    designation: "Inspector of Income Tax",
    role: "Assists the Assessing Officer in field operations including surveys under Section 133A, search and seizure operations under Section 132, and gathering of information from third parties.",
    powers: "Execution of survey/search warrants, information collection, field verification.",
    level: "Level 7",
    icon: Users,
  },
];

/* ───────── INDIRECT TAX RIGHTS ───────── */
const indirectTaxRights = [
  {
    title: "Right to Natural Justice",
    icon: Scale,
    description:
      "Under the CGST Act, 2017, every taxpayer is entitled to the principles of natural justice — Audi Alteram Partem (right to be heard) and Nemo Judex in Causa Sua (no one shall be a judge in their own cause). No order adverse to the taxpayer shall be passed without giving a reasonable opportunity of being heard under Section 75(4).",
    keyPoints: [
      "Mandatory personal hearing before adverse orders under Section 75(4)",
      "Right to receive show-cause notice under Sections 73 and 74",
      "Principles enshrined in Article 14 and 21 of the Constitution",
      "Right to adequate time to prepare and respond to allegations",
    ],
  },
  {
    title: "Right to Appeal",
    icon: Gavel,
    description:
      "The GST law provides a robust appellate framework. Section 107 provides for first appeal to the Appellate Authority. Section 112 provides for appeal to the GST Appellate Tribunal (GSTAT). Further appeals lie to the High Court and Supreme Court on questions of law.",
    keyPoints: [
      "First Appeal to Appellate Authority under Section 107 within 3 months",
      "Second Appeal to GSTAT under Section 112 within 3 months",
      "Appeal to High Court under Section 117 on substantial questions of law",
      "Appeal to Supreme Court under Section 118",
      "Pre-deposit requirements: 10% for first appeal, 20% for tribunal",
      "Provision for condonation of delay",
    ],
  },
  {
    title: "Right to Fair Hearing",
    icon: MessageSquare,
    description:
      "Every registered person has the right to present their case before the adjudicating authority. Under Section 75(4), an opportunity of personal hearing shall be granted where a request is received in writing, or any adverse decision is contemplated against the taxpayer.",
    keyPoints: [
      "Written request for personal hearing must be honoured",
      "Right to submit written representations and documentary evidence",
      "Right to be represented by an authorized representative",
      "Adjudicating authority must pass a speaking order with reasons",
    ],
  },
  {
    title: "Right to Refund",
    icon: BadgeIndianRupee,
    description:
      "Under Section 54 of the CGST Act, any person claiming refund of tax, interest, penalty, fees, or any other amount paid, may file an application within two years from the relevant date. The department must process refunds within 60 days. Interest is payable on delayed refunds under Section 56.",
    keyPoints: [
      "Application within 2 years under Section 54",
      "Refund processing within 60 days of application",
      "Interest @ 6% on delayed refunds under Section 56",
      "Provisional refund of 90% within 7 days for zero-rated supplies under Section 54(6)",
      "Refund on account of inverted duty structure",
    ],
  },
  {
    title: "Right to Rectification",
    icon: FileText,
    description:
      "Under Section 161 of the CGST Act, any error apparent on the face of the record in any order passed can be rectified by the authority that passed the order. Rectification must be done within 3 months from the date of the order, provided no rectification adverse to the taxpayer is made without giving an opportunity of being heard.",
    keyPoints: [
      "Rectification of errors apparent on the face of record",
      "Time limit of 3 months from date of order",
      "Opportunity of hearing before adverse rectification",
      "Can be applied for by the taxpayer or suo motu by the officer",
    ],
  },
  {
    title: "Right to Confidentiality of Information",
    icon: Lock,
    description:
      "Section 158 of the CGST Act and Rule 1 of Third Schedule protect taxpayer information. No officer shall disclose information obtained during proceedings except as required by law. Government servants who disclose information without authorization are liable for prosecution.",
    keyPoints: [
      "Protection of business and financial information",
      "Disclosure restricted to specified authorities and courts",
      "Penalty for unauthorized disclosure",
      "Information furnished in returns treated as confidential",
    ],
  },
];

/* ───────── GST AUTHORITIES ───────── */
const gstAuthorities = [
  {
    designation: "GST Council",
    role: "Constitutional body established under Article 279A of the Constitution. Chaired by the Union Finance Minister with State Finance Ministers as members. Recommends GST rates, exemptions, model laws, threshold limits, and dispute resolution mechanisms. All policy decisions flow from the GST Council.",
    powers: "Rate recommendations, model law modifications, exemption decisions, threshold limits, special provisions for NE states.",
    level: "Constitutional",
    icon: Landmark,
  },
  {
    designation: "Central Board of Indirect Taxes & Customs (CBIC)",
    role: "Apex administrative body under the Department of Revenue, Ministry of Finance. Administers CGST, IGST, Customs Act, and residual Central Excise. Issues circulars, notifications, and administrative guidelines for implementation of GST law across India.",
    powers: "Policy implementation, issuance of circulars and notifications, administrative control over all CGST officers.",
    level: "Apex Body",
    icon: Landmark,
  },
  {
    designation: "Principal Commissioner / Commissioner of GST",
    role: "Heads a Commissionerate. Primary adjudicating authority for high-value cases involving tax evasion exceeding ₹2 crores. Exercises supervisory control over all officers within the Commissionerate. Issues show-cause notices under Sections 73 and 74 for demand of tax.",
    powers: "Adjudication of high-value cases, supervisory control, approval for arrest/prosecution under Section 69.",
    level: "Level 1",
    icon: Briefcase,
  },
  {
    designation: "Additional Commissioner of GST",
    role: "Assists the Commissioner and exercises adjudication powers for cases within specified monetary limits. Handles matters related to demand, recovery, and administrative coordination.",
    powers: "Adjudication within monetary limits, administrative support to Commissioner.",
    level: "Level 2",
    icon: Users,
  },
  {
    designation: "Joint Commissioner of GST",
    role: "Exercises concurrent jurisdiction with Additional Commissioner. Handles specialized matters including anti-evasion, audit, and investigation cases. Approves search warrants and inspection proceedings.",
    powers: "Approval for inspections under Section 67, adjudication, supervision of divisional offices.",
    level: "Level 3",
    icon: Users,
  },
  {
    designation: "Deputy Commissioner of GST",
    role: "Handles assessment, audit, and adjudication of cases within prescribed monetary limits. Issues show-cause notices, processes refund applications, and oversees divisional compliance.",
    powers: "Adjudication within limits, refund processing, assessment, issuance of SCNs.",
    level: "Level 4",
    icon: Users,
  },
  {
    designation: "Assistant Commissioner of GST",
    role: "Functions as the proper officer for registration (Section 25), cancellation of registration (Section 29), refund processing (Section 54), and assessment. Primary point of contact for taxpayers at the divisional level.",
    powers: "Registration, cancellation, refund processing, assessment, provisional attachment under Section 83.",
    level: "Level 5",
    icon: Users,
  },
  {
    designation: "Superintendent of GST",
    role: "Handles day-to-day compliance monitoring, scrutiny of returns under Section 61, verification of taxpayer declarations, and anti-evasion field operations. Exercises powers of inspection and audit.",
    powers: "Return scrutiny, compliance monitoring, audit participation, field verification.",
    level: "Level 6",
    icon: Users,
  },
  {
    designation: "GST Officer / Inspector",
    role: "Conducts physical verification of premises for registration, participates in search and seizure operations, inspects goods in transit, and assists senior officers in field operations.",
    powers: "Physical verification, inspection of goods, field operations, execution of search warrants.",
    level: "Level 7",
    icon: Users,
  },
  {
    designation: "GST Appellate Tribunal (GSTAT)",
    role: "Second appellate authority under Section 109 of CGST Act. Comprises a National Bench and State/Area Benches. Hears appeals against orders of the Appellate Authority. Decisions are binding and can only be challenged in the High Court on questions of law.",
    powers: "Appellate jurisdiction, power to remand, confirm, modify or annul orders, interim stay of demand.",
    level: "Tribunal",
    icon: Scale,
  },
];

/* ───────── SHARED COMPONENTS ───────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const RightsSection = ({
  rights,
}: {
  rights: typeof directTaxRights;
}) => (
  <Accordion type="single" collapsible className="space-y-3">
    {rights.map((r, i) => {
      const Icon = r.icon;
      return (
        <motion.div key={r.title} {...fadeUp} transition={{ delay: i * 0.04, duration: 0.4 }}>
          <AccordionItem
            value={`right-${i}`}
            className="border border-border bg-background overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline px-6 py-5">
              <div className="flex items-center gap-4 text-left">
                <div className="w-11 h-11 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-heading font-bold text-foreground block">{r.title}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="pl-[60px] space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                <div className="border-l-2 border-accent/40 pl-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                    Key Points
                  </p>
                  {r.keyPoints.map((kp) => (
                    <div key={kp} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{kp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      );
    })}
  </Accordion>
);

const AuthorityCard = ({
  auth,
  index,
}: {
  auth: (typeof incomeTaxAuthorities)[0];
  index: number;
}) => {
  const Icon = auth.icon;
  return (
    <motion.div {...fadeUp} transition={{ delay: index * 0.04, duration: 0.4 }}>
      <AccordionItem
        value={`auth-${index}`}
        className="border border-border bg-background overflow-hidden"
      >
        <AccordionTrigger className="hover:no-underline px-6 py-5">
          <div className="flex items-center gap-4 text-left w-full">
            <div className="w-11 h-11 bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-heading font-bold text-foreground block text-sm lg:text-base">
                {auth.designation}
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-accent">
                {auth.level}
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="pl-[60px] space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{auth.role}</p>
            <div className="bg-secondary/50 border border-border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                Powers & Functions
              </p>
              <p className="text-sm text-muted-foreground">{auth.powers}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

const SectionBanner = ({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) => (
  <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10">
    <div className="border-l-4 border-accent pl-6 py-2">
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-1">{tag}</p>
      <h2 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </motion.div>
);

/* ───────── MAIN PAGE ───────── */
const KnowYourRightsPage = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
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
              className="text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              As an assessee under the Indian taxation framework, you are entitled to fundamental
              rights that protect your interests during assessment, appeal, and compliance
              proceedings. Understand your rights under both Direct and Indirect Tax laws.
            </motion.p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="direct" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-10 h-12">
              <TabsTrigger
                value="direct"
                className="text-sm font-semibold tracking-wide uppercase"
              >
                Direct Taxes
              </TabsTrigger>
              <TabsTrigger
                value="indirect"
                className="text-sm font-semibold tracking-wide uppercase"
              >
                Indirect Taxes
              </TabsTrigger>
            </TabsList>

            {/* ─── DIRECT TAXES ─── */}
            <TabsContent value="direct" className="space-y-16">
              {/* Rights */}
              <div>
                <SectionBanner
                  tag="Assessee Rights"
                  title="Rights under Income Tax Law"
                  subtitle="Fundamental rights of every assessee under the Income Tax Act, 1961 and the Constitution of India."
                />
                <RightsSection rights={directTaxRights} />
              </div>

              {/* Authorities */}
              <div>
                <SectionBanner
                  tag="Authority Hierarchy"
                  title="Income Tax Authorities"
                  subtitle="Hierarchy of authorities as prescribed under Section 116 of the Income Tax Act, 1961 — from CBDT to Inspector."
                />
                <Accordion type="single" collapsible className="space-y-3">
                  {incomeTaxAuthorities.map((auth, i) => (
                    <AuthorityCard key={auth.designation} auth={auth} index={i} />
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* ─── INDIRECT TAXES ─── */}
            <TabsContent value="indirect" className="space-y-16">
              {/* Rights */}
              <div>
                <SectionBanner
                  tag="Taxpayer Rights"
                  title="Rights under GST Law"
                  subtitle="Rights of every registered person under the CGST Act, 2017, Customs Act, 1962, and allied indirect tax statutes."
                />
                <RightsSection rights={indirectTaxRights} />
              </div>

              {/* Authorities */}
              <div>
                <SectionBanner
                  tag="Authority Hierarchy"
                  title="GST Authorities"
                  subtitle="Hierarchy of authorities under Section 3 & 4 of the CGST Act, 2017 — from GST Council to Inspector."
                />
                <Accordion type="single" collapsible className="space-y-3">
                  {gstAuthorities.map((auth, i) => (
                    <AuthorityCard key={auth.designation} auth={auth} index={i} />
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default KnowYourRightsPage;
