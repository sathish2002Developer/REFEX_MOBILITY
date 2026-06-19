export const DEFAULT_DRIVE_FOR_US_CMS = {
  pageTitle: 'Drive For Us | Refex Mobility',
  metaDescription:
    "India's most reliable corporate mobility service for safe, premium and on-time travel. Trusted by business driving clean transport goals.",
  sections: {
    hero: {
      title: 'Power Your Earnings - Drive Smart',
      subtitle:
        'We provide the car. You bring the skill. Join us as a professional driver and start earning with our all-electric fleet.',
      ctaText: 'Get Started',
      ctaLink: '#join-form',
      backgroundImage: '/wp-content/uploads/2025/07/drive-section-1-scaled.webp',
    },
    whyChooseUs: {
      titlePrefix: 'Why',
      titleHighlight: 'Drive For Us ?',
      cards: [
        {
          order: 1,
          titleLine1: 'Zero Ownership',
          titleLine2: 'Cost',
          description: 'No need to buy or rent. Drive our fully maintained electric vehicles.',
          image: '/wp-content/uploads/2025/07/zero-ownership.png',
          alt: 'Zero Ownership Cost',
        },
        {
          order: 2,
          title: 'Guaranteed Earnings + Incentivest',
          description: 'Earn weekly or monthly payouts with performance bonuses and rewards.',
          image: '/wp-content/uploads/2025/07/earning-incentive.png',
          alt: 'Guaranteed Earnings + Incentives',
        },
        {
          order: 3,
          title: 'App-Based Ride Assignments',
          description: 'Easy-to-use driver app with trip details, navigation, and payments.',
          image: '/wp-content/uploads/2025/07/ride-assignmentes.png',
          alt: 'App-Based Ride Assignments',
        },
        {
          order: 4,
          title: 'Reliable Support. Anytime.',
          description: 'We handle the vehicle upkeep. You focus on driving.',
          image: '/wp-content/uploads/2025/07/support.png',
          alt: 'Reliable Support. Anytime.',
        },
      ],
    },
    faq: {
      titlePrefix: 'Frequently Asked',
      titleHighlight: 'Questions',
      items: [
        {
          order: 1,
          question: 'Who owns the vehicle in this partnership model?',
          answer:
            'Refex Mobility owns and maintains the fleet of vehicles. As a driver partner, you do not need to invest in purchasing a vehicle. You simply drive and earn — we handle the rest, including vehicle maintenance, insurance, and compliance.',
        },
        {
          order: 2,
          question: 'Is there consistent demand or do I have to find my own rides?',
          answer:
            'No need to worry about finding rides. Refex Mobility takes full responsibility for generating ride demand across all our operating cities, ensuring that our driver partners stay productive.',
        },
        {
          order: 3,
          question: 'When and how do I receive my payouts?',
          answer:
            'Payouts are made on time, every time. We follow a fixed payout cycle and deposit earnings directly into your registered bank account.',
        },
        {
          order: 4,
          question: 'What kind of support do I get on-road and off-road?',
          answer:
            "We provide 24×7 Command Center support, including emergency assistance, route optimization, vehicle service coordination, and app guidance — so you're never alone on the road.",
        },
        {
          order: 5,
          question: 'Are there different models for driver partnerships?',
          answer: 'Yes. We offer flexible models and shifts based on your preference',
        },
        {
          order: 6,
          question: 'How do I get started as a driver partner with Refex Mobility?',
          answer:
            'Getting started is simple. Just reach out to the mobile number listed on our website. Our team will guide you to the nearest onboarding center, verify your documents, explain the onboarding process, and get you started.',
        },
      ],
    },
  },
}

export function mergeDriveForUsCms(apiData) {
  if (!apiData) return DEFAULT_DRIVE_FOR_US_CMS
  const d = DEFAULT_DRIVE_FOR_US_CMS
  return {
    pageTitle: apiData.pageTitle || d.pageTitle,
    metaDescription: apiData.metaDescription || d.metaDescription,
    sections: {
      ...d.sections,
      ...(apiData.sections || {}),
      hero: { ...d.sections.hero, ...(apiData.sections?.hero || {}) },
      whyChooseUs: { ...d.sections.whyChooseUs, ...(apiData.sections?.whyChooseUs || {}) },
      faq: { ...d.sections.faq, ...(apiData.sections?.faq || {}) },
    },
  }
}
