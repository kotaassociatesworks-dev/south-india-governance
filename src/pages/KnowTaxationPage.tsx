import { motion } from "framer-motion";
import {
  Building2, Users, Landmark, Scale, Briefcase, Shield,
  ChevronRight, ArrowDown, Gavel, FileText, BadgeIndianRupee
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";

/* ───────── DIRECT TAX STRUCTURE ───────── */
const directTaxStructure = [
  {
    title: "Central Board of Direct Taxes (CBDT)",
    icon: Landmark,
    level: "Apex Body",
    description:
      "CBDT is the supreme statutory authority for administration of all direct tax laws in India, constituted under the Central Board of Revenue Act, 1963. It functions under the Department of Revenue, Ministry of Finance, Government of India.",
    functions: [
      "Formulates tax policy and issues binding circulars under Section 119 of the IT Act",
      "Issues notifications for rules, exemptions, and rate changes",
      "Supervises all Principal Chief Commissioners and subordinate authorities",
      "Coordinates with the Law Ministry on legislative amendments",
      "Administers the Taxpayer's Charter under Section 119A",
      "Sets revenue targets and monitors collection across India",
    ],
    subUnits: [
      "Member (Legislation & Computerisation)",
      "Member (Revenue)",
      "Member (Investigation)",
      "Member (Personnel & Vigilance)",
      "Member (Audit & Judicial)",
    ],
  },
  {
    title: "Income Tax Department",
    icon: Building2,
    level: "Administrative Body",
    description:
      "The Income Tax Department is the primary administrative arm under CBDT responsible for the levy, collection, and administration of Income Tax, Corporation Tax, Wealth Tax (now abolished), and Gift Tax (now abolished) across India.",
    functions: [
      "Assessment of income and issuance of demand notices",
      "Processing of returns at CPC Bengaluru under Section 143(1)",
      "Scrutiny assessments under Sections 143(3) and 144",
      "Collection and recovery of tax dues",
      "Investigation and anti-evasion operations",
      "International taxation and transfer pricing administration",
    ],
    subUnits: [
      "Centralised Processing Centre (CPC), Bengaluru",
      "TDS-CPC, Vaishali (Ghaziabad)",
      "Investigation Wings (regional)",
      "International Taxation Division",
      "Faceless Assessment Centres",
    ],
  },
  {
    title: "Assessing Officers (AO)",
    icon: FileText,
    level: "Assessment Authority",
    description:
      "Assessing Officers are the backbone of the Income Tax Department. They include Deputy/Assistant Commissioners of Income Tax (DCIT/ACIT) and Income Tax Officers (ITO). They are designated as 'Assessing Officers' under Section 2(7A) and are responsible for direct interaction with taxpayers.",
    functions: [
      "Issue notices under Sections 142(1), 143(2), and 148",
      "Conduct scrutiny assessments and pass assessment orders",
      "Grant or deny deductions, exemptions, and set-off claims",
      "Initiate penalty proceedings under Sections 270A and 271",
      "Conduct surveys under Section 133A",
      "Process rectification applications under Section 154",
    ],
    subUnits: [
      "DCIT/ACIT — Handle corporate and high-value cases",
      "ITO — Handle individual, HUF, and smaller entity cases",
      "Tax Recovery Officer (TRO) — Recovery proceedings",
      "Inspector of Income Tax — Field operations",
    ],
  },
  {
    title: "Appellate Authorities — First Appeal",
    icon: Scale,
    level: "Appellate",
    description:
      "The first appellate authority is the Commissioner of Income Tax (Appeals) — CIT(A), now operating under the Faceless Appeal Scheme. Every assessee aggrieved by an order of the Assessing Officer has the right to file an appeal under Section 246A.",
    functions: [
      "Hear appeals against assessment orders, penalty orders, and TDS orders",
      "Power to confirm, reduce, enhance, or annul the assessment",
      "Admit additional evidence under Rule 46A in exceptional cases",
      "Pass speaking orders with detailed reasoning",
      "Now operates through the Joint Commissioner (Appeals) — JC(A) for certain cases",
    ],
    subUnits: [
      "CIT(A) — First appellate authority under Section 246A",
      "Joint Commissioner (Appeals) — For specified smaller cases",
      "Faceless Appeal Centre — Digital hearing mechanism",
    ],
  },
  {
    title: "Income Tax Appellate Tribunal (ITAT)",
    icon: Gavel,
    level: "Tribunal",
    description:
      "ITAT is the second appellate authority and the final fact-finding authority in income tax matters. Established under Section 252 of the IT Act, it functions as a quasi-judicial body independent of the Income Tax Department. ITAT orders are binding and can only be challenged before the High Court on substantial questions of law.",
    functions: [
      "Hear appeals under Section 253 against CIT(A) orders",
      "Power to stay demand pending appeal",
      "Final authority on factual disputes — no further fact-finding by courts",
      "Rectification of mistakes under Section 254(2)",
      "Cross-appeals and cross-objections",
      "Benches across India with jurisdictional SMPs and Divisions",
    ],
    subUnits: [
      "President — Administrative head",
      "Vice Presidents — Zonal heads",
      "Judicial Members — Retired judges",
      "Accountant Members — Senior tax professionals",
      "Single Member Bench (SMP) — For cases below specified limits",
    ],
  },
  {
    title: "High Court",
    icon: Scale,
    level: "Constitutional Court",
    description:
      "Under Section 260A of the Income Tax Act, an appeal lies to the High Court against any order of ITAT if it involves a substantial question of law. The High Court exercises writ jurisdiction under Article 226 of the Constitution and can also entertain tax matters under its original jurisdiction.",
    functions: [
      "Hear appeals on substantial questions of law under Section 260A",
      "Writ jurisdiction under Article 226 against arbitrary tax actions",
      "Power to stay recovery during pendency of appeal",
      "Reference jurisdiction (historical) under Section 256",
    ],
    subUnits: [],
  },
  {
    title: "Supreme Court of India",
    icon: Landmark,
    level: "Apex Court",
    description:
      "The Supreme Court is the final appellate authority in all tax matters. Appeals lie under Section 261 of the IT Act or through Special Leave Petition under Article 136 of the Constitution. Supreme Court decisions constitute the law of the land under Article 141.",
    functions: [
      "Final appeal under Section 261 against High Court orders",
      "Special Leave Petition under Article 136 of the Constitution",
      "Decisions binding on all courts and authorities under Article 141",
      "Power to settle conflicting High Court decisions",
      "Advisory jurisdiction on presidential reference under Article 143",
    ],
    subUnits: [],
  },
];

/* ───────── INDIRECT TAX STRUCTURE ───────── */
const indirectTaxStructure = [
  {
    title: "GST Council",
    icon: Landmark,
    level: "Constitutional Body",
    description:
      "The GST Council is a constitutional body established under Article 279A of the Constitution (101st Amendment Act, 2016). It is chaired by the Union Finance Minister and comprises State Finance Ministers. It is the supreme decision-making body for all GST-related matters.",
    functions: [
      "Recommend GST rates for goods and services",
      "Determine threshold limits for registration",
      "Recommend model GST laws, principles of levy, apportionment of IGST",
      "Grant exemptions and special provisions for specific states",
      "Resolve disputes between Centre and States or between States",
      "Decisions by three-fourths majority (Centre has 1/3 weightage, States 2/3)",
    ],
    subUnits: [
      "Chairperson — Union Finance Minister",
      "Vice Chairperson — Chosen from among State Finance Ministers",
      "Members — Finance Ministers of all States and UTs with legislature",
      "GST Council Secretariat — Administrative support",
      "Fitment Committee — Rate rationalization",
      "Law Committee — Legal and procedural recommendations",
    ],
  },
  {
    title: "Central Board of Indirect Taxes & Customs (CBIC)",
    icon: Landmark,
    level: "Apex Administrative Body",
    description:
      "CBIC is the apex body for administration of CGST, IGST, Customs, and residual Central Excise. It functions under the Department of Revenue, Ministry of Finance. CBIC implements the policy decisions of the GST Council through circulars, notifications, and administrative orders.",
    functions: [
      "Implementation of GST Council recommendations",
      "Issue of circulars, notifications, and trade notices",
      "Administrative control over all CGST and Customs officers",
      "Supervision of DGGI, DRI, DGARM, and other directorates",
      "Revenue monitoring and anti-evasion coordination",
      "International customs cooperation and trade facilitation",
    ],
    subUnits: [
      "Chairman CBIC",
      "Member (GST)",
      "Member (Customs)",
      "Member (Budget & Legislation)",
      "Member (Investigation & IT)",
      "Member (Administration)",
    ],
  },
  {
    title: "GST Commissionerates",
    icon: Building2,
    level: "Field Formation",
    description:
      "GST Commissionerates are the primary field formations of CBIC responsible for administration and collection of CGST and IGST within their territorial jurisdiction. Each Commissionerate is headed by a Commissioner and comprises multiple divisions and ranges.",
    functions: [
      "Registration, assessment, and compliance monitoring",
      "Adjudication of demands under Sections 73 and 74",
      "Audit of taxpayers under Section 65 and 66",
      "Anti-evasion and investigation activities",
      "Refund processing under Section 54",
      "Enforcement operations including search and seizure under Section 67",
    ],
    subUnits: [
      "Principal Commissioner / Commissioner — Head of Commissionerate",
      "Additional / Joint Commissioner — Divisional heads",
      "Deputy / Assistant Commissioner — Range officers",
      "Superintendent — Compliance and audit",
      "Inspector — Field operations and verification",
      "GST Audit Commissionerates — Dedicated audit formations",
    ],
  },
  {
    title: "GST Officers & Proper Officers",
    icon: Users,
    level: "Operational Level",
    description:
      "Under Section 3 and 4 of the CGST Act, 2017, the Government appoints officers of Central Tax. Each officer is designated as a 'proper officer' for specific functions such as registration, assessment, refund, and recovery. State GST officers are similarly appointed under respective SGST Acts.",
    functions: [
      "Registration under Section 25 — Assistant Commissioner as proper officer",
      "Assessment and scrutiny of returns under Section 61",
      "Demand and recovery under Sections 73, 74, and 79",
      "Refund processing under Section 54",
      "Inspection, search, and seizure under Section 67",
      "Provisional attachment of property under Section 83",
      "Arrest and prosecution under Section 69 and 132",
    ],
    subUnits: [
      "Central Tax Officers (CGST) — Appointed by Central Government",
      "State Tax Officers (SGST) — Appointed by respective State Governments",
      "UT Tax Officers — For Union Territories without legislature",
    ],
  },
  {
    title: "Adjudicating Authorities",
    icon: Gavel,
    level: "Quasi-Judicial",
    description:
      "Adjudicating authorities under GST law are the officers empowered to pass orders on demands, penalties, confiscation, and other proceedings. The jurisdiction of each adjudicating authority is determined by the monetary threshold of the case as prescribed by CBIC.",
    functions: [
      "Commissioner — Adjudicates cases involving duty > ₹2 crores (cases of fraud/suppression)",
      "Additional / Joint Commissioner — Cases involving duty between ₹50 lakhs and ₹2 crores",
      "Deputy / Assistant Commissioner — Cases involving duty up to ₹50 lakhs",
      "Pass speaking orders with detailed reasoning",
      "Impose penalties under Sections 122 to 138",
      "Order confiscation of goods under Section 130",
    ],
    subUnits: [],
  },
  {
    title: "Appellate Authorities",
    icon: Scale,
    level: "Appellate Hierarchy",
    description:
      "The GST appellate framework provides multi-tier remedies to aggrieved taxpayers. The hierarchy ensures that every order can be challenged through a structured mechanism from the first appellate authority to the Supreme Court.",
    functions: [
      "Appellate Authority (Commissioner Appeals) — First appeal under Section 107 within 3 months",
      "GST Appellate Tribunal (GSTAT) — Second appeal under Section 112",
      "High Court — Appeal on substantial questions of law under Section 117",
      "Supreme Court — Final appeal under Section 118",
      "Pre-deposit requirements: 10% for first appeal, 20% for GSTAT (capped at ₹25 crore each)",
      "Power of stay, remand, and modification at each level",
    ],
    subUnits: [
      "Appellate Authority — Commissioner (Appeals) at each Commissionerate",
      "GSTAT National Bench — New Delhi (for IGST/place of supply disputes)",
      "GSTAT State Benches — In each state for CGST/SGST disputes",
      "GSTAT Area Benches — In states with high litigation volume",
    ],
  },
  {
    title: "Specialized Directorates",
    icon: Shield,
    level: "Investigation & Intelligence",
    description:
      "CBIC operates several specialized directorates for intelligence gathering, investigation, data analytics, and audit across the indirect tax spectrum. These directorates work independently of commissionerates and report directly to CBIC.",
    functions: [
      "DGGI — Directorate General of GST Intelligence: anti-evasion, fake invoice detection, ITC fraud investigation",
      "DRI — Directorate of Revenue Intelligence: anti-smuggling, commercial fraud, undervaluation",
      "DGARM — Directorate General of Analytics & Risk Management: data analytics and risk profiling",
      "DG Audit — Directorate General of Audit: taxpayer and customs audits",
      "DG Systems — IT infrastructure, GSTN coordination, and e-governance",
      "NACIN — National Academy of Customs, Indirect Taxes & Narcotics: training and capacity building",
    ],
    subUnits: [],
  },
];

/* ───────── SHARED COMPONENTS ───────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const HierarchyCard = ({
  item,
  index,
  total,
}: {
  item: (typeof directTaxStructure)[0];
  index: number;
  total: number;
}) => {
  const Icon = item.icon;
  return (
    <div className="relative">
      {/* Connector line */}
      {index < total - 1 && (
        <div className="absolute left-[29px] top-full w-[2px] h-6 bg-accent/30 z-0 hidden lg:block" />
      )}
      <motion.div {...fadeUp} transition={{ delay: index * 0.05, duration: 0.45 }}>
        <AccordionItem
          value={`hier-${index}`}
          className="border border-border bg-background overflow-hidden"
        >
          <AccordionTrigger className="hover:no-underline px-6 py-5">
            <div className="flex items-center gap-4 text-left w-full">
              <div className="w-11 h-11 bg-accent/10 flex items-center justify-center flex-shrink-0 z-10 relative">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-heading font-bold text-foreground block text-sm lg:text-base">
                  {item.title}
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-accent">
                  {item.level}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pl-[60px] space-y-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

              {/* Functions */}
              <div className="border-l-2 border-accent/40 pl-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                  Functions & Powers
                </p>
                {item.functions.map((fn) => (
                  <div key={fn} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{fn}</span>
                  </div>
                ))}
              </div>

              {/* Sub-units */}
              {item.subUnits.length > 0 && (
                <div className="bg-secondary/50 border border-border p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                    Key Constituents / Sub-Units
                  </p>
                  <div className="grid gap-2">
                    {item.subUnits.map((su) => (
                      <div key={su} className="flex items-start gap-2">
                        <ArrowDown className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{su}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </motion.div>
      {index < total - 1 && (
        <div className="flex justify-center py-2 lg:hidden">
          <ArrowDown className="w-4 h-4 text-accent/50" />
        </div>
      )}
    </div>
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
const KnowTaxationPage = () => {
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
              Taxation Knowledge Base
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Know Your Taxation System
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Complete structural overview of India's Direct and Indirect Tax administration —
              from apex bodies to field formations, appellate authorities, and specialized
              directorates.
            </motion.p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="direct" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-10 h-12">
              <TabsTrigger
                value="direct"
                className="text-sm font-semibold tracking-wide uppercase"
              >
                Direct Tax Structure
              </TabsTrigger>
              <TabsTrigger
                value="indirect"
                className="text-sm font-semibold tracking-wide uppercase"
              >
                Indirect Tax Structure
              </TabsTrigger>
            </TabsList>

            {/* ─── DIRECT TAX ─── */}
            <TabsContent value="direct">
              <SectionBanner
                tag="Administrative Hierarchy"
                title="Direct Tax Department Structure"
                subtitle="Complete hierarchy from CBDT to Assessing Officers, and the appellate chain from CIT(A) to the Supreme Court of India."
              />
              <Accordion type="single" collapsible className="space-y-2">
                {directTaxStructure.map((item, i) => (
                  <HierarchyCard
                    key={item.title}
                    item={item}
                    index={i}
                    total={directTaxStructure.length}
                  />
                ))}
              </Accordion>
            </TabsContent>

            {/* ─── INDIRECT TAX ─── */}
            <TabsContent value="indirect">
              <SectionBanner
                tag="Administrative Hierarchy"
                title="Indirect Tax Department Structure"
                subtitle="Complete hierarchy from GST Council and CBIC to Commissionerates, adjudicating authorities, appellate bodies, and specialized directorates."
              />
              <Accordion type="single" collapsible className="space-y-2">
                {indirectTaxStructure.map((item, i) => (
                  <HierarchyCard
                    key={item.title}
                    item={item}
                    index={i}
                    total={indirectTaxStructure.length}
                  />
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

export default KnowTaxationPage;
