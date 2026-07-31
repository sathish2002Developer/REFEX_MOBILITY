import { mergeLandingPageCms } from './landingPageCmsMerge.js'
import { DEFAULT_LANDING_CLIENT_LOGOS } from './landingClientLogosDefaults.js'

export const DEFAULT_ETS_LANDING_CMS = {
  pageTitle: 'AI-Powered Employee Transport Solutions | Refex Mobility',
  metaDescription:
    'Manage commute operations end-to-end with AI-powered routing, real-time tracking & automated billing across 5 cities. Audit-ready reporting. Get a quote.',
  sections: {
    hero: {
      titleLine1: 'Reliable Employee Transportation Services',
      titleHighlight: 'Built for Every Enterprise.',
      servicesLine: '',
      lead: 'Safe, on-time, reliable transport for your workforce — across vehicle types, cities, and shift patterns.',
      backgroundImage: '/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp',
      highlights: [
        { order: 1, text: 'Seamless migration' },
        { order: 2, text: 'Automated billing' },
        { order: 3, text: 'Cost-effective fleet options' },
        { order: 4, text: '24/7 support team' },
        { order: 5, text: 'On-time rides' },
        { order: 6, text: 'Zero cancellation guaranteed' },
      ],
      trustStats: [
        { order: 1, value: '100+', label: 'Companies Trust Us' },
        { order: 2, value: '2000+', label: 'Company Owned Vehicles' },
        { order: 3, value: '5', label: 'Cities' },
      ],
    },
    logos: {
      titlePrefix: 'Trusted by',
      titleHighlight: 'leading enterprises',
      items: DEFAULT_LANDING_CLIENT_LOGOS,
    },
    problems: {
      title: '',
      titlePrefix: 'Transform Your',
      titleHighlight: 'Employee Transportation Experience',
      lead: 'One Partner for All Your Employee Transportation Needs',
      blocks: [
        {
          order: 1,
          problem: 'Vendors miss pickups, employees complain, you’re stuck following up.',
          fixTitle: 'Fix — Atlas',
          fix: 'Real-time tracking with live GPS and ETA alerts, zero guesswork.',
        },
        {
          order: 2,
          problem: 'No visibility until something goes wrong.',
          fixTitle: 'Fix — Deploy',
          fix: 'Smart routing that adapts to shift changes automatically.',
        },
        {
          order: 3,
          problem: 'Manual billing eats hours every month, disputes drag on.',
          fixTitle: 'Fix — Automated billing',
          fix: 'One transparent invoice, zero manual reconciliation.',
        },
        {
          order: 4,
          problem: 'Safety and compliance are an afterthought until an incident happens.',
          fixTitle: 'Fix — Assure',
          fix: 'Verified drivers, women safety protocols, built-in SOS escalation.',
        },
      ],
    },
    midCta: {
      title: '',
      description: 'See how Refex Mobility simplifies corporate transportation for teams like yours.',
      buttonText: 'Talk to Our Team',
    },
    features: {
      titlePrefix: 'Built for',
      titleHighlight: 'Enterprise Scale',
      image: '/wp-content/uploads/elementor/thumbs/outstanding-img-r97rc31a974htbzyt30e7ra24cs8axu2myh0lsb9kc.png',
      imageAlt: 'Employee transportation services',
      items: [
        { order: 1, icon: 'fa-tachometer-alt', label: 'Dedicated enterprise dashboard' },
        { order: 2, icon: 'fa-map-marker-alt', label: 'Live GPS Tracking' },
        { order: 3, icon: 'fa-mobile-alt', label: 'Mobile App available on iOS & Android' },
        { order: 4, icon: 'fa-file-invoice', label: 'Automated Billing' },
        { order: 5, icon: 'fa-headset', label: '24/7 Support' },
        { order: 6, icon: 'fa-shield-alt', label: 'Women Safety Protocols' },
      ],
    },
    testimonials: {
      titlePrefix: 'Results,',
      titleHighlight: 'Not Just Promises',
      subtitle: 'Client Testimonials',
      items: [
        {
          order: 1,
          quote:
            'We are delighted with the services provided by Refex Mobility for employee transportation. Their tech-enabled vehicles ensure transparency and safety, which are our organization’s top priorities. The partnership has been both successful and fulfilling, significantly enhancing employee satisfaction.',
          name: 'Sailas Nulaka',
          role: 'Admin and Facilities',
          company: 'Invenco by GVR',
          logoImage: '',
          logoPrimary: 'Invenco',
          logoSecondary: 'by GVR',
        },
        {
          order: 2,
          quote:
            'We are happy with the employee transportation service provided by Refex Mobility Ltd. The seamless transition to sustainable mobility enabled by technology has been both satisfying and successful, and it has definitely improved our team’s daily travel experience. The service has been reliable, punctual, safe, and comfortable.',
          name: 'Kondanda Ram',
          role: 'Sr Manager Finance and Admin',
          company: 'Brady Company India Pvt. Ltd',
          logoImage: '',
          logoPrimary: 'Brady',
          logoSecondary: 'COMPANY',
        },
        {
          order: 3,
          quote:
            'Refex Mobility sets a golden standard for airport transfers. We are happy with consistently reliable, professional drivers and impeccable service every time.',
          name: 'Varun Keswani',
          role: 'Head of Supply - Asia & Middle East',
          company: 'Transferz',
          logoImage: '',
          logoPrimary: 'Transferz',
          logoSecondary: '',
        },
        {
          order: 4,
          quote:
            'Sincerely appreciate the excellent cab service provided for our airport pick-up and drop requirements. The vehicles were well-maintained, punctual, and the drivers were courteous and professional, ensuring a safe and comfortable journey. Your team’s reliability and commitment to service quality have made our travel experience hassle-free.',
          name: 'Priya Balan',
          role: 'Asst Manager- Facility',
          company: 'Nous',
          logoImage: '',
          logoPrimary: 'Nous',
          logoSecondary: '',
        },
      ],
    },
    faq: {
      titlePrefix: 'Frequently Asked',
      titleHighlight: 'Questions',
      items: [
        {
          order: 1,
          question: 'What services does Refex Mobility provide?',
          answer:
            'Refex Mobility offers comprehensive corporate mobility solutions, including Employee Transportation Services (ETS), Airport Transfers, Chauffeured Car Rentals, Long-Term Rentals, Intercity Travel, Event Transportation, and Executive Mobility across major Indian cities.',
          list: [],
        },
        {
          order: 2,
          question: 'Which cities do you currently operate in?',
          answer:
            'We currently operate in Chennai, Bangalore, Delhi NCR, Mumbai, and Hyderabad, with the capability to support pan-India requirements through our trusted partner network.',
          list: [],
        },
        {
          order: 3,
          question: 'Do you provide both Electric Vehicles (EVs) and ICE vehicles?',
          answer:
            'Yes. We offer a wide range of Electric Vehicles (EVs) as well as premium ICE vehicles, enabling customers to choose the fleet best suited to their operational and sustainability requirements.',
          list: [],
        },
        {
          order: 4,
          question: 'What types of vehicles are available?',
          answer: '',
          list: ['Sedan EVs', 'Premium EV SUVs', 'Sedans', 'SUVs', 'MPVs (6/7 Seaters)', 'Premium Executive Vehicles'],
        },
        {
          order: 5,
          question: 'Do you offer airport transfers?',
          answer:
            'Yes. We provide 24×7 airport transfers with professional chauffeurs, flight tracking, and timely pickups for corporate travelers.',
          list: [],
        },
        {
          order: 6,
          question: 'Can you support employee transportation for large organizations?',
          answer:
            'Yes. We specialize in managing employee transportation programs for enterprises, including shift-based transportation, roster management, and technology-enabled trip monitoring.',
          list: [],
        },
        {
          order: 7,
          question: 'Do you provide long-term vehicle rentals?',
          answer:
            'Yes. We offer flexible long-term rental solutions for organizations requiring dedicated vehicles with chauffeurs.',
          list: [],
        },
        {
          order: 8,
          question: 'What does your ESG team get?',
          answer: '',
          list: ['Per-trip CO₂ reports', 'Composition disclosure', 'Scope 3 emission tracking', 'Monthly sustainability MIS'],
        },
      ],
    },
    form: {
      title: 'Let’s Build Your Enterprise Mobility Solution',
      note: 'Fill out the form, our experts will call back within 24 hours.',
      buttonText: 'Get a Custom Transport Plan',
      submittingText: 'Submitting…',
      backgroundImage: '/wp-content/uploads/2025/07/home-bg-image-1-scaled.webp',
    },
  },
}

export function mergeEtsLandingCms(apiData) {
  return mergeLandingPageCms(DEFAULT_ETS_LANDING_CMS, apiData, {
    hero: ['highlights', 'trustStats'],
    logos: 'items',
    problems: 'blocks',
    features: 'items',
    testimonials: 'items',
    faq: 'items',
  })
}
