export type CatalogDoc = {
  id: string;
  title: string;
  description: string;
  inLite?: boolean;
};

export type PackDefinition = {
  id: string;
  label: string;
  price: number;
  formats: string[];
  includes: "subset" | "all" | "all-plus-extras";
};

export type IndustryPack = {
  label: string;
  packs: PackDefinition[];
};

export const INDUSTRY_PACKS: Record<string, IndustryPack> = {
  "construction-trades": {
    label: "Construction & Trades",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" },
      { id: "construction-full", label: "Construction Compliance Pack", price: 349, formats: ["pdf", "docx"], includes: "all-plus-extras" }
    ]
  },
  "ndis": {
    label: "NDIS Providers",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" },
      { id: "ndis-full", label: "NDIS Compliance Pack", price: 349, formats: ["pdf", "docx"], includes: "all-plus-extras" }
    ]
  },
  "childcare": {
    label: "Childcare & Education",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "cleaning-services": {
    label: "Cleaning Services",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "fitness-gyms": {
    label: "Fitness Studios & Gyms",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "beauty-personal-care": {
    label: "Beauty & Personal Care",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "hospitality": {
    label: "Hospitality",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "health-services": {
    label: "Health Services",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "retail-ecommerce": {
    label: "Retail & E-Commerce",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "freelancers-coaches": {
    label: "Freelancers & Coaches",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  },
  "small-business": {
    label: "Generic Small Business Essentials",
    packs: [
      { id: "lite", label: "Lite Pack", price: 79, formats: ["pdf"], includes: "subset" },
      { id: "pro", label: "Pro Pack", price: 189, formats: ["pdf", "docx"], includes: "all" }
    ]
  }
};

export const DOCUMENT_CATALOG: Record<string, CatalogDoc[]> = {
  "construction-trades": [
    { id: "whs-policy", title: "Work Health and Safety Policy", description: "Top level WHS policy covering responsibilities, consultation, and continuous improvement.", inLite: true },
    { id: "risk-assessment", title: "Risk Assessment Template", description: "Hazard identification, risk rating, and control measures.", inLite: true },
    { id: "incident-reporting", title: "Incident Reporting Procedure", description: "Investigation, notification, and corrective actions.", inLite: true },
    { id: "induction-checklist", title: "Site Induction Checklist", description: "Safety briefing and competency verification.", inLite: true },
    { id: "ppe-policy", title: "Personal Protective Equipment Policy", description: "Selection, use, maintenance, and training.", inLite: true },
    { id: "emergency-procedures", title: "Emergency Response Plan", description: "Evacuation, first aid, and emergency contacts." },
    { id: "contractor-management", title: "Contractor Management Procedure", description: "Prequalification, induction, and monitoring." },
    { id: "plant-equipment", title: "Plant and Equipment Register", description: "Inspection, maintenance, and operator competency." },
    { id: "hazardous-substances", title: "Hazardous Substances Register", description: "SDS management and exposure controls." },
    { id: "consultation-committee", title: "Health and Safety Committee Charter", description: "Structure, roles, and meeting procedures." },
    { id: "training-matrix", title: "Training and Competency Matrix", description: "Skills assessment and refresher schedules." },
    { id: "toolbox-talks", title: "Toolbox Talk Templates", description: "Weekly safety topics and sign off sheets." },
    { id: "confined-spaces", title: "Confined Space Entry Procedure", description: "Permits, atmospheric testing, and rescue." },
    { id: "working-heights", title: "Working at Heights Procedure", description: "Fall protection and rescue plans." },
    { id: "manual-handling", title: "Manual Handling Assessment", description: "Lifting techniques and mechanical aids." },
    { id: "noise-vibration", title: "Noise and Vibration Management", description: "Monitoring and health surveillance." }
  ],
  "ndis": [
    { id: "quality-assurance", title: "Quality Assurance Policy", description: "NDIS Quality Framework compliance and continuous improvement.", inLite: true },
    { id: "participant-rights", title: "Participant Rights and Choice Policy", description: "Dignity, respect, and self-determination principles.", inLite: true },
    { id: "incident-management", title: "Incident Management Procedure", description: "Reporting, investigation, and NDIS Commission notification.", inLite: true },
    { id: "safeguarding-policy", title: "Safeguarding and Protection Policy", description: "Abuse prevention, detection, and response.", inLite: true },
    { id: "service-agreement", title: "Participant Service Agreement Template", description: "Goals, supports, and service delivery terms.", inLite: true },
    { id: "complaints-feedback", title: "Complaints and Feedback Procedure", description: "Resolution process and external advocacy." },
    { id: "restrictive-practices", title: "Restrictive Practices Governance", description: "Approval, monitoring, and reduction strategies." },
    { id: "medication-management", title: "Medication Management Procedure", description: "Administration, storage, and documentation." },
    { id: "personal-care", title: "Personal Care and Intimate Support", description: "Privacy, dignity, and consent protocols." },
    { id: "transport-policy", title: "Participant Transport Policy", description: "Vehicle safety and driver requirements." },
    { id: "cultural-safety", title: "Cultural Safety and Inclusion", description: "Aboriginal, CALD, and LGBTI+ support." },
    { id: "worker-screening", title: "Worker Screening and Suitability", description: "Background checks and ongoing monitoring." },
    { id: "capacity-building", title: "Capacity Building and Skill Development", description: "Goal setting and progress measurement." },
    { id: "community-participation", title: "Community Participation Support", description: "Social inclusion and networking." },
    { id: "behaviour-support", title: "Positive Behaviour Support Plan", description: "Functional assessment and intervention strategies." },
    { id: "emergency-management", title: "Emergency and Evacuation Procedures", description: "Participant specific emergency plans." }
  ],
  "childcare": [
    { id: "child-protection", title: "Child Protection Policy", description: "Mandatory reporting, risk assessment, and staff training.", inLite: true },
    { id: "supervision-policy", title: "Supervision and Ratios Policy", description: "Adult to child ratios and active supervision.", inLite: true },
    { id: "behaviour-guidance", title: "Behaviour Guidance Policy", description: "Positive guidance strategies and prohibited practices.", inLite: true },
    { id: "health-hygiene", title: "Health and Hygiene Procedures", description: "Illness exclusion, medication, and infection control.", inLite: true },
    { id: "nutrition-food", title: "Nutrition and Food Safety Policy", description: "Menu planning, allergies, and kitchen hygiene.", inLite: true },
    { id: "emergency-evacuation", title: "Emergency and Evacuation Procedures", description: "Drills, lockdown, and parent notification." },
    { id: "excursion-policy", title: "Excursion and Transport Policy", description: "Risk assessment, supervision, and authorisation." },
    { id: "enrolment-orientation", title: "Enrolment and Orientation Procedure", description: "Family information and settling in process." },
    { id: "programming-planning", title: "Educational Program and Planning", description: "Learning outcomes and documentation." },
    { id: "family-communication", title: "Family Communication and Partnerships", description: "Daily communication and feedback." },
    { id: "staff-qualifications", title: "Staffing and Qualifications Policy", description: "Educator requirements and professional development." },
    { id: "sun-protection", title: "Sun Protection Policy", description: "Shade, clothing, and sunscreen procedures." },
    { id: "water-safety", title: "Water Safety and Swimming Policy", description: "Supervision ratios and safety equipment." },
    { id: "sleep-rest", title: "Sleep and Rest Policy", description: "Safe sleeping practices and SIDS prevention." },
    { id: "inclusion-diversity", title: "Inclusion and Diversity Policy", description: "Additional needs support and cultural respect." },
    { id: "grievance-complaints", title: "Grievance and Complaints Procedure", description: "Family concerns and resolution process." }
  ],
  "cleaning-services": [
    { id: "chemical-handling", title: "Chemical Handling and SDS Procedure", description: "Decanting, labelling, and PPE.", inLite: true },
    { id: "infection-control", title: "Infection Control Procedure", description: "Zones, contact times, and logs.", inLite: true },
    { id: "site-risk-assessment", title: "Site Risk Assessment Template", description: "Hazard matrix and controls.", inLite: true },
    { id: "equipment-maintenance", title: "Equipment Maintenance Register", description: "PAT test, servicing, and repairs.", inLite: true },
    { id: "client-scope-worksheet", title: "Client Scope and Specification Worksheet", description: "Frequency, consumables, KPIs." },
    { id: "quality-audit-checklist", title: "Quality Audit Checklist", description: "Scored audits and corrective actions." },
    { id: "incident-form-cleaning", title: "Incident and Near Miss Form", description: "Investigation and corrective actions." },
    { id: "sharps-procedure", title: "Sharps and Biohazard Procedure", description: "Containment and disposal." },
    { id: "waste-management", title: "Waste Management Procedure", description: "Segregation and disposal." },
    { id: "emergency-procedure", title: "Emergency Procedures", description: "Spills, fire, first aid." },
    { id: "contractor-mgmt", title: "Contractor Management Procedure", description: "Induction and supervision." },
    { id: "uniform-ppe", title: "Uniform and PPE Policy", description: "Standards and replacement." },
    { id: "client-feedback-log", title: "Client Feedback and Complaints Log", description: "Capture and resolution." },
    { id: "schedule-checklist", title: "Site Cleaning Schedule Checklist", description: "Daily and periodic tasks." },
    { id: "security-access", title: "Security and Access Procedure", description: "Keys, codes, and privacy." },
    { id: "mobile-safety", title: "Lone and Mobile Work Safety", description: "Check in and escalation." },
    { id: "carpet-hardfloor", title: "Carpet and Hard Floor Care SOP", description: "Methods and controls." }
  ],
  "fitness-gyms": [
    { id: "client-screening", title: "Client Screening and PAR-Q", description: "Health questionnaire and clearance.", inLite: true },
    { id: "informed-consent", title: "Informed Consent and Waiver", description: "Risks, benefits, and agreement.", inLite: true },
    { id: "emergency-response-fitness", title: "Emergency Response Plan", description: "AED, first aid, incident steps.", inLite: true },
    { id: "equipment-maintenance-fitness", title: "Equipment Maintenance Register", description: "Inspection and service logs.", inLite: true },
    { id: "cleaning-disinfection-fitness", title: "Cleaning and Disinfection Schedule", description: "High touch surfaces and frequency.", inLite: true },
    { id: "staff-qualifications", title: "Staff Qualifications and CPD Matrix", description: "Cert III, Cert IV, First Aid." },
    { id: "class-operations", title: "Class Operations SOP", description: "Capacity, induction, and safety briefing." },
    { id: "youth-policy", title: "Youth Participation and Supervision Policy", description: "Parental consent and ratios." },
    { id: "incident-injury-fitness", title: "Incident and Injury Form", description: "Investigation and actions." },
    { id: "membership-terms", title: "Membership Terms and Cancellations", description: "Billing cycles and cooling off." },
    { id: "privacy-data-fitness", title: "Privacy and Data Handling", description: "Member data and security." },
    { id: "marketing-consent", title: "Marketing Consent and Media Release", description: "Photo and video permissions." },
    { id: "contractor-coach", title: "Contractor and Coach Agreement", description: "Scope, safety, and insurance." },
    { id: "facility-checklist", title: "Daily Facility Safety Checklist", description: "Open and close checks." },
    { id: "heat-hydration", title: "Heat and Hydration SOP", description: "Risk management for heat." },
    { id: "pandemic-response", title: "Communicable Disease and Pandemic Response", description: "Precautions and closures." }
  ],
  "beauty-personal-care": [
    { id: "infection-control-beauty", title: "Infection Control Policy", description: "Hand hygiene, sterilisation, and barriers.", inLite: true },
    { id: "skin-penetration", title: "Skin Penetration and Sterilisation Procedure", description: "Autoclave logs and validation.", inLite: true },
    { id: "client-consultation", title: "Client Consultation and Consent", description: "Contraindications and signatures.", inLite: true },
    { id: "aftercare-instructions", title: "Aftercare Instruction Sheets", description: "Per treatment aftercare.", inLite: true },
    { id: "allergen-chemical", title: "Allergen and Chemical Safety", description: "Patch tests and SDS.", inLite: true },
    { id: "cosmetic-injectables", title: "Cosmetic Injectables Governance", description: "Scope, delegation, and adverse event response." },
    { id: "laser-safety", title: "Laser and IPL Safety Procedure", description: "Eye protection and signage." },
    { id: "equipment-maintenance-beauty", title: "Equipment Maintenance and Calibration", description: "Logs and service records." },
    { id: "incident-adverse", title: "Incident and Adverse Event Form", description: "Documentation and follow up." },
    { id: "client-privacy-beauty", title: "Client Privacy and Records", description: "Retention and access." },
    { id: "sharps-disposal", title: "Sharps and Clinical Waste Procedure", description: "Bins, storage, and disposal." },
    { id: "complaints-beauty", title: "Complaints and Refunds Procedure", description: "Resolution and consumer law." },
    { id: "consumables-register", title: "Consumables and Stock Register", description: "Batch tracking and expiry." },
    { id: "practitioner-credentials", title: "Practitioner Credentials and CPD", description: "Registration and checks." },
    { id: "environmental-cleaning", title: "Environmental Cleaning Checklist", description: "Room turnover and changeover." },
    { id: "marketing-claims", title: "Marketing Claims and Before After Policy", description: "Evidence standards and consent." }
  ],
  "hospitality": [
    { id: "food-safety-program", title: "Food Safety Program", description: "Processes and controls for safe food.", inLite: true },
    { id: "haccp-plan", title: "HACCP Plan", description: "Hazards, CCPs, limits, and monitoring.", inLite: true },
    { id: "allergen-management", title: "Allergen Management Procedure", description: "Cross contact controls and training.", inLite: true },
    { id: "cleaning-sanitising", title: "Cleaning and Sanitising Schedule", description: "Equipment and surfaces.", inLite: true },
    { id: "temperature-logs", title: "Temperature Control Logs", description: "Delivery, storage, cooking, cooling.", inLite: true },
    { id: "supplier-approval", title: "Approved Supplier List and Verification", description: "Checks and documentation." },
    { id: "pest-control", title: "Pest Control Procedure and Records", description: "Contractor visits and findings." },
    { id: "personal-hygiene", title: "Personal Hygiene Policy", description: "Hand washing and illness reporting." },
    { id: "recall-withdrawal", title: "Product Recall and Withdrawal Procedure", description: "Triggers and communications." },
    { id: "waste-management-hosp", title: "Waste Management Procedure", description: "Disposal and recycling." },
    { id: "equipment-maintenance-hosp", title: "Equipment Maintenance Register", description: "Servicing and calibration." },
    { id: "alcohol-service", title: "Responsible Service of Alcohol Policy", description: "RSA checks and refusals." },
    { id: "incident-form-hosp", title: "Incident and Customer Complaint Form", description: "Recording and resolutions." },
    { id: "emergency-response-hosp", title: "Emergency Response Plan", description: "Evacuation and contacts." },
    { id: "delivery-takeaway", title: "Delivery and Takeaway Food Safety", description: "Packaging and temperature control." },
    { id: "staff-training-matrix-hosp", title: "Staff Training Matrix", description: "Food handler skills and refreshers." }
  ],
  "health-services": [
    { id: "clinical-governance", title: "Clinical Governance Framework", description: "Roles, committees, and oversight.", inLite: true },
    { id: "consent-policy", title: "Informed Consent Policy and Forms", description: "Capacity and documentation.", inLite: true },
    { id: "privacy-health", title: "Privacy and Health Records", description: "Confidentiality and access.", inLite: true },
    { id: "infection-prevention-health", title: "Infection Prevention and Control", description: "Standard and transmission based precautions.", inLite: true },
    { id: "medication-safety", title: "Medication Safety Procedure", description: "Prescribing, dispensing, and administration.", inLite: true },
    { id: "adverse-events", title: "Adverse Event and Incident Management", description: "Reporting and learning." },
    { id: "emergency-preparedness", title: "Emergency Preparedness and Response", description: "Codes and drills." },
    { id: "scope-credentialing", title: "Scope of Practice and Credentialing", description: "Verification and review." },
    { id: "handover-communication", title: "Clinical Handover and Communication", description: "SBAR and escalation." },
    { id: "device-maintenance", title: "Medical Device Maintenance and Calibration", description: "Registers and schedules." },
    { id: "records-retention-health", title: "Records Management and Retention", description: "Retention and disposal." },
    { id: "complaints-health", title: "Complaints and Feedback", description: "Consumer rights and responses." },
    { id: "telehealth", title: "Telehealth Governance", description: "Security and consent." },
    { id: "radiation-laser-health", title: "Radiation and Laser Safety", description: "Licensing and controls." },
    { id: "cultural-safety-health", title: "Cultural Safety and Accessibility", description: "Interpreter access and inclusion." },
    { id: "quality-improvement", title: "Quality Improvement Plan and Register", description: "Audits and actions." }
  ],
  "retail-ecommerce": [
    { id: "privacy-policy-retail", title: "Privacy Policy", description: "Data collection, cookies, and rights.", inLite: true },
    { id: "data-security", title: "Data Security and Access Controls", description: "Passwords, MFA, and roles.", inLite: true },
    { id: "refund-returns", title: "Refunds and Returns Policy", description: "Consumer law compliance.", inLite: true },
    { id: "shipping-fulfilment", title: "Shipping and Fulfilment Policy", description: "Carriers, times, and liabilities.", inLite: true },
    { id: "terms-of-sale", title: "Terms of Sale", description: "Offer, acceptance, and payment.", inLite: true },
    { id: "complaints-customer", title: "Customer Complaints Procedure", description: "Handling and resolution." },
    { id: "product-safety", title: "Product Safety and Recalls", description: "Standards and recall steps." },
    { id: "marketing-comms", title: "Marketing Communications and Consent", description: "Email and SMS consent." },
    { id: "supplier-quality", title: "Supplier Quality and Ethics Policy", description: "Sourcing standards and audits." },
    { id: "whs-retail", title: "Workplace Safety Policy", description: "Store hazards and controls." },
    { id: "cash-handling", title: "Cash Handling and Reconciliation", description: "Controls and exceptions." },
    { id: "anti-theft", title: "Loss Prevention and Anti Theft SOP", description: "CCTV, checks, and reporting." },
    { id: "accessibility-web", title: "Website Accessibility Statement", description: "WCAG commitments." },
    { id: "cookie-policy", title: "Cookie Policy", description: "Types, purpose, and choices." },
    { id: "data-retention", title: "Data Retention Schedule", description: "Durations and deletion." },
    { id: "third-party-marketplaces", title: "Marketplace and Platform Policy", description: "Listings and compliance." }
  ],
  "freelancers-coaches": [
    { id: "client-agreement", title: "Client Services Agreement", description: "Scope, payment, IP, and term.", inLite: true },
    { id: "scope-of-work", title: "Scope of Work Template", description: "Deliverables, milestones, and acceptance.", inLite: true },
    { id: "privacy-freelance", title: "Privacy and Confidentiality", description: "Data handling and NDA.", inLite: true },
    { id: "complaints-freelance", title: "Complaints and Dispute Resolution", description: "Process and timelines.", inLite: true },
    { id: "code-of-conduct", title: "Professional Code of Conduct", description: "Ethics and boundaries.", inLite: true },
    { id: "risk-assessment-freelance", title: "Work Health and Safety Risk Assessment", description: "Client sites and remote work." },
    { id: "insurance-proof", title: "Insurance and Credentials Register", description: "Certificates and dates." },
    { id: "marketing-use", title: "Marketing Consent and Case Studies Policy", description: "Attribution and permissions." },
    { id: "data-security-freelance", title: "Information Security Basics", description: "Passwords, storage, backups." },
    { id: "invoicing-policy", title: "Invoicing and Collections Policy", description: "Payment terms and follow up." },
    { id: "refund-cancellation", title: "Refunds and Cancellations Policy", description: "Conditions and process." },
    { id: "records-retention-freelance", title: "Records and Retention", description: "Durations and disposal." },
    { id: "subcontractor-terms", title: "Subcontractor Terms", description: "Flow down clauses and safety." },
    { id: "brand-guidelines", title: "Brand and Communications Guidelines", description: "Voice and approvals." }
  ],
  "small-business": [
    { id: "code-of-conduct-smb", title: "Code of Conduct", description: "Values, behaviour, and conflicts.", inLite: true },
    { id: "privacy-policy-smb", title: "Privacy Policy", description: "Collection, use, and rights.", inLite: true },
    { id: "information-security", title: "Information Security Policy", description: "Access, MFA, and incident response.", inLite: true },
    { id: "whs-policy-smb", title: "Work Health and Safety Policy", description: "Responsibilities and consultation.", inLite: true },
    { id: "risk-management-smb", title: "Risk Management Procedure", description: "Identification and controls.", inLite: true },
    { id: "incident-management-smb", title: "Incident and Near Miss Procedure", description: "Reporting and corrective actions.", inLite: true },
    { id: "emergency-plan-smb", title: "Emergency and Business Continuity Plan", description: "Response and recovery." },
    { id: "hr-policy-pack", title: "Human Resources Policy Pack", description: "Leave, performance, and discipline." },
    { id: "anti-bullying", title: "Anti Bullying Harassment and EEO", description: "Standards and complaints." },
    { id: "remote-work", title: "Remote and Flexible Work Policy", description: "Ergonomics and security." },
    { id: "records-retention-smb", title: "Records Management and Retention", description: "Durations and disposal." },
    { id: "supplier-ethics-smb", title: "Supplier and Procurement Policy", description: "Conflicts and modern slavery." },
    { id: "environment-sustainability", title: "Environment and Sustainability Policy", description: "Waste and energy." },
    { id: "customer-complaints-smb", title: "Customer Complaints Procedure", description: "Channels and SLAs." },
    { id: "fraud-anti-bribery", title: "Fraud and Anti Bribery Policy", description: "Controls and reporting." },
    { id: "data-breach-response", title: "Data Breach Response Plan", description: "Assessment and notification." }
  ]
};

export function getDocumentsForPack(industryId: string, packId: string): CatalogDoc[] {
  const industry = INDUSTRY_PACKS[industryId];
  const pack = industry?.packs.find(p => p.id === packId);
  const documents = DOCUMENT_CATALOG[industryId] || [];
  
  if (!pack) return [];
  
  switch (pack.includes) {
    case "subset":
      return documents.filter(doc => doc.inLite);
    case "all":
      return documents;
    case "all-plus-extras":
      return documents;
    default:
      return [];
  }
}

export function getTemplatePath(industryId: string, docId: string): string {
  return `templates/blocks/${industryId}/${docId}.mdx`;
}

export function validateIndustryPack(industryId: string, packId: string): boolean {
  const industry = INDUSTRY_PACKS[industryId];
  if (!industry) return false;
  return industry.packs.some(pack => pack.id === packId);
}

export function getCatalogStats() {
  const industries = Object.keys(INDUSTRY_PACKS).length;
  const totalDocuments = Object.values(DOCUMENT_CATALOG).reduce((sum, docs) => sum + docs.length, 0);
  const liteDocuments = Object.values(DOCUMENT_CATALOG).reduce((sum, docs) => sum + docs.filter(doc => doc.inLite).length, 0);
  
  return {
    industries,
    totalDocuments,
    liteDocuments,
    proDocuments: totalDocuments - liteDocuments
  };
}
