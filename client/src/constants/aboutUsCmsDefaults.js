export const DEFAULT_ABOUT_US_CMS = {
  pageTitle: 'About Us | Refex Mobility',
  metaDescription:
    'Learn about Refex Green Mobility Limited (RGML) — Refex Mobility’s clean, reliable, and sustainable corporate mobility services with 1500+ company-owned vehicles.',
  sections: {
    hero: {
      title: 'About Us',
      subtitle: 'Clean mobility for people, planet, and performance.',
      backgroundImage: '/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp',
    },
    intro: {
      titlePrefix: 'About',
      titleHighlight: 'Refex Mobility',
      paragraphs: [
        'Refex Green Mobility Limited (RGML) is a wholly-owned subsidiary of Refex Group\'s flagship listed entity, Refex Industries Limited. RGML underscores the group\'s commitment to sustainability and delivers clean mobility services for corporate transportation needs and B2B2C use cases with 1500+ company-owned vehicles. It leverages technology and aims to transform the mobility sector.',
        'Operating under the brand name "Refex Mobility", RGML runs 100% cleaner-fueled vehicles. At Refex Mobility, we go beyond transportation, and we invite you to be part of a movement redefining sustainable mobility.',
      ],
    },
    brandValues: {
      titlePrefix: 'Brand',
      titleHighlight: 'Values',
      items: [
        {
          order: 1,
          label: 'Reliable',
          icon: 'fa-shield-alt',
          description: 'Dependable mobility you can count on, every day.',
        },
        {
          order: 2,
          label: 'Safe',
          icon: 'fa-user-shield',
          description: 'Safety-first rides for every passenger and journey.',
        },
        {
          order: 3,
          label: 'Sustainable',
          icon: 'fa-leaf',
          description: 'Cleaner-fueled fleets built for a greener tomorrow.',
        },
      ],
    },
    brandGoals: {
      titlePrefix: 'Brand',
      titleHighlight: 'Goals',
      items: [
        {
          order: 1,
          label: 'Vision',
          icon: 'fa-eye',
          text: 'To deliver clean, reliable, and professional mobility experiences by empowering drivers, optimizing technology, and championing sustainable urban transport.',
        },
        {
          order: 2,
          label: 'Mission',
          icon: 'fa-bullseye',
          text: 'To become India’s most trusted and sustainable mobility platform, offering safe, smart, and seamless rides for everyone, everywhere.',
        },
        {
          order: 3,
          label: 'Purpose',
          icon: 'fa-heart',
          text: 'To redefine everyday commuting through clean mobility solutions that prioritize people, planet, and performance.',
        },
      ],
    },
    leadership: {
      titlePrefix: 'Leadership',
      titleHighlight: 'Team',
      items: [
        {
          order: 1,
          name: 'Anirudh Arun',
          role: 'Chief Executive Officer',
          image: '',
          bio: [
            'Anirudh has over a decade of experience in building and scaling high-growth businesses across product, sales, operations, and growth functions. A strategic and execution-focused leader, he has successfully led cross-functional teams to transform early-stage concepts into revenue-generating, scalable enterprises. He combines deep operational insight with financial discipline, enabling businesses to grow sustainably while maintaining strong unit economics and customer outcomes.',
            'His leadership spans strategy formulation, capital allocation, operational scale-up, brand building, and stakeholder management. Earlier in his career, Anirudh was an entrepreneur in the sports-tech and wearables space, then began his professional journey as an oilfield-services engineer, gaining global exposure to high-performance systems and execution excellence. In addition to his business leadership, he is also an author with two published works and has a strong passion for storytelling and long-form writing.',
          ],
        },
        {
          order: 2,
          name: 'Meet Goradia',
          role: 'Chief Operating Officer',
          image: '',
          bio: [
            'Meet has a wealth of extensive experience, progressing from junior levels to leadership positions in diverse fields such as shipping, textile, courier, warehousing, logistics and mobility. His career reflects a strong inclination towards business, consistently managing large, complex operations and P&L responsibilities to ensure financial health and growth.',
            'Meet began his professional journey as a merchant navy sailor, sailing across oceans on large crude oil tankers managing deck side operations. This maritime experience laid a solid foundation for his subsequent career. Driven by a desire to deepen his expertise, Meet pursued a Master of Science in International Logistics and Supply Chain Management from the University of Glamorgan.',
            'His dedication and strategic acumen propelled him up the corporate ladder. Most notably, Meet’s last role was with a mobility startup, where he served as a consultant COO. Under his leadership, the company achieved remarkable growth, and pivoted its way in the startup EV mobility ecosystem.',
            'Meet’s dynamic career is a testament to his business acumen, strategic thinking, and ability to drive significant growth across various sectors.',
          ],
        },
        {
          order: 3,
          name: 'Ankkit Groverr',
          role: 'Chief Business Officer',
          image: '',
          bio: [
            'Ankkit is a results-driven business leader with over 20+ years of experience. He brings a proven track record across strategy, P&L management, large-scale enterprise transformations, and strategic client partnerships. His career spans global MNCs and high-growth ventures across Mobility, Technology & Digital, Energy Transition, and Aviation & Travel.',
            'Throughout his career, he has successfully drove growth strategies, spearheaded complex high-value deals, and translate vision into measurable commercial outcomes. His experience collaborating with Diplomatic Missions and Intergovernmental Organizations endows him with exceptional cross-cultural leadership, corporate governance, and multi-stakeholder management capabilities.',
            'Recognized for pairing strategic foresight with sharp operational rigor, Ankkit brings a hands-on, entrepreneurial approach to solving complex business challenges. With a proactive, execution-focused mindset, he combines commercial acumen, strategy, and operational excellence to drive sustained business growth and long-term impact.',
          ],
        },
        {
          order: 4,
          name: 'Sasikumar Arumugham',
          role: 'Chief Technology Officer',
          image: '',
          bio: [
            'Sasikumar is an accomplished technology leader, innovator, and serial entrepreneur with over two decades of experience shaping the global mobility and IoT landscape. Beginning his career in software engineering, Sasi relocated to Malaysia and Singapore to pioneer early GPS dispatch platforms. His foundational technical blueprints went on to power multi-city transport grids and unified regional transit networks across international markets, including Qatar and the United Arab Emirates.',
            'His technical portfolio spans complex, cross-domain hardware-software integrations, including touch-screen Mobile Data Terminals, seat-occupancy sensors, taximeters, and remote vehicle immobilization systems. Beyond commercial mobility, Sasikumar applied his deep-tech expertise to critical public infrastructure, designing state-level emergency ambulance dispatch systems and early telemedicine networks.',
            'In 2013, he founded Sun Telematics, a multi-modal mobility platform encompassing employee transportation, commercial logistics, micro-mobility, shuttle services, and self-drive technology. Following Sun Telematics’ acquisition by Refex Group in 2023, Sasi stepped into the role of Chief Technology Officer. Today, he leads Refex Mobility’s overarching technology strategy, engineering intelligent, scalable, and sustainable platforms for the future of enterprise transport.',
          ],
        },
      ],
    },
  },
}

