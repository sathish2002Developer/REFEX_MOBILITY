export const DEFAULT_BUSINESS_COMMUTE_CMS = {
  pageTitle: 'Business Commute | Refex Mobility',
  metaDescription:
    "India's safest, most reliable and on-time mobility service for corporates and premium travel.",
  sections: {
    hero: {
      title: 'Reliable, Sustainable Mobility for Your Business',
      subtitle:
        'Redefining corporate commutes with tailored mobility\nsolutions for modern enterprises that truly care.',
      ctaText: 'Get Started',
      ctaLink: '#connect-form',
      backgroundImage: '/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp',
    },
    whyChooseRefex: {
      titlePrefix: 'Why Choose',
      titleHighlight: 'Refex For Business',
      description:
        'Elevate your business travel experience with our service, offering transparent pricing, an easy booking experience, clean cabs, superior payment and invoicing.',
      cards: [
        { order: 1, title: 'Seamless User Management', description: 'Effortless user onboarding including verified onboarding', image: '/wp-content/uploads/2025/07/seamless-icon.png', alt: 'Seamless user management' },
        { order: 2, title: 'Create Guest Booking', description: 'Effortlessly book and manage guest reservations', image: '/wp-content/uploads/2025/07/booking-icon.png', alt: 'Create Guest Booking' },
        { order: 3, title: 'Get 24/7 Assistance', description: 'Round the clock assistance available for all your needs', image: '/wp-content/uploads/2025/07/headphn.png', alt: '24/7 Assistance' },
        { order: 4, title: 'Dedicated Enterprise Dashboard', description: 'Centralised business control hub for optimized operations.', image: '/wp-content/uploads/2025/07/dashboard-icon.png', alt: 'Dedicated Enterprise Dashboard' },
        { order: 5, title: 'Flexible Payment Options', description: 'Adaptable payment solutions for your convenience', image: '/wp-content/uploads/2025/07/payment-icon.png', alt: 'Flexible payment options' },
        { order: 6, titleLine1: 'Monthly MIS', titleLine2: 'Report', description: 'Monthly insights report to track progress.', image: '/wp-content/uploads/2025/07/monthly-report.png', alt: 'Monthly MIS Report' },
        { order: 7, titleLine1: 'Luxuries &', titleLine2: 'Amenities', description: 'Premium comfort features for enhanced travel experience.', image: '/wp-content/uploads/2025/07/luxuries-icon.png', alt: 'Luxuries & Amenities' },
      ],
    },
    industries: {
      titlePrefix: 'Reliable Solution',
      titleHighlight: 'for every Industry',
      description:
        "Whether it's getting employees to work, patients to care, students to campus, or guests to their destination—timely, reliable transportation makes all the difference. That's why top organisations across healthcare, education, hospitality, and more trust us to power seamless mobility for the people who matter most to their business.",
      items: [
        { order: 1, title: 'Corporates', description: 'Ensure your teams get to and from the office seamlessly, safely, and on time—every time.', image: '/wp-content/uploads/2025/07/user-m.png', alt: 'Corporates' },
        { order: 2, title: 'Healthcare & Pharmaceuticals', description: 'Provide reliable transportation for patients and caregivers—because timely care starts with timely rides.', image: '/wp-content/uploads/2025/07/heart-img.png', alt: 'Healthcare & Pharmaceuticals' },
        { order: 3, titleLine1: 'Education &', titleLine2: 'Ed-Tech', description: 'Empower students and staff with safe, efficient rides that support learning beyond the classroom.', image: '/wp-content/uploads/2025/07/graduation-icon.png', alt: 'Education & Ed-Tech' },
        { order: 4, title: 'Hospitality', description: 'Delight your guests with dependable rides—enhancing every step of their journey.', image: '/wp-content/uploads/2025/07/cap-icon.png', alt: 'Hospitality' },
      ],
    },
    faq: {
      titlePrefix: 'Frequently Asked',
      titleHighlight: 'Questions',
      items: [
        { order: 1, question: 'What are the benefits of onboarding refex as a mobility partner for our organisation?', answer: 'As a Refex customer, you get dedicated enterprise dashboard, ride management, monthly reports, payments and invoicing, and secure API integrations.' },
        { order: 2, question: 'Do I get any carbon savings certificate?', answer: 'Yes, Refex Mobility provides carbon savings certificates to our business clients, recognizing your contributions to sustainable and eco-friendly transportation.' },
        { order: 3, question: 'Who is responsible for ownership and maintains the fleet and drivers?', answer: 'We at Refex ensure all fleet maintenance and driver training, maintaining high standards of safety, cleanliness, and reliability for every ride.' },
        { order: 4, question: 'Can I book my travel in advance?', answer: 'Yes. Refex allows you to book travel within City, Airport & Rentals 30 days in advance from our application and admin dashboard.' },
        { order: 5, question: 'What happens if I do not board the cab from my scheduled time?', answer: 'Refex waits for 30 min. If you do not board the cab during this time, the driver partners will cancel the pickup and a NO SHOW charge as per your company policy. Employees then need to rebook the Refex Cab.' },
        { order: 6, question: 'What to do in case of emergency?', answer: 'Press Panic button installed at the Left and right side of the car near the front seat belt. Refex representative will immediately call back for support. You can also contact them through 24*7 contact number on your Refex app too.' },
      ],
    },
  },
}

export function mergeBusinessCommuteCms(apiData) {
  if (!apiData) return DEFAULT_BUSINESS_COMMUTE_CMS
  const d = DEFAULT_BUSINESS_COMMUTE_CMS
  return {
    pageTitle: apiData.pageTitle || d.pageTitle,
    metaDescription: apiData.metaDescription || d.metaDescription,
    sections: {
      ...d.sections,
      ...(apiData.sections || {}),
      hero: { ...d.sections.hero, ...(apiData.sections?.hero || {}) },
      whyChooseRefex: { ...d.sections.whyChooseRefex, ...(apiData.sections?.whyChooseRefex || {}) },
      industries: { ...d.sections.industries, ...(apiData.sections?.industries || {}) },
      faq: { ...d.sections.faq, ...(apiData.sections?.faq || {}) },
    },
  }
}
