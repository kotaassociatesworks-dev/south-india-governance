// ============================================================
// GST EXPERT KNOWLEDGE ENGINE
// CA-Grade GST Advisory System for Indian GST Law
// ============================================================

export interface GSTResponse {
  summary: string;
  legalReference: string;
  practicalInterpretation: string;
  implementationSteps: string[];
  risksAndNotes: string[];
  category: string;
}

interface GSTKnowledgeEntry {
  keywords: string[];
  category: string;
  response: GSTResponse;
}

const gstKnowledgeBase: GSTKnowledgeEntry[] = [
  // ── ITC on Motor Vehicles ──
  {
    keywords: ["itc", "car", "motor vehicle", "vehicle purchase", "car purchase"],
    category: "Input Tax Credit",
    response: {
      summary: "ITC on motor vehicles is blocked under Section 17(5)(a) of CGST Act, with specific exceptions for certain business uses.",
      legalReference: "Section 17(5)(a) of CGST Act, 2017 read with Explanation to Section 17(5). Exceptions: vehicles used for (i) further supply of such vehicles, (ii) transportation of passengers, (iii) imparting training on driving/flying/navigating.",
      practicalInterpretation: "If you purchase a car for general business use (e.g., for directors, employees), ITC is NOT available. However, if your business is a car dealership, taxi service, or driving school, ITC IS available. For vehicles with seating capacity ≤13 persons (including driver), the block applies.",
      implementationSteps: [
        "Identify the purpose of vehicle purchase — business transport vs. further supply",
        "If blocked: Book full invoice value as capital asset without ITC",
        "If eligible (dealer/taxi/training): Claim ITC in GSTR-3B and maintain documentation",
        "Ensure vehicle usage logs are maintained if claiming exception",
        "For mixed-use vehicles, apply Rule 42/43 for proportionate ITC reversal"
      ],
      risksAndNotes: [
        "Wrong ITC claim on blocked vehicles can attract Section 74 proceedings (fraud/suppression)",
        "Interest @ 24% u/s 50(3) on wrongly availed and utilized ITC",
        "Penalty equal to tax amount under Section 122",
        "Maintain vehicle usage records to defend exception claims during audit"
      ]
    }
  },
  // ── ITC Eligibility & Section 16 ──
  {
    keywords: ["itc eligibility", "input tax credit", "claim itc", "itc conditions", "section 16", "itc rules"],
    category: "Input Tax Credit",
    response: {
      summary: "ITC is available under Section 16 of CGST Act subject to 4 mandatory conditions: possession of tax invoice, receipt of goods/services, tax actually paid to government, and filing of return.",
      legalReference: "Section 16(2) of CGST Act, 2017. Time limit: Section 16(4) — ITC must be claimed before 30th November of the following financial year or date of filing annual return, whichever is earlier. Rule 36(4) — ITC cannot exceed 105% of eligible ITC appearing in GSTR-2B (w.e.f. 01.01.2022).",
      practicalInterpretation: "You can claim ITC only if: (1) You have a valid tax invoice, (2) You have actually received the goods/services, (3) The supplier has deposited the tax with the government (reflects in your GSTR-2B), and (4) You have filed your GSTR-3B. If any condition fails, ITC must be reversed.",
      implementationSteps: [
        "Reconcile purchase register with GSTR-2B every month before filing GSTR-3B",
        "Identify mismatches — invoices in books but not in GSTR-2B",
        "For mismatched invoices, follow up with suppliers to file/amend their GSTR-1",
        "Claim only matched ITC in GSTR-3B within the 105% rule",
        "Track Section 16(4) deadline — claim pending ITC before 30th Nov of next FY",
        "Maintain proper receipt documentation (GRN, delivery challans)"
      ],
      risksAndNotes: [
        "ITC claimed beyond GSTR-2B + 5% will be auto-flagged by GST system",
        "Failure to reconcile leads to demand notices under Section 73/74",
        "Suppliers not filing returns is the #1 reason for ITC denial",
        "Always verify supplier compliance status on GST portal before large transactions"
      ]
    }
  },
  // ── Blocked Credits ──
  {
    keywords: ["blocked credit", "section 17(5)", "blocked itc", "ineligible itc", "17 5"],
    category: "Input Tax Credit",
    response: {
      summary: "Section 17(5) lists specific goods and services on which ITC is permanently blocked, regardless of business use.",
      legalReference: "Section 17(5)(a) to (h) of CGST Act, 2017. Key blocked items: (a) Motor vehicles & conveyances, (b) Food & beverages, outdoor catering, beauty treatment, health services, cosmetic/plastic surgery, (c) Membership of club/health/fitness, (d) Travel benefits for employees on vacation, (e) Works contract for immovable property (except plant & machinery), (f) Goods/services for personal consumption, (g) Tax paid under composition scheme, (h) Tax paid on supplies received by non-resident taxable person.",
      practicalInterpretation: "Even if you use these items 100% for business, ITC is still blocked. Common mistakes include claiming ITC on office renovation (works contract), employee meals, or health insurance. However, there are exceptions — e.g., food/beverages ITC is allowed if you are in the food business (restaurant, caterer).",
      implementationSteps: [
        "Review all purchase invoices and classify against Section 17(5) categories",
        "Create a blocked credit register in your accounting system",
        "Flag blocked items in your ERP to prevent accidental ITC claims",
        "For borderline cases, obtain written opinion before claiming",
        "Reverse any wrongly claimed blocked ITC with interest before audit"
      ],
      risksAndNotes: [
        "Claiming blocked ITC is treated as wrongful availment — attracts penalty",
        "Interest @ 24% applies on utilized blocked ITC (Section 50(3))",
        "Department actively scrutinizes blocked credit claims during audits",
        "Works contract ITC for plant & machinery IS allowed — know the distinction"
      ]
    }
  },
  // ── GST Registration ──
  {
    keywords: ["gst registration", "registration", "threshold", "register gst", "new registration", "gst number"],
    category: "Registration",
    response: {
      summary: "GST registration is mandatory when aggregate turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs for services / special category states), or in cases listed under Section 24 regardless of turnover.",
      legalReference: "Section 22 (liability to register), Section 24 (compulsory registration), Section 25 (procedure). Threshold: ₹40L for goods suppliers in normal states, ₹20L for service providers and special category states (Notification No. 10/2019-CT). Section 24 mandates registration for: inter-state suppliers, casual taxable persons, e-commerce operators/sellers, persons liable to pay tax under RCM, TDS/TCS deductors, etc.",
      practicalInterpretation: "Even if your turnover is below threshold, you MUST register if you make inter-state supplies, sell on e-commerce platforms (Amazon, Flipkart), or are required to pay tax under reverse charge. Voluntary registration is also available under Section 25(3).",
      implementationSteps: [
        "Calculate aggregate turnover (all supplies including exempt, excluding inward supplies under RCM)",
        "Check if any Section 24 condition applies (inter-state supply, e-commerce, etc.)",
        "Apply on GST Portal (gst.gov.in) using Form GST REG-01",
        "Documents needed: PAN, Aadhaar, business address proof, bank account details, photos",
        "Application processed within 7 working days (Rule 9)",
        "If query raised, respond within 7 working days via REG-04"
      ],
      risksAndNotes: [
        "Operating without registration when liable attracts penalty under Section 122(1)(xi)",
        "Penalty: higher of ₹10,000 or tax evaded",
        "No ITC available to recipients if supplier is unregistered",
        "Registration is PAN-based and state-specific — separate registration needed for each state"
      ]
    }
  },
  // ── GSTR-1 Filing ──
  {
    keywords: ["gstr-1", "gstr1", "outward supply", "sales return", "filing gstr 1"],
    category: "Returns",
    response: {
      summary: "GSTR-1 is the return for reporting outward supplies (sales), due by 11th of the following month (monthly) or 13th of month following quarter (QRMP scheme).",
      legalReference: "Section 37 of CGST Act. Rule 59 of CGST Rules. QRMP Scheme: Notification No. 83/2020-CT. Quarterly filing available for taxpayers with turnover up to ₹5 Crore (IFF facility for M1 & M2 of quarter). Auto-populated in recipient's GSTR-2B.",
      practicalInterpretation: "Your GSTR-1 data flows into your buyers' GSTR-2B for ITC matching. Any delay or error in GSTR-1 directly impacts your customers' ITC claims. B2B invoices must be reported with GSTIN, invoice-wise. B2C large (>₹2.5L inter-state) must be reported place-of-supply wise.",
      implementationSteps: [
        "Reconcile sales register with e-invoices/invoices before filing",
        "Upload B2B invoices with correct GSTINs and tax amounts",
        "Report B2C supplies (small and large) in respective tables",
        "Include credit/debit notes in the relevant tables",
        "Verify HSN summary (Table 12) — mandatory for turnover > ₹5 Cr at 6-digit",
        "File by 11th monthly or 13th quarterly; use IFF for monthly B2B reporting under QRMP"
      ],
      risksAndNotes: [
        "Late fee: ₹50/day (₹20 for nil return) per Act — max ₹10,000 per return per Act",
        "Non-filing blocks GSTR-3B filing (sequential filing dependency)",
        "Errors in GSTR-1 cause ITC mismatch notices to your customers",
        "E-invoicing auto-populates GSTR-1 for turnover > ₹5 Cr — verify before filing"
      ]
    }
  },
  // ── GSTR-3B Filing ──
  {
    keywords: ["gstr-3b", "gstr3b", "3b", "monthly return", "gst return filing", "file return"],
    category: "Returns",
    response: {
      summary: "GSTR-3B is the summary return for declaring GST liability and ITC, due by 20th of following month (monthly filers) or 22nd/24th (quarterly QRMP filers).",
      legalReference: "Section 39 of CGST Act. Rule 61 of CGST Rules. Staggered deadlines for QRMP: 22nd (Category A states) / 24th (Category B states). Auto-populated liability from GSTR-1 and ITC from GSTR-2B since January 2022.",
      practicalInterpretation: "GSTR-3B is your actual tax payment return. It must match your GSTR-1 (outward) and GSTR-2B (inward). Any mismatch triggers automated notices from the GST system. Pay tax before filing — interest runs from due date, not filing date.",
      implementationSteps: [
        "Download GSTR-2B and reconcile with purchase register",
        "Verify auto-populated GSTR-3B values against your books",
        "Declare outward supplies (Table 3.1) matching GSTR-1",
        "Claim eligible ITC (Table 4) — only up to GSTR-2B + 5%",
        "Report inward supplies under RCM (Table 3.1(d))",
        "Compute net tax and pay via DRC-03/electronic cash ledger before filing",
        "File GSTR-3B after verifying all tables"
      ],
      risksAndNotes: [
        "Interest @ 18% p.a. on late payment of tax (Section 50(1))",
        "Late fee: ₹50/day per Act (₹20 for nil) — max capped periodically via notifications",
        "Non-filing for 2+ months can lead to registration cancellation (Section 29)",
        "GSTR-3B once filed cannot be revised — corrections only through subsequent returns"
      ]
    }
  },
  // ── GSTR-9 Annual Return ──
  {
    keywords: ["gstr-9", "gstr9", "annual return", "gst annual", "yearly return"],
    category: "Returns",
    response: {
      summary: "GSTR-9 is the annual return consolidating all monthly/quarterly returns. Mandatory for regular taxpayers with turnover > ₹2 Crore. GSTR-9C (reconciliation statement) required for turnover > ₹5 Crore.",
      legalReference: "Section 44 of CGST Act. Rule 80. GSTR-9C: Self-certified reconciliation statement (earlier CA certified, now self-certified w.e.f. FY 2020-21). Exempted for turnover ≤ ₹2 Crore (Notification No. 10/2022-CT dated 05.07.2022).",
      practicalInterpretation: "GSTR-9 requires you to report all outward supplies, inward supplies, ITC claimed, ITC reversed, and tax paid — consolidated for the entire financial year. It must reconcile with your audited financial statements. GSTR-9C is a reconciliation between GSTR-9 and audited books.",
      implementationSteps: [
        "Reconcile all 12 GSTR-3B and GSTR-1 returns for the year",
        "Prepare table-wise data: outward supplies, amendments, ITC details",
        "Cross-verify ITC claimed vs GSTR-2B annual summary",
        "Identify and report additional tax liability, if any, in Table 10-11",
        "Pay any additional tax via DRC-03 before filing GSTR-9",
        "For turnover > ₹5 Cr: Prepare GSTR-9C reconciliation with audited financials",
        "File on GST portal before due date (usually 31st December)"
      ],
      risksAndNotes: [
        "Late fee: ₹200/day (₹100 CGST + ₹100 SGST) — max 0.50% of state turnover",
        "GSTR-9 data is used by department for detailed scrutiny and audit selection",
        "Once filed, GSTR-9 cannot be revised",
        "Mismatches between GSTR-9 and books trigger Section 73/74 proceedings"
      ]
    }
  },
  // ── E-Invoice ──
  {
    keywords: ["e-invoice", "einvoice", "e invoice", "irn", "invoice registration"],
    category: "Invoicing",
    response: {
      summary: "E-invoicing is mandatory for B2B supplies for taxpayers with aggregate turnover exceeding ₹5 Crore (w.e.f. 01.08.2023). Each invoice must be registered on the Invoice Registration Portal (IRP) to obtain an IRN.",
      legalReference: "Notification No. 10/2023-CT dated 10.05.2023 (₹5 Cr threshold). Rule 48(4) of CGST Rules. E-invoice schema ver 1.01. Applicable to B2B, B2G, exports, and SEZ supplies. NOT applicable to: SEZ units, insurers, banking companies, NBFCs, GTA, passenger transport, cinema tickets.",
      practicalInterpretation: "Every B2B invoice must be reported to IRP within 30 days of invoice date (w.e.f. 01.11.2023 for turnover > ₹100 Cr). The IRP generates an IRN (Invoice Reference Number) and QR code. The e-invoice auto-populates both GSTR-1 and e-way bill, reducing manual work.",
      implementationSteps: [
        "Check if your aggregate turnover exceeds ₹5 Crore in any FY from 2017-18",
        "Register on e-Invoice Portal (einvoice.gst.gov.in)",
        "Integrate your ERP/billing software with IRP via API or use the portal",
        "Generate IRN for every B2B/export invoice before or at time of supply",
        "Print QR code on the invoice",
        "Verify auto-population in GSTR-1 — review before filing"
      ],
      risksAndNotes: [
        "Invoice without IRN is NOT a valid tax invoice — recipient cannot claim ITC",
        "Penalty: 100% of tax due or ₹10,000, whichever is higher (Section 122)",
        "E-invoice can be cancelled within 24 hours on IRP; after that, only via credit note",
        "30-day reporting time limit applicable for turnover > ₹100 Cr"
      ]
    }
  },
  // ── E-Way Bill ──
  {
    keywords: ["e-way bill", "eway bill", "eway", "movement of goods", "transport"],
    category: "E-Way Bill",
    response: {
      summary: "E-Way Bill is mandatory for movement of goods exceeding ₹50,000 in value. Must be generated before commencement of movement on the e-Way Bill portal.",
      legalReference: "Section 68 of CGST Act read with Rule 138 of CGST Rules. Validity: Up to 200 km — 1 day; every additional 200 km — 1 additional day. Part A: Supply details. Part B: Vehicle/transporter details. Not required for: movement within 50 km (intra-city) in certain cases, goods specified in Rule 138(14).",
      practicalInterpretation: "Generate Part A when invoice is raised. Part B must be filled before goods move. For own vehicle, enter vehicle number. For transporter, enter transporter ID — transporter updates Part B. E-Way bill validity can be extended before expiry.",
      implementationSteps: [
        "Generate E-Way Bill on ewaybillgst.gov.in or via API integration",
        "Fill Part A: GSTIN, invoice details, HSN, value, supply type",
        "Fill Part B: Vehicle number or transporter ID",
        "Print or carry e-Way Bill number during transit",
        "Verify goods reach destination and update status",
        "For multi-vehicle transit, generate consolidated e-Way Bill"
      ],
      risksAndNotes: [
        "Goods moving without valid e-Way Bill: vehicle and goods liable for detention (Section 129)",
        "Penalty: Tax amount + 100% penalty OR ₹25,000, whichever is higher",
        "E-Way bill cannot be edited — only cancelled within 24 hours",
        "State-specific e-Way bill thresholds may apply (check state notifications)"
      ]
    }
  },
  // ── Reverse Charge Mechanism ──
  {
    keywords: ["rcm", "reverse charge", "reverse charge mechanism", "section 9(3)", "section 9(4)", "unregistered supplier"],
    category: "Reverse Charge",
    response: {
      summary: "Under RCM, the recipient pays GST instead of the supplier. Applies to notified services under Section 9(3) and purchases from unregistered persons under Section 9(4) (for specific categories).",
      legalReference: "Section 9(3) CGST Act — notified supplies (GTA, legal services, sponsorship, director services, import of services, etc.). Section 9(4) — currently applicable to specified classes only (Notification No. 07/2019-CT(R)). Notification 13/2017-CT(R) lists all RCM services.",
      practicalInterpretation: "If you receive services from an advocate, GTA (who hasn't opted for forward charge), security agency, or import services, YOU must pay GST under RCM. The good news: ITC on RCM paid is available in the same month's GSTR-3B (cash neutral for regular taxpayers).",
      implementationSteps: [
        "Identify all RCM-applicable inward supplies (check Notification 13/2017-CT(R))",
        "Issue self-invoice for RCM supplies from unregistered persons",
        "Pay RCM tax in cash only (cannot use ITC to pay RCM liability)",
        "Report in GSTR-3B Table 3.1(d) as inward supplies liable to RCM",
        "Claim ITC on RCM paid in Table 4(A)(3) of GSTR-3B",
        "Maintain proper RCM register with supplier details and tax computation"
      ],
      risksAndNotes: [
        "RCM liability MUST be paid through electronic cash ledger — ITC cannot be used",
        "Failure to pay RCM: interest @ 18% + late fee + possible Section 73/74 proceedings",
        "For GTA services: check if GTA has opted for forward charge (12% with ITC)",
        "Import of services always under RCM — even if supplier is registered abroad"
      ]
    }
  },
  // ── Place of Supply ──
  {
    keywords: ["place of supply", "igst", "interstate", "inter-state", "intrastate", "intra-state", "cgst sgst"],
    category: "Place of Supply",
    response: {
      summary: "Place of Supply determines whether a transaction is intra-state (CGST+SGST) or inter-state (IGST). Governed by Sections 10-13 of IGST Act.",
      legalReference: "Section 10 IGST Act — goods (general: location of goods at time of delivery). Section 12 IGST Act — services to registered persons (location of recipient). Section 13 IGST Act — services where supplier or recipient is outside India. Key: Compare Place of Supply with Location of Supplier to determine IGST vs CGST+SGST.",
      practicalInterpretation: "If your business is in Maharashtra and you supply goods delivered in Maharashtra → CGST+SGST. If delivered in Gujarat → IGST. For services to registered persons, place of supply is recipient's location. For services to unregistered persons, it's supplier's location (with exceptions for immovable property, events, etc.).",
      implementationSteps: [
        "For every invoice, determine Place of Supply using IGST Act provisions",
        "Compare with your registration state to decide IGST vs CGST+SGST",
        "For B2B services: Place of Supply = recipient's GSTIN state",
        "For B2C services: Generally supplier's location (exceptions apply)",
        "For immovable property services: Location of property",
        "For goods: Location at time of delivery/movement commencement"
      ],
      risksAndNotes: [
        "Wrong determination leads to wrong tax head — ITC complications for recipient",
        "IGST wrongly paid as CGST+SGST (or vice versa) requires cross-utilization and refund",
        "Bill-to-ship-to transactions need careful analysis (Section 10(1)(b))",
        "Place of supply for software/IT services to foreign clients — Section 13 for export classification"
      ]
    }
  },
  // ── Export & LUT ──
  {
    keywords: ["export", "lut", "letter of undertaking", "zero rated", "refund", "export of service"],
    category: "Exports",
    response: {
      summary: "Exports are zero-rated under GST. Exporters can either export under LUT (without payment of IGST) or pay IGST and claim refund.",
      legalReference: "Section 16 of IGST Act — zero-rated supply. Section 54 CGST Act — refund. Rule 89 — refund application. LUT: Section 16(3)(a) read with Rule 96A. Export of services: Section 2(6) of IGST Act — 5 conditions must be met.",
      practicalInterpretation: "Option 1 (Recommended): File LUT in Form GST RFG-11 and export without paying IGST — claim refund of accumulated ITC. Option 2: Pay IGST on exports and claim IGST refund (auto-processed based on shipping bill). For services: ensure payment is received in convertible foreign exchange within 1 year.",
      implementationSteps: [
        "File LUT on GST portal (Form RFG-11) before first export of the FY",
        "For goods: Export under shipping bill with LUT reference",
        "Report in GSTR-1 Table 6A (exports with payment) or 6B (without payment)",
        "File refund application in Form RFG-01 for unutilized ITC (if LUT route)",
        "For export of services: maintain FIRC/e-BRC as proof of foreign exchange receipt",
        "Ensure all 5 conditions of Section 2(6) IGST Act are met for service exports"
      ],
      risksAndNotes: [
        "LUT facility denied if tax dues > ₹2.5 Lakh (without filing appeal stay)",
        "Export invoices must contain 'Supply Meant for Export on Payment of IGST' or 'under LUT'",
        "Non-receipt of export proceeds within time leads to LUT bond invocation",
        "Refund processing: 90% provisional refund within 7 days of acknowledgment"
      ]
    }
  },
  // ── Composition Scheme ──
  {
    keywords: ["composition", "composition scheme", "section 10", "composite dealer", "composition levy"],
    category: "Registration",
    response: {
      summary: "Composition Scheme under Section 10 allows small taxpayers (turnover up to ₹1.5 Crore for goods, ₹50 Lakhs for services) to pay tax at a flat rate without ITC benefits.",
      legalReference: "Section 10 of CGST Act. Rates: Manufacturers — 1% (0.5% CGST + 0.5% SGST). Traders — 1%. Restaurants — 5%. Service providers (Notification 2/2019-CT(R)) — 6% (3% CGST + 3% SGST) for turnover up to ₹50 Lakhs. Return: GSTR-4 (annual, due 30th April). Quarterly payment via CMP-08.",
      practicalInterpretation: "Ideal for small businesses selling locally with minimal purchases from GST-registered dealers. You cannot collect tax from customers, cannot claim ITC, and cannot make inter-state supplies. You pay a flat percentage on turnover quarterly.",
      implementationSteps: [
        "Verify turnover is within limit (₹1.5 Cr goods / ₹50L services)",
        "Opt in via Form GST CMP-02 on portal (before start of FY or within 30 days of registration)",
        "Issue Bill of Supply (not tax invoice) — cannot charge GST separately",
        "Pay quarterly tax via Form CMP-08 by 18th of month following quarter",
        "File annual return GSTR-4 by 30th April of following year",
        "Mention 'Composition Taxable Person' on every bill and signboard"
      ],
      risksAndNotes: [
        "Cannot make inter-state outward supplies — scheme becomes void",
        "Cannot supply through e-commerce operators",
        "No ITC available — impacts pricing competitiveness",
        "Crossing turnover threshold mid-year: exit composition, switch to regular from date of crossing"
      ]
    }
  },
  // ── Demand & Recovery (Notices) ──
  {
    keywords: ["notice", "demand", "section 73", "section 74", "show cause", "drc-01", "drc-07", "scn", "gst notice"],
    category: "Litigation",
    response: {
      summary: "GST demands are raised under Section 73 (without fraud — 3-year limit) or Section 74 (with fraud/suppression — 5-year limit). Always respond within time to avoid ex-parte orders.",
      legalReference: "Section 73 — demand for tax not paid/short paid without fraud (time limit: 3 years from due date of annual return). Section 74 — with fraud, suppression, misstatement (time limit: 5 years). DRC-01: Show Cause Notice. DRC-01A: Pre-SCN intimation (opportunity to pay). DRC-07: Final demand order. Section 75: General provisions for demand proceedings.",
      practicalInterpretation: "If you receive DRC-01A (intimation), pay the amount with interest to close the matter without SCN. If SCN (DRC-01) is issued, file a detailed written reply within 30 days (extendable). Attend personal hearing. If demand is confirmed (DRC-07), you can appeal within 3 months.",
      implementationSteps: [
        "Upon receiving notice: Verify the DIN (Document Identification Number) on cbic-gst.gov.in",
        "Identify the period, issue, and amount involved",
        "If DRC-01A: Evaluate if payment with interest closes the matter (often advisable)",
        "If SCN (DRC-01): Prepare detailed written reply with documentary evidence",
        "Attend personal hearing — present arguments systematically",
        "If order passed (DRC-07): File appeal within 3 months (Section 107) with 10% pre-deposit",
        "Engage a CA/tax advocate for complex cases"
      ],
      risksAndNotes: [
        "Not responding to SCN leads to ex-parte order — much harder to challenge",
        "Section 74 carries 100% penalty (vs 10% under Section 73 if paid within 30 days of SCN)",
        "Interest runs from due date — accumulates significantly on old periods",
        "Keep all reply submissions and acknowledgments documented"
      ]
    }
  },
  // ── HSN Code ──
  {
    keywords: ["hsn", "hsn code", "sac code", "hsn classification", "goods classification"],
    category: "Classification",
    response: {
      summary: "HSN (Harmonized System of Nomenclature) codes classify goods for GST rate determination. SAC codes classify services. Correct classification is critical for applying the right GST rate.",
      legalReference: "Section 2(68) CGST Act — HSN. Schedule I-IV of CGST Act and Notifications 1/2017-CT(R) for goods rates and 11/2017-CT(R) for services rates. HSN reporting in GSTR-1: 4-digit for turnover ₹1.5-5 Cr; 6-digit for > ₹5 Cr. AAR (Advance Ruling) available for classification disputes under Section 97.",
      practicalInterpretation: "Every product/service must be classified under the correct HSN/SAC code. Wrong classification leads to wrong GST rate, which can result in demand notices. When in doubt, refer to Customs Tariff Act (HSN is derived from it) or apply for Advance Ruling.",
      implementationSteps: [
        "Identify the nature of goods/services being supplied",
        "Refer to GST Rate Schedule (Notification 1/2017-CT(R) for goods)",
        "Cross-verify with Customs Tariff Act Chapter headings",
        "Use GST HSN search tool on cbic-gst.gov.in",
        "Apply 4-digit or 6-digit HSN based on your turnover slab",
        "For ambiguous items, file for Advance Ruling (Section 97-98)"
      ],
      risksAndNotes: [
        "Wrong HSN = wrong rate = demand + interest + penalty",
        "Department can reclassify retrospectively",
        "HSN codes are periodically updated — verify against latest notifications",
        "Maintain HSN-wise summary for GSTR-1 Table 12 and GSTR-9"
      ]
    }
  },
  // ── Interest on Late Payment ──
  {
    keywords: ["interest", "late payment", "section 50", "delayed payment", "interest on gst"],
    category: "Payments",
    response: {
      summary: "Interest under Section 50 is charged at 18% p.a. on late payment of GST and 24% p.a. on wrongly availed and utilized ITC.",
      legalReference: "Section 50(1) — 18% p.a. on tax paid after due date (on net cash liability only, w.e.f. 01.09.2020 retrospectively). Section 50(3) — 24% p.a. on ITC wrongly availed and utilized. Proviso to Section 50(1) clarifies interest is on net tax liability (after adjusting ITC available in electronic credit ledger).",
      practicalInterpretation: "Interest is calculated from the day after the due date until the date of actual payment. Post the retrospective amendment, interest is charged only on the net cash tax liability (not gross liability). So if you had sufficient ITC but didn't file on time, interest is only on the cash portion.",
      implementationSteps: [
        "Calculate the delay period (due date to actual payment date)",
        "Compute interest: Net cash liability × 18% × (days delayed / 365)",
        "For wrongly availed ITC: Amount utilized × 24% × (days / 365)",
        "Pay interest along with tax in the next GSTR-3B",
        "Disclose interest payment in Table 5.1 of GSTR-3B",
        "Maintain interest calculation worksheet for audit trail"
      ],
      risksAndNotes: [
        "Interest is mandatory — cannot be waived by officer",
        "Non-payment of interest is recoverable as arrears under Section 79",
        "Interest on wrongly availed ITC: 24% is punitive — reverse ITC immediately if error found",
        "Retrospective amendment (net liability basis) — cite Retrospective Proviso if old demand raised on gross"
      ]
    }
  },
  // ── Job Work ──
  {
    keywords: ["job work", "job worker", "section 143", "principal manufacturer"],
    category: "Special Cases",
    response: {
      summary: "Job work under GST is governed by Section 143. Goods sent to job worker must be returned within 1 year (inputs) or 3 years (capital goods), failing which it's treated as supply.",
      legalReference: "Section 143 of CGST Act. Section 19 — ITC on goods sent for job work. Rule 45 — conditions. Time limits: Inputs — 1 year; Capital goods — 3 years. ITC available to principal even if goods are at job worker's premises. Job worker's registration: Not mandatory if principal declares in registration.",
      practicalInterpretation: "As a principal manufacturer, you can send goods to a job worker without paying GST (it's not a supply). You maintain ITC on goods sent. The job worker charges GST on job work services (18% generally). If goods aren't returned within time limits, you must pay GST as if it were a supply + interest.",
      implementationSteps: [
        "Maintain a job work register with challan details (Form ITC-04)",
        "Issue delivery challan for goods sent (not tax invoice)",
        "Track return timelines: 1 year for inputs, 3 years for capital goods",
        "File ITC-04 quarterly/annually declaring goods sent and received",
        "Job worker to issue tax invoice for job work charges with GST",
        "If goods not returned within time: Pay GST + interest from date of sending"
      ],
      risksAndNotes: [
        "Failure to return within time = deemed supply — GST + 18% interest from date of issue of challan",
        "ITC-04 non-filing can trigger ITC reversal demands",
        "Job worker supplying directly from their premises needs registration",
        "Scrap generated at job worker's premises — taxable, requires proper documentation"
      ]
    }
  },
  // ── TDS under GST ──
  {
    keywords: ["tds gst", "gst tds", "section 51", "tax deducted at source gst"],
    category: "TDS/TCS",
    response: {
      summary: "TDS under GST (Section 51) requires specified persons (government entities, PSUs, authorities) to deduct 2% GST (1% CGST + 1% SGST or 2% IGST) on payments exceeding ₹2.5 Lakhs to suppliers.",
      legalReference: "Section 51 of CGST Act. Notification 50/2018-CT. Applicable to: Government departments, local authorities, PSUs, entities with 51%+ government equity. Threshold: Contract value > ₹2.5 Lakhs (individual supply value, not aggregate). Return: GSTR-7 (monthly, by 10th of following month).",
      practicalInterpretation: "If you're a supplier to government/PSU, 2% TDS will be deducted from your invoice value (excluding GST). This TDS reflects in your electronic cash ledger and can be used for tax payment. As a deductor, you must file GSTR-7 monthly.",
      implementationSteps: [
        "Deductor: Register for TDS on GST portal (if applicable)",
        "Deduct 2% on payment to supplier (on value excluding GST amount)",
        "Issue TDS certificate to supplier in Form GSTR-7A",
        "File GSTR-7 by 10th of following month",
        "Supplier: Verify TDS credit in electronic cash ledger",
        "Supplier: Use TDS credit for tax payment or claim refund"
      ],
      risksAndNotes: [
        "Non-deduction/late deduction: Interest @ 18% from date of deduction to actual payment",
        "Late filing of GSTR-7: ₹200/day late fee (₹100 CGST + ₹100 SGST)",
        "TDS is deducted on base value, not on GST amount",
        "Incorrectly deducted TDS can be claimed as refund by the deductee"
      ]
    }
  },
  // ── Works Contract ──
  {
    keywords: ["works contract", "construction", "immovable property", "building construction"],
    category: "Special Cases",
    response: {
      summary: "Works contract is treated as supply of service under GST (Schedule II, Para 6(a)). GST rate varies: 18% general, 12% for government works, 5% for affordable housing.",
      legalReference: "Section 2(119) — definition of works contract. Schedule II Para 6(a) — treated as supply of service. Notification 11/2017-CT(R) — service rates. ITC restriction: Section 17(5)(c) — no ITC on works contract for construction of immovable property (except plant & machinery). Section 17(5)(d) — no ITC on goods/services used for construction on own account.",
      practicalInterpretation: "If you're a contractor providing works contract services, you charge GST as a service. However, if you receive works contract services for constructing your own office/building, you CANNOT claim ITC on it. ITC is available only if works contract is for further supply (sub-contracting) or for plant & machinery.",
      implementationSteps: [
        "Classify the works contract — government/private/affordable housing for correct rate",
        "Issue tax invoice as supply of service with applicable GST rate",
        "Contractor: Claim ITC on inputs and input services used for works contract",
        "Recipient: Do NOT claim ITC if works contract is for own immovable property",
        "For sub-contractors: ITC on works contract received is available",
        "Maintain separate records for works contract supplies for annual return"
      ],
      risksAndNotes: [
        "Wrongly claiming ITC on works contract for own building — blocked under Section 17(5)(c)",
        "Classification disputes: whether it's works contract or pure goods supply affects rate",
        "TDS u/s 51 applicable if recipient is government body",
        "Composite supply of works contract — no splitting into goods and services"
      ]
    }
  },
  // ── GST on Rent ──
  {
    keywords: ["rent", "gst on rent", "rental", "commercial rent", "residential rent"],
    category: "Special Cases",
    response: {
      summary: "GST on rent: Commercial property — 18% GST applicable. Residential property — exempt when rented to unregistered person for residential use; taxable @ 18% under RCM when rented to registered person (w.e.f. 18.07.2022).",
      legalReference: "Notification 04/2022-CT(R) dated 13.07.2022. Residential dwelling rented to registered person — 18% under RCM (recipient pays). Notification 12/2017-CT(R) Sr. No. 12 — exempt if residential dwelling rented for residential purpose to unregistered person. Commercial: 18% under forward charge.",
      practicalInterpretation: "If you're a registered business renting a residential property for your employees or as a guest house, YOU pay 18% GST under RCM. If an individual (unregistered) rents a flat for living, no GST. Commercial property rental is always taxable at 18%.",
      implementationSteps: [
        "Determine if property is commercial or residential",
        "Commercial rent: Landlord charges 18% GST on rent invoice",
        "Residential rent to registered person: Tenant pays 18% under RCM",
        "Residential rent to unregistered person for living: Exempt — no GST",
        "RCM on residential rent: Report in GSTR-3B Table 3.1(d), claim ITC in Table 4",
        "Landlord with turnover > threshold: Must register and charge GST on commercial rent"
      ],
      risksAndNotes: [
        "Many businesses miss RCM on residential rent — common audit finding post July 2022",
        "ITC on rent paid for commercial property is available to tenant",
        "ITC on RCM paid on residential rent is also available",
        "Landlord providing commercial rent must register if threshold exceeded"
      ]
    }
  },
  // ── ITC Reversal Rule 42/43 ──
  {
    keywords: ["rule 42", "rule 43", "itc reversal", "common credit", "proportionate itc", "exempt supply reversal"],
    category: "Input Tax Credit",
    response: {
      summary: "Rule 42 governs ITC reversal for inputs/input services used for both taxable and exempt supplies. Rule 43 governs ITC reversal for capital goods used commonly.",
      legalReference: "Rule 42 of CGST Rules — reversal formula for inputs and input services. Rule 43 — for capital goods. Formula: Common ITC × (Exempt turnover / Total turnover) = ITC to be reversed. 'Exempt turnover' includes nil-rated, exempt, and non-GST supplies. Must be computed monthly and finalized annually.",
      practicalInterpretation: "If your business makes both taxable and exempt supplies, you cannot claim 100% ITC. You must reverse ITC proportional to exempt supplies. Calculate monthly, aggregate annually, and adjust in the annual return. Capital goods reversal is over 5 years (60 months).",
      implementationSteps: [
        "Segregate ITC into: (a) exclusively for taxable, (b) exclusively for exempt, (c) common",
        "For common ITC: Apply Rule 42 formula monthly",
        "Reversed amount = Common ITC × (Exempt turnover / Total turnover)",
        "Report reversal in GSTR-3B Table 4(B)",
        "At year end: Recalculate using annual turnover figures",
        "Adjust difference (excess reversal = reclaim; short reversal = pay with interest)",
        "For capital goods: Apply Rule 43 — useful life of 5 years, monthly reversal"
      ],
      risksAndNotes: [
        "Non-reversal of Rule 42/43 is a major audit red flag",
        "Include interest from trading income in exempt turnover for reversal calculation",
        "Annual recalculation often results in additional reversal — plan cash flow",
        "Banking/financial sector has special Rule 42 computation methodology"
      ]
    }
  },
  // ── GST Refund ──
  {
    keywords: ["refund", "gst refund", "refund application", "excess payment", "accumulated itc refund"],
    category: "Refunds",
    response: {
      summary: "GST refund can be claimed under Section 54 for: excess tax paid, accumulated ITC due to inverted duty structure, exports, deemed exports, and other specified scenarios.",
      legalReference: "Section 54 of CGST Act. Rule 89 — refund application procedure. Form RFD-01. Time limit: 2 years from relevant date (Section 54(1)). Refund types: (a) Export with IGST payment — auto via shipping bill. (b) Export under LUT — accumulated ITC refund. (c) Inverted duty structure — formula in Rule 89(5). (d) Excess cash ledger balance.",
      practicalInterpretation: "Apply for refund on GST portal using RFD-01 with supporting documents. For exports with IGST, refund is auto-processed (IGST refund route via ICEGATE). For ITC accumulation due to inverted structure, use the formula: Max Refund = (Turnover of inverted rated supply / Adjusted total turnover) × Net ITC − Tax payable on inverted supply.",
      implementationSteps: [
        "Identify refund category and gather supporting documents",
        "File RFD-01 on GST portal with Statement 3A/3B (for ITC refund)",
        "For exports: Ensure shipping bills match GSTR-1 Table 6A",
        "For inverted duty: Compute maximum refund using Rule 89(5) formula",
        "Officer issues acknowledgment (RFD-02) or deficiency memo (RFD-03)",
        "Provisional refund (90%) within 7 days for exports",
        "Final order within 60 days of application"
      ],
      risksAndNotes: [
        "2-year limitation period — file within time to preserve rights",
        "Inverted duty refund NOT available for services (Section 54(3) proviso)",
        "Refund of compensation cess — separate application required",
        "Common rejection reasons: mismatch with GSTR-1/3B, incomplete documents, BRC not available"
      ]
    }
  },
  // ── Penalties under GST ──
  {
    keywords: ["penalty", "section 122", "gst penalty", "fine", "prosecution"],
    category: "Penalties",
    response: {
      summary: "GST penalties range from ₹10,000 to 100% of tax amount depending on the nature of offense. Section 122 covers general penalties, Section 132 covers criminal prosecution for serious offenses.",
      legalReference: "Section 122 — general penalties for various offenses (minimum ₹10,000 or tax amount). Section 123 — failure to furnish information. Section 125 — general penalty ₹25,000 for residual offenses. Section 132 — cognizable offenses: tax evasion > ₹5 Cr (now ₹2 Cr per Finance Act 2024 amendment), fake invoices, etc. — imprisonment up to 5 years.",
      practicalInterpretation: "Most common penalties: late filing fees (₹50/day per act), interest on late payment (18%), wrong ITC claims (100% of ITC + interest). For serious offenses like issuing fake invoices or tax evasion above threshold, criminal prosecution with imprisonment is possible.",
      implementationSteps: [
        "Identify the nature of default and applicable section",
        "For late filing: Pay late fee as auto-computed in GSTR-3B",
        "For wrong ITC: Reverse immediately with 24% interest to minimize penalty",
        "For demand orders: Pay within 30 days of SCN (Section 73) for reduced 10% penalty",
        "For Section 74 cases: If paid within 30 days of SCN, penalty reduced to 15%",
        "Consult tax advocate for criminal prosecution cases"
      ],
      risksAndNotes: [
        "Voluntary disclosure before notice reduces penalty significantly",
        "Section 73: 10% penalty if paid within 30 days of SCN / before order",
        "Section 74: 15% penalty if paid within 30 days of SCN",
        "Criminal prosecution for tax evasion > ₹2 Cr — bail provisions apply",
        "Directors / partners can be held personally liable for company's GST offenses"
      ]
    }
  },
  // ── General greeting / help ──
  {
    keywords: ["hello", "hi", "help", "what can you do", "assist", "start"],
    category: "General",
    response: {
      summary: "I am the Kota Associates GST Expert System — a CA-grade GST advisory engine trained on the complete Indian GST law framework.",
      legalReference: "CGST Act 2017, IGST Act 2017, SGST Acts, UTGST Act, GST Rules 2017, and all applicable notifications, circulars, and advance rulings.",
      practicalInterpretation: "I can help you with: GST registration, return filing (GSTR-1, 3B, 9), ITC claims and reversals, e-invoicing, e-way bills, RCM, exports, place of supply, demands & notices, refunds, penalties, and all special cases like works contract, job work, and compositions scheme.",
      implementationSteps: [
        "Ask me any GST question — I'll provide section-accurate answers",
        "I cover: Registration, Returns, ITC, Invoicing, Payments, Refunds, Litigation",
        "For complex queries, I'll provide step-by-step implementation guidance",
        "All responses include legal references, practical interpretation, and risk notes"
      ],
      risksAndNotes: [
        "For client-specific matters involving significant tax liability, always verify with a practicing CA",
        "GST law is frequently amended — I reference the latest available amendments",
        "Advance Ruling (Section 97-98) is recommended for ambiguous classification questions"
      ]
    }
  }
];