export function mergeAboutUsCms(apiData) {
  if (!apiData) return DEFAULT_ABOUT_US_CMS
  const d = DEFAULT_ABOUT_US_CMS
  const api = apiData.sections || {}
  return {
    pageTitle: apiData.pageTitle || d.pageTitle,
    metaDescription: apiData.metaDescription || d.metaDescription,
    sections: {
      hero: { ...d.sections.hero, ...(api.hero || {}) },
      intro: {
        ...d.sections.intro,
        ...(api.intro || {}),
        paragraphs:
          Array.isArray(api.intro?.paragraphs) && api.intro.paragraphs.length
            ? api.intro.paragraphs
            : d.sections.intro.paragraphs,
      },
      brandValues: {
        ...d.sections.brandValues,
        ...(api.brandValues || {}),
        items:
          Array.isArray(api.brandValues?.items) && api.brandValues.items.length
            ? api.brandValues.items
            : d.sections.brandValues.items,
      },
      brandGoals: {
        ...d.sections.brandGoals,
        ...(api.brandGoals || {}),
        items:
          Array.isArray(api.brandGoals?.items) && api.brandGoals.items.length
            ? api.brandGoals.items
            : d.sections.brandGoals.items,
      },
      leadership: {
        ...d.sections.leadership,
        ...(api.leadership || {}),
        items:
          Array.isArray(api.leadership?.items) && api.leadership.items.length
            ? api.leadership.items
            : d.sections.leadership.items,
      },
    },
  }
}
