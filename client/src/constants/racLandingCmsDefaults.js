import { mergeLandingPageCms } from './landingPageCmsMerge.js'
import { DEFAULT_LANDING_CLIENT_LOGOS } from './landingClientLogosDefaults.js'

export const DEFAULT_RAC_LANDING_CMS = {
  pageTitle: 'Corporate Cab Rentals & Airport Transfers | Refex Mobility',
  metaDescription:
    'Book reliable cabs for business travel, daily rentals, outstation & airport transfers across 5 cities. EV & CNG fleet, verified drivers. Get a quote.',
  sections: {
    hero: {
      titleLine1: 'One Corporate Mobility Partner.',
      titleHighlight: 'Every Business Journey.',
      servicesLine: '',
      serviceButtons: [
        { order: 1, label: 'Airport Transfers' },
        { order: 2, label: 'Chauffeured Rentals' },
        { order: 3, label: 'Intercity Travel' },
      ],
      lead: 'Safe, reliable rides for corporate car rentals and airport transfers — trusted by 100+ companies.',
      backgroundImage: '/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp',
      highlights: [
        { order: 1, text: 'Zero cancellation promise' },
        { order: 2, text: 'On-time, every time' },
        { order: 3, text: 'Background verified driver-partners' },
        { order: 4, text: 'Dedicated enterprise dashboard' },
        { order: 5, text: 'Mobile App available on iOS & Android' },
        { order: 6, text: 'Live tracking & SOS integrated in app' },
      ],
      trustStats: [
        { order: 1, value: '100+', label: 'Companies Trust Us' },
        { order: 2, value: '2000+', label: 'Company Owned Vehicles' },
        { order: 3, value: '5', label: 'Cities' },
        { order: 4, value: '24/7', label: 'Availability' },
      ],
    },
    logos: {
      titlePrefix: 'Trusted by',
      titleHighlight: 'leading enterprises',
      items: DEFAULT_LANDING_CLIENT_LOGOS,
    },
    problems: {
      titlePrefix: "Reliability Isn't a Feature.",
      titleHighlight: "It's the Whole Point.",
      lead: 'Airport run or outstation trip, one booking or a standing corporate account: every ride held to the same standard.',
      blocks: [
        {
          order: 1,
          problem: 'A cancelled cab before a client meeting is a bad impression you didn’t sign up for.',
          fixTitle: 'Fix — Zero Cancellation',
          fix: 'Zero Cancellation Promise on every booking, so your schedule stays yours.',
        },
        {
          order: 2,
          problem: 'Missed flights because a driver showed up late, or didn’t show at all.',
          fixTitle: 'Fix — Flight-tracked transfers',
          fix: 'Flight-tracked transfers with chauffeurs who arrive ahead of time, not just on time.',
        },
        {
          order: 3,
          problem: 'Outstation travel means losing visibility the moment the vehicle leaves the city.',
          fixTitle: 'Fix — Live tracking & SOS',
          fix: 'Real-time tracking and SOS escalation for local and outstation trips.',
        },
        {
          order: 4,
          problem: 'Approving and reconciling scattered travel invoices eats up finance team hours.',
          fixTitle: 'Fix — Consolidated billing',
          fix: 'One consolidated dashboard, transparent billing, zero back-and-forth.',
        },
      ],
    },
    midCta: {
      title: 'Zero hassle for your travellers, zero worry for you.',
      description: 'See how Refex Mobility simplifies corporate transportation for teams like yours.',
      buttonText: 'Talk to Our Team',
    },
    features: {
      titlePrefix: 'Built for How Corporate Travel',
      titleHighlight: 'Actually Works',
      image: '/wp-content/uploads/elementor/thumbs/outstanding-img-r97rc31a974htbzyt30e7ra24cs8axu2myh0lsb9kc.png',
      imageAlt: 'Corporate mobility services',
      items: [
        { order: 1, icon: 'plane', label: 'Flight-tracked airport transfers' },
        { order: 2, icon: 'clock', label: 'Spot & hourly rentals' },
        { order: 3, icon: 'car', label: 'Corporate car rental & hire, daily to long-term' },
        { order: 4, icon: 'road', label: 'Intercity & outstation travel' },
        { order: 5, icon: 'users', label: 'Event Mobility' },
        { order: 6, icon: 'file-invoice', label: 'Automated billing' },
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
            'Refex Mobility sets a golden standard for airport transfers. We are happy with consistently reliable, professional drivers and impeccable service every time.',
          name: 'Varun Keswani',
          role: 'Head of Supply - Asia & Middle East',
          company: 'Transferz',
          logoImage: '',
          logoPrimary: 'Transferz',
          logoSecondary: '',
        },
        {
          order: 2,
          quote:
            'Sincerely appreciate the excellent cab service provided for our airport pick-up and drop requirements. The vehicles were well-maintained, punctual, and the drivers were courteous and professional, ensuring a safe and comfortable journey. Your team’s reliability and commitment to service quality have made our travel experience hassle-free.',
          name: 'Priya Balan',
          role: 'Asst Manager- Facility',
          company: 'Nous',
          logoImage: '',
          logoPrimary: 'Nous',
          logoSecondary: '',
        },
        {
          order: 3,
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
          order: 4,
          quote:
            'We are happy with the employee transportation service provided by Refex Mobility Ltd. The seamless transition to sustainable mobility enabled by technology has been both satisfying and successful, and it has definitely improved our team’s daily travel experience. The service has been reliable, punctual, safe, and comfortable.',
          name: 'Kondanda Ram',
          role: 'Sr Manager Finance and Admin',
          company: 'Brady Company India Pvt. Ltd',
          logoImage: '',
          logoPrimary: 'Brady',
          logoSecondary: 'COMPANY',
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
      submitNoteBold: 'Note: Business & Corporate Inquiries Only.',
      submitNoteLine: 'Not for driver applications or personal cab requests.',
      backgroundImage: '/wp-content/uploads/2025/07/home-bg-image-1-scaled.webp',
    },
  },
}

export function mergeRacLandingCms(apiData) {
  return mergeLandingPageCms(DEFAULT_RAC_LANDING_CMS, apiData, {
    hero: ['highlights', 'trustStats', 'serviceButtons'],
    logos: 'items',
    problems: 'blocks',
    features: 'items',
    testimonials: 'items',
    faq: 'items',
  })
}