// Fallback for unmatched queries
const defaultResponse: GSTResponse = {
  summary: "Your query requires specific analysis. Based on the information provided, here is general guidance under GST law.",
  legalReference: "Please provide more details about your specific scenario so I can cite the exact sections, rules, and notifications applicable to your case under CGST Act 2017, IGST Act 2017, and GST Rules 2017.",
  practicalInterpretation: "For accurate GST advice, specify: (1) Nature of supply — goods or services, (2) Whether inter-state or intra-state, (3) Registration status of parties involved, (4) Specific transaction details. This helps in determining the correct legal treatment.",
  implementationSteps: [
    "Describe your specific GST query with transaction details",
    "Mention the section or topic area (ITC, registration, returns, etc.)",
    "For complex matters, consult with Kota Associates' GST experts",
    "Book a consultation: WhatsApp +91 90528 78779"
  ],
  risksAndNotes: [
    "Generic advice may not cover your specific scenario — always verify",
    "GST law has numerous exceptions and provisos — context matters",
    "For matters involving significant tax liability, professional review is recommended",
    "Contact Kota Associates for personalized, legally defensible GST advisory"
  ]
};

export function getGSTExpertResponse(input: string): GSTResponse {
  const lower = input.toLowerCase().trim();
  
  // Score each entry by keyword matches
  let bestMatch: GSTKnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of gstKnowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(" ").length; // multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }
  return defaultResponse;
}

