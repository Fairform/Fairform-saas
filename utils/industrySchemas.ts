// utils/industrySchemas.ts
export const industrySchemas: Record<string, any> = {
  construction: {
    industry: 'Construction & Trades',
    description: 'Comprehensive compliance documents for construction and trade businesses',
    documents: [
      'SWMS (Safe Work Method Statement)',
      'JSA (Job Safety Analysis)', 
      'Hazard Register & Risk Matrix',
      'PPE Checklist',
      'Toolbox Talk Template',
      'Equipment Maintenance Log',
      'Incident Report Form',
      'Emergency Response Plan',
      'Construction/Building Contract',
      'Terms & Conditions for Services',
      'Contractor & Subcontractor Agreements',
      'NDA (Non-Disclosure Agreement)',
      'Employment Agreements & Staff Handbook',
      'Privacy Policy',
      'WHS Procedure',
      'Insurance Certificates'
    ]
  },
  ndis: {
    industry: 'NDIS Providers',
    description: 'Specialized documentation for NDIS service providers',
    documents: [
      'Service Agreements',
      'Incident Management Policy + Forms',
      'Risk Management Policy + Register',
      'Complaints Handling Policy + Log',
      'Participant Rights & Privacy Policy',
      'Worker Screening & NDIS Check Register',
      'Emergency & Disaster Plan',
      'Staff Code of Conduct & Training Log',
      'Safeguarding Children Policy',
      'Consent & Authority Forms',
      'Employment Agreements',
      'Staff Handbook',
      'Internal NDA',
      'Insurance Certificates'
    ]
  },
  // Add other industries as needed...
  general: {
    industry: 'General Small Business',
    description: 'Essential business documents for any small business',
    documents: [
      'Employment Agreements',
      'Privacy Policy',
      'Terms & Conditions',
      'Workplace Safety Procedure',
      'NDA Templates',
      'Insurance Certificates'
    ]
  }
};

export const getIndustrySchema = (industry: string) => {
  return industrySchemas[industry] || null;
};