// C:\PSS\gosol\src\constants\meetingData.js

export const meetingData = {
    header: {
      clientName: "Robert Chen",
      role: "Investment Property Consultation",
      email: "sarah.johnson@email.com", // Based on screenshot
      phone: "(555) 123-4567",
      location: "San Francisco, CA"
    },
    
    // Left Column Data
    quickFacts: {
      title: "Quick Facts",
      items: [
        { label: "Current Loan", value: "$850K @ 4.2% Variable (ANZ)", highlight: false },
        { label: "Property", value: "2-bed apartment, Melbourne CBD", highlight: false },
        { label: "Income", value: "$95K combined • verified", highlight: true }, // 'verified' is blue in screenshot
        { label: "Credit Score", value: "Excellent (750+)", highlight: false }
      ]
    },
    propertyIntelligence: {
      title: "Property Intelligence",
      items: [
        { 
          label: "Target Property", 
          value: "3-bed house, Richmond", 
          subValue: "Est. Value: $1.2M", 
          trend: "Market trend: +3.2% (6 months)" 
        },
        { 
          label: "Rate Alert", 
          value: "Westpac investment rate dropped to 3.89% this week!" 
        }
      ]
    },
  
    // Center Column Data (Chat)
    transcript: {
      title: "Live Notes & Transcript",
      status: "Recording (12:34)",
      date: "Today 12 Nov 2025",
      messages: [
        {
          id: 1,
          sender: "RS", // Client Initials
          type: "client", // 'client' appears on left
          text: "I'm concerned about the interest rates going up. Should I lock in a fixed rate?"
        },
        {
          id: 2,
          sender: "RC", // Agent/User Initials
          type: "agent", // 'agent' appears on right
          text: "Given current market conditions, I'd recommend a split loan - 60% fixed at 3.89% and 40% variable for flexibility."
        },
        {
          id: 3,
          sender: "RS",
          type: "client",
          text: "That sounds good. What about the settlement timeline? We need to coordinate with selling our current place."
        },
        {
          id: 4,
          sender: "RC",
          type: "agent",
          text: "I'll coordinate with both banks. We can arrange a 60-day settlement to give you time to sell."
        }
      ]
    },
  
    // Right Column Data
    smartSuggestions: {
      title: "Smart Suggestions",
      cards: [
        {
          title: "Rate Opportunity",
          description: "Westpac has the best investment rate at 3.89%. Could save Robert $2,400/year vs current ANZ rate."
        },
        {
          title: "Split Loan Strategy",
          description: "Recommend 60% fixed (3.89%) + 40% variable (4.15%) for optimal risk balance."
        },
        {
          title: "Settlement Timing",
          description: "60-day settlement works well. Suggest backup financing if current property sale delays."
        }
      ]
    },
    actionItems: {
      title: "Action Items",
      items: [
        { task: "Send Westpac split loan application", priority: "High", priorityColor: "bg-red-100 text-red-600" },
        { task: "Schedule property valuation", priority: "Medium", priorityColor: "bg-yellow-100 text-yellow-600" }
      ]
    }
  };