export function formatGSTResponse(res: GSTResponse): string {
  let output = "";
  output += `✅ **Answer Summary**\n${res.summary}\n\n`;
  output += `📜 **Legal Reference**\n${res.legalReference}\n\n`;
  output += `🧾 **Practical Interpretation**\n${res.practicalInterpretation}\n\n`;
  output += `🛠 **Implementation Steps**\n`;
  res.implementationSteps.forEach((step, i) => {
    output += `${i + 1}. ${step}\n`;
  });
  output += `\n⚠️ **Risks & Notes**\n`;
  res.risksAndNotes.forEach((note) => {
    output += `• ${note}\n`;
  });
  return output;
}

export const gstQuickQueries = [
  { label: "Can I claim ITC on car purchase?", icon: "🚗" },
  { label: "GSTR-3B filing process", icon: "📋" },
  { label: "E-invoice requirements", icon: "🧾" },
  { label: "Reverse Charge Mechanism", icon: "🔄" },
  { label: "Export under LUT", icon: "🌍" },
  { label: "GST on rent", icon: "🏢" },
  { label: "ITC reversal Rule 42/43", icon: "📊" },
  { label: "GST notice handling", icon: "⚖️" },
  { label: "Place of Supply rules", icon: "📍" },
  { label: "GST refund process", icon: "💰" },
  { label: "Composition Scheme", icon: "🏪" },
  { label: "Works contract GST", icon: "🏗️" },
];
