export interface BlogArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  popular?: boolean;
  introduction: string;
  highlights: { heading: string; points: string[] }[];
  importantNotes: { title: string; content: string }[];
  tips: { heading: string; points: string[] };
  relatedIds: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: "gst-late-fee-rules",
    category: "GST Updates",
    title: "GST Late Fee Rules 2024-25: Maximum Caps and Calculations",
    excerpt: "Complete breakdown of GST late fee structure for GSTR-1, GSTR-3B, GSTR-9, and GSTR-9C. Know the maximum caps and how to minimize your late fee liability.",
    date: "March 2026",
    readTime: "6 min",
    popular: true,
    introduction:
      "GST late fees apply when returns such as GSTR-1, GSTR-3B or GSTR-9 are filed after the due date. Understanding the late fee structure helps businesses avoid unnecessary penalties and maintain a clean compliance record.",
    highlights: [
      {
        heading: "GSTR-3B Late Fee",
        points: [
          "₹25/day CGST + ₹25/day SGST (with tax liability)",
          "Maximum cap: ₹5,000 per Act (CGST & SGST)",
          "Nil returns: ₹10/day CGST + ₹10/day SGST",
          "Nil return cap: ₹500 per Act",
        ],
      },
      {
        heading: "GSTR-1 Late Fee",
        points: [
          "₹50/day (₹25 CGST + ₹25 SGST)",
          "Nil returns: ₹20/day total",
          "Maximum cap: ₹500 per Act for nil returns",
        ],
      },
      {
        heading: "GSTR-9 (Annual Return) Late Fee",
        points: [
          "₹100/day (₹50 CGST + ₹50 SGST)",
          "Maximum: 0.25% of turnover in the state/UT",
        ],
      },
    ],
    importantNotes: [
      {
        title: "Interest on Late Payment",
        content:
          "18% per annum on outstanding tax liability. Interest is calculated from the day after the due date until the date of actual payment. This is in addition to the late fee.",
      },
      {
        title: "Amnesty Schemes",
        content:
          "The government periodically announces amnesty schemes to waive or reduce late fees for past periods. Keep track of CBIC notifications for such opportunities.",
      },
    ],
    tips: {
      heading: "Tips to Reduce GST Penalties",
      points: [
        "File returns even with zero transactions to avoid late fees",
        "Maintain proper invoice records and reconcile monthly",
        "Track GST due dates using our free compliance tools",
        "Set calendar reminders 5 days before each due date",
        "Consider professional filing services for timely compliance",
      ],
    },
    relatedIds: ["gst-notice-reply", "gst-refund-process", "eway-bill-rules"],
  },
  {
    id: "gst-notice-reply",
    category: "GST Compliance",
    title: "How to Reply to a GST Notice: Complete Guide for Businesses",
    excerpt: "Received a GST notice? Don't panic. This comprehensive guide explains different types of GST notices and step-by-step process to draft a proper reply.",
    date: "March 2026",
    readTime: "8 min",
    popular: true,
    introduction:
      "Receiving a GST notice can be stressful for any business owner. Understanding the types of notices and the correct procedure to respond is crucial to protect your interests and avoid unnecessary penalties.",
    highlights: [
      {
        heading: "Types of GST Notices",
        points: [
          "ASMT-10: Scrutiny Notice — issued for discrepancies in returns",
          "DRC-01: Show Cause Notice — under Section 73 or 74 of CGST Act",
          "DRC-03: Voluntary Payment — settle tax demands before adjudication",
          "REG-17: Cancellation Notice — for non-filing or non-compliance",
        ],
      },
      {
        heading: "Steps to Draft Your Reply",
        points: [
          "Read the notice carefully — identify sections and periods",
          "Gather supporting documents — invoices, bank statements, returns",
          "Draft point-wise reply addressing each allegation",
          "File response on GST portal within 30 days",
          "Keep the ARN (acknowledgement) for future reference",
        ],
      },
    ],
    importantNotes: [
      {
        title: "Time Limit for Reply",
        content:
          "You must reply within 30 days of receiving the notice. Extensions can be requested in writing. Failure to reply may result in ex-parte orders being passed against you.",
      },
      {
        title: "Right to Representation",
        content:
          "Under Section 116 of CGST Act, you have the right to be represented by a Chartered Accountant, Tax Practitioner, or Advocate during proceedings.",
      },
    ],
    tips: {
      heading: "Tips for Handling GST Notices",
      points: [
        "Never ignore a GST notice — always respond within the time limit",
        "Reconcile GSTR-1, GSTR-3B, and GSTR-2A/2B regularly",
        "Keep all supporting documents organized and accessible",
        "Seek professional help for complex notices involving large amounts",
        "Document all communication with the department",
      ],
    },
    relatedIds: ["gst-late-fee-rules", "gst-refund-process", "income-tax-notice-guide"],
  },
  {
    id: "eway-bill-rules",
    category: "E-Way Bill",
    title: "E-Way Bill Rules 2024: Complete Guide for Transporters and Traders",
    excerpt: "Everything you need to know about E-Way Bill generation, validity, Part-A and Part-B requirements, exemptions, and penalties for non-compliance.",
    date: "February 2026",
    readTime: "10 min",
    popular: true,
    introduction:
      "An E-Way Bill is a mandatory electronic document required for movement of goods worth more than ₹50,000. Understanding the rules ensures smooth transportation and avoids costly penalties during transit.",
    highlights: [
      {
        heading: "When is E-Way Bill Required?",
        points: [
          "Supply of goods (sale/purchase) exceeding ₹50,000",
          "Movement for reasons other than supply (job work, exhibition)",
          "Inward supply from unregistered person",
          "Inter-state movement of goods by principal to job worker",
        ],
      },
      {
        heading: "Validity Based on Distance",
        points: [
          "Up to 200 KM — 1 day validity",
          "Every additional 200 KM — 1 additional day",
          "Over-dimensional cargo: 1 day per 20 KM",
          "Validity can be extended before or within 8 hours of expiry",
        ],
      },
    ],
    importantNotes: [
      {
        title: "Penalties for Non-Compliance",
        content:
          "Goods and vehicle can be detained under Section 129 of CGST Act. Penalty of ₹10,000 or tax evaded (whichever is higher). Release requires payment of applicable tax and penalty.",
      },
      {
        title: "Exemptions",
        content:
          "E-Way Bill is not required for goods exempt from GST, goods transported by non-motorized conveyance, and certain notified goods like LPG, kerosene, etc.",
      },
    ],
    tips: {
      heading: "E-Way Bill Best Practices",
      points: [
        "Generate E-Way Bill before goods are dispatched",
        "Verify HSN codes and tax rates before generation",
        "Keep a copy of the E-Way Bill in the vehicle at all times",
        "Cancel within 24 hours if goods are not transported",
        "Use bulk generation for high-volume consignments",
      ],
    },
    relatedIds: ["gst-late-fee-rules", "gst-notice-reply", "gst-refund-process"],
  },
  {
    id: "gst-refund-process",
    category: "GST Compliance",
    title: "GST Refund Process: How to Claim and Track Your Refund",
    excerpt: "Step-by-step guide to claiming GST refunds for exports, inverted duty structure, excess tax payment, and accumulated ITC.",
    date: "January 2026",
    readTime: "7 min",
    popular: false,
    introduction:
      "GST refunds are available for various situations including zero-rated exports, inverted duty structure, and excess payment. Filing a proper refund application with complete documentation ensures faster processing.",
    highlights: [
      {
        heading: "Types of GST Refunds",
        points: [
          "Export Refund — Zero-rated supplies under LUT/Bond",
          "Inverted Duty Structure — Input tax rate > Output tax rate",
          "Excess Balance in Electronic Cash Ledger",
          "Refund of IGST paid on exports of goods",
        ],
      },
      {
        heading: "Documents Required",
        points: [
          "RFD-01 application on GST portal",
          "Statement of invoices (RFD-01A)",
          "Bank realization certificate (for exports)",
          "Shipping bills / Bill of export",
          "CA certificate (for refund exceeding ₹2 lakh)",
        ],
      },
    ],
    importantNotes: [
      {
        title: "Processing Timeline",
        content:
          "Refunds must be processed within 60 days of filing. Provisional refund of 90% within 7 days for zero-rated supplies under Section 54(6). Interest at 6% payable on delayed refunds.",
      },
      {
        title: "Limitation Period",
        content:
          "Refund application must be filed within 2 years from the relevant date as prescribed under Section 54 of the CGST Act.",
      },
    ],
    tips: {
      heading: "Maximize Your Refund Success",
      points: [
        "Ensure all returns are filed up to date before applying",
        "Reconcile ITC claims with GSTR-2A/2B",
        "Maintain proper documentation for every transaction",
        "File within the 2-year limitation period",
        "Track your application status regularly on the GST portal",
      ],
    },
    relatedIds: ["gst-notice-reply", "gst-late-fee-rules", "eway-bill-rules"],
  },
  {
    id: "partnership-deed-guide",
    category: "Legal Services",
    title: "Partnership Deed Drafting: Essential Clauses Every Business Needs",
    excerpt: "A well-drafted partnership deed protects all partners' interests. Learn about mandatory and recommended clauses under the Indian Partnership Act, 1932.",
    date: "December 2025",
    readTime: "5 min",
    popular: false,
    introduction:
      "A partnership deed is a legal agreement between partners that defines the terms of the partnership. While not legally mandatory, a well-drafted deed prevents disputes and provides clarity on critical business decisions.",
    highlights: [
      {
        heading: "Essential Clauses",
        points: [
          "Name, address of firm and all partners",
          "Nature of business and capital contribution",
          "Profit and loss sharing ratio",
          "Salary, commission, and interest provisions",
          "Rights, duties, and decision-making authority",
          "Dispute resolution and arbitration mechanism",
          "Admission, retirement, and dissolution provisions",
        ],
      },
      {
        heading: "Registration Benefits",
        points: [
          "Admissible as evidence in court proceedings",
          "Partners can file suits against each other",
          "Partners can file suits against third parties",
          "Provides legal recognition to the firm",
        ],
      },
    ],
    importantNotes: [
      {
        title: "Stamp Duty",
        content:
          "Partnership deeds must be executed on stamp paper of appropriate value as per the state stamp act. The stamp duty varies from state to state.",
      },
    ],
    tips: {
      heading: "Tips for Partnership Deeds",
      points: [
        "Always get the deed reviewed by a legal professional",
        "Include exit mechanisms for each partner",
        "Define clear profit-sharing ratios and capital contributions",
        "Include dispute resolution clauses to avoid litigation",
        "Register the deed for legal protection",
      ],
    },
    relatedIds: ["income-tax-notice-guide", "gst-notice-reply"],
  },
  {
    id: "income-tax-notice-guide",
    category: "Income Tax",
    title: "Income Tax Notice: Types, Reasons, and How to Respond",
    excerpt: "Understand different types of Income Tax notices under Sections 143, 148, 245, and 271. Learn the proper way to respond and protect your rights.",
    date: "November 2025",
    readTime: "9 min",
    popular: true,
    introduction:
      "The Income Tax Department issues various notices for scrutiny, reassessment, demand, and penalty proceedings. Knowing the type of notice and responding correctly within the prescribed time is essential to protect your interests.",
    highlights: [
      {
        heading: "Common Types of IT Notices",
        points: [
          "Section 143(1) — Intimation of processed return with adjustments",
          "Section 143(2) — Scrutiny assessment notice",
          "Section 148 — Notice for income escaping assessment (reassessment)",
          "Section 245 — Notice for adjustment of refund against demand",
          "Section 271 — Penalty notice for concealment or inaccurate particulars",
        ],
      },
      {
        heading: "Response Procedure",
        points: [
          "Login to the e-filing portal and check notice details",
          "Identify the assessment year and sections mentioned",
          "Prepare documentation as requested in the notice",
          "Submit response electronically within the prescribed time",
          "Attend personal hearing if required",
        ],
      },
    ],
    importantNotes: [
      {
        title: "Time Limits",
        content:
          "Most notices require response within 15-30 days. Section 148 notices require filing of return within the specified period. Non-compliance can lead to best judgment assessment under Section 144.",
      },
      {
        title: "Faceless Assessment",
        content:
          "Most assessments are now conducted under the Faceless Assessment Scheme (Section 144B), ensuring transparency and eliminating human interface.",
      },
    ],
    tips: {
      heading: "Handling Income Tax Notices",
      points: [
        "Respond within the stipulated time — never ignore a notice",
        "Verify the notice on the official e-filing portal",
        "Keep all supporting documents organized by assessment year",
        "Seek professional help for scrutiny and reassessment notices",
        "File your returns accurately to minimize notice risk",
      ],
    },
    relatedIds: ["gst-notice-reply", "partnership-deed-guide", "gst-late-fee-rules"],
  },
];

export const blogCategories = ["All", ...Array.from(new Set(blogArticles.map((a) => a.category)))];

export const downloadableChecklists = [
  {
    id: "gst-compliance",
    title: "GST Compliance Checklist",
    description: "Monthly and quarterly GST compliance checklist covering GSTR-1, GSTR-3B, ITC reconciliation, and due dates.",
  },
  {
    id: "gst-return-filing",
    title: "GST Return Filing Checklist",
    description: "Step-by-step checklist for filing GST returns with all required documents and verification points.",
  },
  {
    id: "it-notice-response",
    title: "Income Tax Notice Response Checklist",
    description: "Comprehensive checklist for responding to Income Tax notices including documentation and timeline tracking.",
  },
];
