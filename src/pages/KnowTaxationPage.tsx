import { motion } from "framer-motion";
import { Building2, User, Landmark, BadgeIndianRupee, Scale, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const directTaxOfficers = [
  { designation: "Central Board of Direct Taxes (CBDT)", role: "Apex body for administration of Direct Tax laws. Formulates policies and supervises all direct tax authorities.", level: "Apex", icon: Landmark },
  { designation: "Principal Chief Commissioner of Income Tax (Pr. CCIT)", role: "Heads the largest administrative unit (region). Supervises all Chief Commissioners within the region.", level: "Level 1", icon: User },
  { designation: "Chief Commissioner of Income Tax (CCIT)", role: "Supervises Principal Commissioners and Commissioners. Exercises revisionary and administrative powers.", level: "Level 2", icon: User },
  { designation: "Principal Commissioner of Income Tax (Pr. CIT)", role: "Supervises Assessing Officers. Has revisionary powers under Section 263 and 264 of the IT Act.", level: "Level 3", icon: User },
  { designation: "Commissioner of Income Tax (CIT)", role: "Exercises administrative and quasi-judicial functions. Handles appeals under CIT(A) and oversees assessment units.", level: "Level 3", icon: User },
  { designation: "Commissioner of Income Tax (Appeals) — CIT(A)", role: "First appellate authority for taxpayers against orders of the Assessing Officer under Section 246A.", level: "Appellate", icon: Scale },
  { designation: "Additional / Joint Commissioner of Income Tax", role: "Assists the Commissioner. Handles cases involving higher assessments and transfer pricing matters.", level: "Level 4", icon: User },
  { designation: "Deputy Commissioner of Income Tax (DCIT)", role: "Handles assessment of companies and cases with higher income thresholds. Also functions as Assessing Officer.", level: "Level 5", icon: User },
  { designation: "Assistant Commissioner of Income Tax (ACIT)", role: "Functions as Assessing Officer for specified categories. Conducts assessments and issues orders.", level: "Level 5", icon: User },
  { designation: "Income Tax Officer (ITO)", role: "Primary Assessing Officer for individual and HUF cases. Conducts scrutiny, assessment, and issues demand notices.", level: "Level 6", icon: User },
  { designation: "Tax Recovery Officer (TRO)", role: "Responsible for recovery of tax dues under the Second Schedule of the Income Tax Act.", level: "Special", icon: BadgeIndianRupee },
  { designation: "Inspector of Income Tax", role: "Assists Assessing Officers in surveys (Section 133A), search and seizure operations, and information gathering.", level: "Level 7", icon: User },
];

const directTaxDepartments = [
  { name: "Income Tax Department", description: "Primary department under the Ministry of Finance responsible for administration and collection of direct taxes including Income Tax, Corporation Tax, and related levies.", ministry: "Ministry of Finance" },
  { name: "Central Board of Direct Taxes (CBDT)", description: "Statutory authority under the Central Board of Revenue Act, 1963. Functions as the apex body for direct tax policy and administration.", ministry: "Department of Revenue" },
  { name: "Investigation Wing", description: "Handles search and seizure operations, undisclosed income detection, and anti-tax evasion investigations.", ministry: "Income Tax Department" },
  { name: "International Taxation Division", description: "Handles Double Taxation Avoidance Agreements (DTAA), Transfer Pricing, and Foreign Tax Credit matters.", ministry: "CBDT" },
  { name: "Income Tax Appellate Tribunal (ITAT)", description: "Second appellate authority in direct tax matters. Quasi-judicial body independent of the IT Department under Section 252.", ministry: "Ministry of Law" },
  { name: "TDS Wing", description: "Responsible for administration of Tax Deducted at Source and Tax Collected at Source provisions under Chapter XVII-B.", ministry: "Income Tax Department" },
  { name: "Faceless Assessment Centre (FAC)", description: "Under Section 144B, handles faceless assessment to ensure transparency and eliminate human interface.", ministry: "CBDT" },
  { name: "Centralised Processing Centre (CPC)", description: "Located in Bengaluru. Processes all ITRs filed electronically, issues refunds, and generates intimations under Section 143(1).", ministry: "Income Tax Department" },
];

const indirectTaxOfficers = [
  { designation: "Central Board of Indirect Taxes & Customs (CBIC)", role: "Apex body for administration of GST, Customs, and Central Excise. Formulates all indirect tax policies.", level: "Apex", icon: Landmark },
  { designation: "Principal Chief Commissioner (GST & Customs)", role: "Heads the zonal administration. Supervises all Chief Commissioners within the zone.", level: "Level 1", icon: User },
  { designation: "Chief Commissioner (GST & Customs)", role: "Supervises Principal Commissioners and Commissioners. Exercises administrative control over the commissionerate.", level: "Level 2", icon: User },
  { designation: "Principal Commissioner (GST / Customs)", role: "Heads a commissionerate. Has adjudication powers for high-value cases and supervisory control.", level: "Level 3", icon: User },
  { designation: "Commissioner (GST / Customs)", role: "Primary adjudicating authority for major cases. Heads commissionerate-level administration.", level: "Level 3", icon: User },
  { designation: "Commissioner (Appeals)", role: "First appellate authority under Section 107 of CGST Act. Hears appeals against orders of adjudicating authorities below Commissioner.", level: "Appellate", icon: Scale },
  { designation: "Additional / Joint Commissioner", role: "Assists Commissioner. Adjudicates cases involving duty/tax demands within specified monetary limits.", level: "Level 4", icon: User },
  { designation: "Deputy Commissioner", role: "Handles assessment, audit, and adjudication of cases within prescribed limits. Issues show cause notices.", level: "Level 5", icon: User },
  { designation: "Assistant Commissioner", role: "Functions as proper officer for registration, refunds, and assessment. Primary point of contact for taxpayers.", level: "Level 5", icon: User },
  { designation: "Superintendent (GST / Customs)", role: "Handles day-to-day compliance monitoring, scrutiny of returns, audit, and anti-evasion activities.", level: "Level 6", icon: User },
  { designation: "Inspector (GST / Customs)", role: "Conducts physical verification, inspection of goods, and assists in search and seizure operations.", level: "Level 7", icon: User },
  { designation: "GST Appellate Tribunal (GSTAT)", role: "Second appellate authority under Section 109 of CGST Act. National and State benches for dispute resolution.", level: "Tribunal", icon: Scale },
];

const indirectTaxDepartments = [
  { name: "Central Board of Indirect Taxes & Customs (CBIC)", description: "Apex body under the Department of Revenue, Ministry of Finance. Administers GST, Customs, and residual Central Excise.", ministry: "Ministry of Finance" },
  { name: "Directorate General of GST Intelligence (DGGI)", description: "Intelligence and anti-evasion arm for GST. Handles detection of tax evasion, fake invoicing, and ITC fraud.", ministry: "CBIC" },
  { name: "Directorate General of Analytics & Risk Management (DGARM)", description: "Provides data analytics support, risk profiling, and identifies high-risk taxpayers for scrutiny.", ministry: "CBIC" },
  { name: "Directorate General of Audit (DG Audit)", description: "Conducts GST and Customs audit of taxpayers and importers/exporters to verify compliance.", ministry: "CBIC" },
  { name: "Directorate General of Systems & Data Management", description: "Manages the GSTN IT infrastructure, e-filing systems, and technology backbone for indirect taxes.", ministry: "CBIC" },
  { name: "Customs Department", description: "Administers Customs Act, 1962. Handles import/export duties, prohibited goods, anti-smuggling, and trade facilitation.", ministry: "CBIC" },
  { name: "Directorate of Revenue Intelligence (DRI)", description: "Premier anti-smuggling intelligence agency. Handles gold smuggling, narcotics, commercial fraud, and under-invoicing.", ministry: "CBIC" },
  { name: "State GST Department (SGST)", description: "Each state has its own GST department to administer SGST. Works in coordination with CGST authorities for integrated tax administration.", ministry: "State Government" },
  { name: "GST Council", description: "Constitutional body under Article 279A. Recommends GST rates, exemptions, and policies. Chaired by the Union Finance Minister.", ministry: "Constitutional Body" },
  { name: "GST Network (GSTN)", description: "IT backbone for GST. Manages the GST portal for return filing, registration, payment, and taxpayer services.", ministry: "Public-Private Entity" },
];

const OfficerCard = ({ officer, index }: { officer: typeof directTaxOfficers[0]; index: number }) => {
  const Icon = officer.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="bg-background border border-border p-6 hover:border-accent/40 transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
          <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-heading font-semibold text-foreground text-sm">{officer.designation}</h3>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-accent/10 text-accent">{officer.level}</span>
          </div>
          <p className="text-xs text-muted-foreground">{officer.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const DepartmentCard = ({ dept, index }: { dept: typeof directTaxDepartments[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="bg-background border border-border p-6 hover:border-accent/40 transition-colors"
  >
    <div className="flex items-center gap-2 mb-2">
      <Building2 className="w-5 h-5 text-primary" />
      <h3 className="font-heading font-semibold text-foreground text-sm">{dept.name}</h3>
    </div>
    <p className="text-xs text-muted-foreground mb-3">{dept.description}</p>
    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-muted text-muted-foreground">
      {dept.ministry}
    </span>
  </motion.div>
);

const KnowTaxationPage = () => {
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
              className="text-muted-foreground max-w-3xl mx-auto"
            >
              Complete directory of government officers and departments responsible for administration of
              Direct and Indirect Taxes in India.
            </motion.p>
          </div>

          <Tabs defaultValue="direct" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="direct" className="text-sm font-semibold tracking-wide uppercase">
                Direct Taxes
              </TabsTrigger>
              <TabsTrigger value="indirect" className="text-sm font-semibold tracking-wide uppercase">
                Indirect Taxes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="direct">
              {/* Officers */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-6 h-6 text-accent" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Government Officers — Direct Taxes</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Hierarchy of officers under the Income Tax Act, 1961 as per Section 116, from CBDT to Inspector level.
                </p>
                <div className="grid gap-3">
                  {directTaxOfficers.map((officer, i) => (
                    <OfficerCard key={officer.designation} officer={officer} index={i} />
                  ))}
                </div>
              </motion.div>

              {/* Departments */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-accent" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Departments — Direct Taxes</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {directTaxDepartments.map((dept, i) => (
                    <DepartmentCard key={dept.name} dept={dept} index={i} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="indirect">
              {/* Officers */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-6 h-6 text-accent" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Government Officers — Indirect Taxes</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Hierarchy of officers under CGST Act, 2017 and Customs Act, 1962, from CBIC to Inspector level.
                </p>
                <div className="grid gap-3">
                  {indirectTaxOfficers.map((officer, i) => (
                    <OfficerCard key={officer.designation} officer={officer} index={i} />
                  ))}
                </div>
              </motion.div>

              {/* Departments */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-accent" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Departments — Indirect Taxes</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {indirectTaxDepartments.map((dept, i) => (
                    <DepartmentCard key={dept.name} dept={dept} index={i} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default KnowTaxationPage;
