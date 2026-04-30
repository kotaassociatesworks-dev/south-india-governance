import type { LucideIcon } from "lucide-react";
import { Building2, Factory, Globe, Rocket } from "lucide-react";
import type { BusinessType } from "./complianceCalendar";

export interface ChecklistItem { name: string; freq: string; }
export interface BusinessProfile {
  id: BusinessType;
  label: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  badges: string[];
  thresholds?: { obligation: string; threshold: string }[];
  classification?: { category: string; investment: string; turnover: string }[];
  specific?: ChecklistItem[];      // MSME / MNC sub-section
  specificTitle?: string;
  domestic?: ChecklistItem[];      // MNC domestic compliance
  domesticTitle?: string;
  benefits?: { title: string; detail: string }[];   // Startup
  lifecycle?: string[];            // Startup
  checklist: ChecklistItem[];
  advisory: string;
}

export const businessProfiles: Record<BusinessType, BusinessProfile> = {
  legacy: {
    id: "legacy",
    label: "Legacy Firm",
    icon: Building2,
    tagline: "70+ year established businesses",
    description: "Established proprietorships or partnerships with 10+ years of operation and multi-state clientele. Subject to full audit norms under the Income Tax Act.",
    badges: ["Audit Required", "GST Monthly", "TDS Quarterly", "E-Way Bills Applicable"],
    thresholds: [
      { obligation: "GST mandatory (goods)",       threshold: "Turnover > ₹40 Lakhs" },
      { obligation: "GST mandatory (services)",    threshold: "Turnover > ₹20 Lakhs" },
      { obligation: "Tax Audit (business)",        threshold: "Turnover > ₹1 Crore" },
      { obligation: "Tax Audit (profession)",      threshold: "Receipts > ₹50 Lakhs" },
      { obligation: "E-Way Bill trigger",          threshold: "Consignment > ₹50,000" },
      { obligation: "Advance Tax liability",       threshold: "Tax payable > ₹10,000" },
    ],
    checklist: [
      { name: "GSTR-1",                                       freq: "Monthly (11th)" },
      { name: "GSTR-3B",                                      freq: "Monthly (20th)" },
      { name: "GSTR-9 Annual Return",                         freq: "31 Dec" },
      { name: "GSTR-9C Reconciliation (turnover > ₹5 Cr)",    freq: "31 Dec" },
      { name: "TDS Return 24Q / 26Q",                         freq: "Quarterly" },
      { name: "TDS Certificate Form 16 / 16A",                freq: "Quarterly / Annual" },
      { name: "Income Tax Return",                            freq: "31 Jul / 31 Oct (audit)" },
      { name: "Audit Report 3CA / 3CB",                       freq: "30 Sep" },
      { name: "Advance Tax (4 instalments)",                  freq: "Quarterly" },
      { name: "Professional Tax",                             freq: "Monthly" },
      { name: "E-Way Bills",                                  freq: "Per transaction" },
    ],
    advisory: "Firms with multi-generational client bases often carry legacy transactions predating GST. Kota Associates specialises in reconciling pre-GST dues, property-related TDS obligations (Section 194-IA), and historical audit trails specific to long-standing partnerships and proprietorships across Andhra Pradesh and Telangana.",
  },

  msme: {
    id: "msme",
    label: "MSME",
    icon: Factory,
    tagline: "Micro, Small & Medium enterprises",
    description: "Enterprises registered under Udyam — eligible for priority sector lending, MSMED Act protections and Section 43B(h) deductions.",
    badges: ["Udyam Mandatory", "MSME Form 1", "Section 43B(h)", "CGTMSE Eligible"],
    classification: [
      { category: "Micro",  investment: "≤ ₹1 Crore",  turnover: "≤ ₹5 Crore" },
      { category: "Small",  investment: "≤ ₹10 Crore", turnover: "≤ ₹50 Crore" },
      { category: "Medium", investment: "≤ ₹50 Crore", turnover: "≤ ₹250 Crore" },
    ],
    specificTitle: "MSME-Specific Obligations",
    specific: [
      { name: "Udyam Registration",                                 freq: "One-time (mandatory)" },
      { name: "MSME Form 1 (payment dues report)",                  freq: "Half-yearly (Apr & Oct)" },
      { name: "MSME Samadhaan (delayed payment filing)",            freq: "As applicable" },
      { name: "Priority Sector Lending documentation",              freq: "As required by bank" },
      { name: "Samadhan Portal grievance",                          freq: "As applicable" },
    ],
    checklist: [
      { name: "GST Registration",                                   freq: "One-time (before first supply)" },
      { name: "GSTR-1 / GSTR-3B",                                   freq: "Monthly" },
      { name: "GSTR-9",                                             freq: "Annual (31 Dec)" },
      { name: "TDS Deduction & Return",                             freq: "Quarterly" },
      { name: "ITR (Presumptive 44AD/44ADA if eligible)",           freq: "31 Jul" },
      { name: "Provident Fund (if 20+ employees)",                  freq: "Monthly" },
      { name: "ESI (if applicable)",                                freq: "Monthly" },
      { name: "Professional Tax",                                   freq: "Monthly" },
      { name: "E-Way Bill (goods > ₹50,000)",                       freq: "Per shipment" },
      { name: "Shops & Establishments renewal",                     freq: "Annual" },
    ],
    advisory: "MSMEs registered under Udyam enjoy priority sector lending, credit guarantees under CGTMSE, and 45-day payment protection under the MSMED Act. We help you file MSME Form 1 on time (missed filings attract compound interest liability on buyers), claim Section 43B(h) deductions, and leverage the Presumptive Tax Scheme to significantly reduce compliance costs.",
  },

  mnc: {
    id: "mnc",
    label: "MNC",
    icon: Globe,
    tagline: "Foreign subsidiaries & branch offices",
    description: "Indian subsidiaries, liaison offices and branch offices of foreign parents, subject to Transfer Pricing rules, FEMA reporting and multi-state GST registration.",
    badges: ["Transfer Pricing", "FEMA Filing", "CbCR Required", "Multi-State GST", "Equalisation Levy"],
    specificTitle: "International Tax Obligations",
    specific: [
      { name: "Transfer Pricing (TP) Documentation",                freq: "Annual" },
      { name: "Form 3CEB (TP Audit by CA)",                         freq: "30 Nov" },
      { name: "Master File (Form 3CEAA)",                           freq: "30 Nov (if applicable)" },
      { name: "Country-by-Country Report (CbCR)",                   freq: "12 months from year-end" },
      { name: "Equalisation Levy (2% on e-commerce)",               freq: "Quarterly" },
      { name: "FEMA Annual Return — FLA",                           freq: "15 Jul" },
      { name: "FC-GPR (on FDI inflow)",                             freq: "30 days of allotment" },
      { name: "FC-TRS (on transfer of shares)",                     freq: "60 days" },
    ],
    domesticTitle: "India Domestic Compliance",
    domestic: [
      { name: "GST Registration (each state of operation)",         freq: "One-time per state" },
      { name: "GSTR-1 / GSTR-3B (per GSTIN)",                       freq: "Monthly" },
      { name: "TDS/TCS (Sec 195 — foreign remittances)",            freq: "Monthly / Quarterly" },
      { name: "Advance Tax",                                        freq: "Quarterly" },
      { name: "ROC Annual Filing (AOC-4 + MGT-7)",                  freq: "Within 30 / 60 days of AGM" },
      { name: "Secretarial Audit MR-3 (paid-up cap > ₹10 Cr)",      freq: "Annual" },
      { name: "Statement of Financial Transactions (Form 61A)",     freq: "31 May" },
      { name: "E-Way Bills for inter-state movement",               freq: "IGST per crossing" },
    ],
    checklist: [],
    advisory: "Inter-company transactions between group entities must be priced at arm's length with contemporaneous TP documentation. Every goods consignment crossing state lines between group entities requires both an E-Way Bill (under IGST) and a TP-compliant invoice — a dual compliance point frequently missed during internal audits. Our TP team works alongside logistics coordinators to align documentation.",
  },

  startup: {
    id: "startup",
    label: "Startup",
    icon: Rocket,
    tagline: "DPIIT-recognised & early-stage",
    description: "Early-stage entities incorporated as Pvt. Ltd, LLP or partnership — eligible for Startup India benefits, Section 80-IAC tax holiday and angel-tax exemption on DPIIT recognition.",
    badges: ["DPIIT Eligible", "Sec 80-IAC", "Angel Tax Exempt", "Self-Certification"],
    benefits: [
      { title: "DPIIT Recognition",                                 detail: "One-time registration, unlocks all Startup India benefits" },
      { title: "Section 80-IAC Tax Holiday",                        detail: "100% deduction for any 3 consecutive years out of first 10" },
      { title: "Angel Tax Exemption (Sec 56(2)(viib))",             detail: "Available on DPIIT recognition" },
      { title: "Self-Certification (6 labour laws)",                detail: "Annual filing instead of inspector visits" },
      { title: "Self-Certification (3 environmental laws)",         detail: "Annual" },
      { title: "Fast-track patent examination",                     detail: "80% cost reduction on IPR fees" },
      { title: "Fast-track winding up",                             detail: "90-day process under IBC" },
    ],
    lifecycle: [
      "Incorporation via SPICe+ (MCA portal) — Day 1",
      "PAN, TAN, Bank account — Week 1",
      "GST Registration (before first taxable supply)",
      "DPIIT Application (Startup India portal)",
      "Shareholders Agreement & ESOP Policy (at seed funding)",
      "ROC Annual Filings — AOC-4 + MGT-7 (within 30/60 days of AGM)",
      "ITR with Section 80-IAC deduction claim — 31 Oct (mandatory, not automatic)",
      "ESOP FMV Valuation (on every grant)",
      "FEMA / FDI compliance (on overseas investment)",
      "E-Way Bills (if dealing in goods > ₹50,000) — per shipment",
    ],
    checklist: [],
    advisory: "The Section 80-IAC tax holiday must be explicitly claimed in the ITR — it is not automatically applied. Hundreds of startups lose lakhs in tax savings simply because their returns were filed without the deduction schedule. Kota Associates ensures your DPIIT approval, certificate from the Inter-Ministerial Board (if required), and the deduction schedule are all filed correctly and on time.",
  },
};
