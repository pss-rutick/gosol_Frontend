export const clientDetailsData = {
  // Navigation & UI Text
  pageTitle: {
    backButton: 'Back to Dashboard',
    overview: 'Overview',
    history: 'History',
    documents: 'Documents'
  },
  tabs: ['Overview', 'History', 'Documents'],
  actions: {
    meeting: 'Start Meeting',
    call: 'Make Call',
    mail: 'Send Mail',
    more: 'Actions'
  },

  // Header User Data
  mockUser: {
    id: 'CUST10001',
    name: 'Robert Chen',
    role: 'Investment Property Consultation',
    email: 'robertchen123@gmail.com',
    phone: '(+61) 412 345 678',
  },

  // SECTION 1: Personal Information
  personalInfo: {
    title: 'Personal Information',
    data: [
      { label: 'Client ID', value: 'CUST10001' },
      { label: 'Contact No', value: '(+61) 412 345 678' },
      { label: 'Client Name', value: 'Robert Chen' },
      { label: 'Email ID', value: 'robertchen123@gmail.com' },
      { label: 'Date Of Birth (DOB)', value: '14 July 1998' },
      { label: 'SSN/ TAX ID', value: '900-70-0000' },
      { label: 'Current Stage', value: 'Pre-approval' },
      { label: 'Priority Level', value: 'Medium' },
      { label: 'Referral Source', value: '-' },
      { label: 'Loans No', value: '05' },
    ]
  },

  // SECTION 2: Address Information
  addressInfo: {
    title: 'Address Information',
    data: [
      { label: 'Street Address', value: '123 Main Street' },
      { label: 'City', value: 'Sydney' },
      { label: 'State/Province', value: 'NSW' },
      { label: 'ZIP/Postal Code', value: '2000' },
    ]
  },

  // SECTION 3: Employment & Financial
  employmentInfo: {
    title: 'Employment & Financial Information',
    data: [
      { label: 'Employment Status', value: 'Full-time Employed' },
      { label: 'Annual Income', value: '$120,000' },
      { label: 'Employer/Company Name', value: 'Adobe' },
      { label: 'Credit Score', value: '725' },
    ]
  },

  // SECTION 4: Loans (Array for dynamic rendering)
  loans: [
    {
      title: 'Loan Information (01)',
      data: [
        { label: 'Loan Type', value: 'Home Purchase' },
        { label: 'Loan Amount', value: '$650,000' },
        { label: 'Loan Purpose', value: 'Primary Residency Purchase' },
        { label: 'Down Payment', value: '$130,000 (20%)' },
        { label: 'Property Type', value: 'Single Family Home' },
        { label: 'Property Address', value: '456 Oak, Avenue, Sydney' },
      ]
    },
    {
      title: 'Loan Information (02)',
      data: [
        { label: 'Loan Type', value: 'Car Purchase' },
        { label: 'Loan Amount', value: '$150,000' },
        { label: 'Loan Purpose', value: 'Primary car Purchase' },
        { label: 'Down Payment', value: '$50,000 (20%)' },
        { label: 'Property Type', value: 'SUV' },
        { label: 'Property Address', value: '5/45 Ocean Avenue, AU' },
      ]
    }
  ]
};