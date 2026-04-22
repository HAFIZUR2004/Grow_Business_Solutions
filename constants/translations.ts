export type TeamMember = {
  name: string;
  role: string;
  description: string;
  image?: string;
};
export const translations = {
  EN: {
    // Navbar
    menu: "Menu",
    services: "Services",
    projects: "Projects",
    about: "About",
    career: "Career",
    contact: "Contact",
    startProject: "Start a Project",
    businessSolutions: "Business Solutions",

    //Footer
    footerDesc:
      "Building scalable networks and technical excellence for global business expansion.",
    solutions: "Solutions",
    protocol: "Protocol",
    terminal: "Terminal",
    returnTop: "Return to Top",
    development: "Development",
    strategy: "Strategy",
    security: "Security",
    corev3: "Core V3",
    uptime: "Uptime",
    nodes: "Nodes",

    //Hero
    heroBadge: "Grow Business Solutions BD",
    heroHeading1: "Your Vision, Our Expertise -",
    heroHeading2: "Engineering Success Together.",
    heroDesc:
      "Your vision combined with our technical expertise will pave the way for future success. We go beyond mere project delivery; we act as your dedicated partner at every step of your business journey, all within an affordable budget. Through cutting-edge AI and high-performance solutions, we will elevate your dreams to extraordinary heights. Consult with our expert team today at no cost to discover the best strategy for your business. We are by your side, always.",
    heroBtnPrimary: "Get a Free Consultation",
    heroBtnSecondary: "Our Success Stories",
    statLabel: "Data SLA",
    statValue: "99.99%",

    //Engineering Protocol

    protocolTitle: "The Engineering",
    protocolTitleItalic: "Protocol.",
    steps: [
      {
        title: "Discovery",
        desc: "Deep-dive audit into existing systems and market opportunities.",
        bgText: "architecture",
      },
      {
        title: "Blueprint",
        desc: "Wireframing the high-fidelity user journey and technical stack mapping.",
        bgText: "code",
      },
      {
        title: "Engineering",
        desc: "Sprinting through development with modular, test-driven architecture.",
        bgText: "speed",
      },
      {
        title: "Optimization",
        desc: "Iterative fine-tuning and deployment on high-speed global nodes.",
        bgText: "global",
      },
    ],

    //Success in Motion
    successBadge: "MILESTONES",
    successTitle: "Success in",
    successTitleGradient: "Motion.",
    stats: [
      {
        title: "8+ Years",
        desc: "Of dedicated craft in digital architecture.",
      },
      {
        title: "20+ Projects",
        desc: "High-impact solutions delivered globally.",
      },
      {
        title: "100% Client",
        desc: "Satisfaction rate across all partnerships.",
      },
    ],
    // Team Section
    teamBadge: "MEET THE COLLECTIVE",
    teamTitle: "Our Creative",
    teamTitleGradient: "Collective",
    teamMembers: [
      {
        name: "Hafizur Rahman",
        role: "Founder & Lead Developer",
        description:
          "Architecting high-performance digital ecosystems with MERN stack expertise.",
        image: "/team/hafizur.jpg",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
      {
        name: "Elena Vance",
        role: "Head of Strategy",
        description: "Transforming complex market data into elegant roadmaps.",
        image: "/team/Elena.jpg",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
      {
        name: "Julian Kross",
        role: "Lead Systems Architect",
        description:
          "Building invisible foundations with zero-latency precision.",
        image: "/team/Julian.jpg",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
      {
        name: "Md. Shukur Mahmud",
        role: "Founder & Developer",
        description:
          "Building invisible foundations with zero-latency precision.",
        image: "/team/Shukur.png",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
    ],
reviews: {
  badge: "Social Proof",
  title: "Trusted by",
  titleGradient: "Industry Leaders",
  desc: "Don't just take our word for it — hear from our amazing clients around the world",
  avgRating: "Average Rating",
  happyClients: "Happy Clients",
  projectsDelivered: "Projects Delivered",
  support: "Support",
  swipeHint: "Swipe to navigate →",
  noTestimonials: "No testimonials yet. Add some from admin panel.",
  loadingTexts: ["Fetching Testimonials", "Processing Data", "Preparing Reviews", "Almost Ready"],
  pleaseWait: "Please wait",
  complete: "Complete"
},

    //contact Us
    secureChannel: "DIRECT ADVISORY GATEWAY",
    initiate: "Evolve",
    connection: "Your Brand",
    contactDesc:
      "Ready to dominate the digital landscape? Reach out through our secure protocol to start building a high-conversion platform that works for your business 24/7.",
    nameLabel: "Name",
    namePlaceholder: "DESIGNATION / ALIAS",
    emailLabel: "Email",
    emailPlaceholder: "ENCRYPTED_ENDPOINT",
    messageLabel: "Write Your Message",
    messagePlaceholder: "TRANSMIT SECURE MESSAGE...",
    executeProtocol: "Execute Protocol",
    successMessage: "Transmission successful. Node will respond within 24h.",
    quantumLine: "Quantum_Line",
    neuralLink: "Neural_Link",
    phone: "+880 1234 567 890",
    email: "contact@growbusiness.solutions",

    // Tech Stack Section
    techStack: {
      title: "The",
      titleGradient: "Atomic",
      titleEnd: "Stack.",
      features: [
        {
          title: "Optimized Core",
          desc: "Latency-tuned server environments for near-zero downtime.",
        },
        {
          title: "Reactive UI",
          desc: "State-driven fluid interfaces with flawless user interactions.",
        },
        {
          title: "Distributed Edge",
          desc: "Global CDN delivery ensuring blazing-fast access everywhere.",
        },
        {
          title: "Ironclad Security",
          desc: "End-to-end encryption and advanced authentication protocols.",
        },
        {
          title: "Scalable Logic",
          desc: "Modular architecture built for long-term maintainability and growth.",
        },
        {
          title: "Smart Insights",
          desc: "Real-time monitoring and user behavior data tracking.",
        },
      ],
      centerText: "MERN+",
      prevButton: "Previous",
      nextButton: "Next",
    },
    
    // portfolio
   portfolio: {
  badge: "Featured Work",
  title: "Creative",
  titleGradient: "Artifacts",
  desc: "Explore our collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence.",
  stats: [
    { label: "Featured Projects", suffix: "+" },
    { label: "Client Satisfaction" },
    { label: "Support" }
  ],
  viewAll: "View All Projects",
  noProjects: "No projects found.",
  noProjectsDesc: "Add some projects from the admin dashboard to see them here.",
  loadingTexts: ["Fetching Data", "Processing Assets", "Preparing Portfolio", "Almost Ready"],
  pleaseWait: "Please wait",
  complete: "Complete"
},

  },
  
  BN: {
    //Navbar
    menu: "মেনু",
    services: "সার্ভিস সমূহ",
    projects: "প্রজেক্ট সমূহ",
    about: "আমাদের সম্পর্কে",
    career: "ক্যারিয়ার",
    contact: "যোগাযোগ",
    startProject: "প্রজেক্ট শুরু করুন",
    businessSolutions: "বিজনেস সলিউশনস",

    //Footer
    footerDesc:
      "বৈশ্বিক ব্যবসায়িক প্রসারের জন্য আমরা তৈরি করি উন্নত নেটওয়ার্ক এবং টেকনিক্যাল শ্রেষ্ঠত্ব।",
    solutions: "সমাধান",
    protocol: "প্রোটোকল",
    terminal: "টার্মিনাল",
    returnTop: "উপরে যান",
    development: "ডেভেলপমেন্ট",
    strategy: "স্ট্র্যাটেজি",
    security: "সিকিউরিটি",
    corev3: "কোর ভি৩",
    uptime: "আপটাইম",
    nodes: "নোড",

    //Hero

    heroBadge: "গ্রো বিজনেস সলিউশনস বিডি",
    heroHeading1: "আপনার লক্ষ্য, আমাদের দক্ষতা -",
    heroHeading2: "একসাথেই গড়ি সফলতা।",
    heroDesc:
      "আপনার স্বপ্নের সাথে আমাদের কারিগরি দক্ষতার সমন্বয় নিশ্চিত করবে ভবিষ্যৎ সাফল্য। আমরা শুধু প্রজেক্ট ডেলিভারি করি না; বরং আপনার ব্যবসার প্রতিটি পদক্ষেপে সাশ্রয়ী বাজেটে আপনার বিশ্বস্ত পার্টনার হিসেবে কাজ করি। অত্যাধুনিক AI এবং হাই-পারফরম্যান্স সলিউশনের মাধ্যমে আমরা আপনার স্বপ্নকে নিয়ে যাব এক অনন্য উচ্চতায়। আপনার ব্যবসার সঠিক কৌশল নির্ধারণে আজই আমাদের বিশেষজ্ঞ টিমের সাথে বিনামূল্যে পরামর্শ করুন। আমরা আছি সবসময় আপনার পাশে।",
    heroBtnPrimary: "ফ্রি কনসালটেশন নিন",
    heroBtnSecondary: "আমাদের সফলতার গল্প",
    statLabel: "ডেটা এসএলএ (SLA)",
    statValue: "৯৯.৯৯%",

    //Engineering Protocol
    protocolTitle: "ইঞ্জিনিয়ারিং",
    protocolTitleItalic: "প্রটোকল",
    steps: [
      {
        title: "অনুসন্ধান",
        desc: "বিদ্যমান সিস্টেম এবং বাজারের সুযোগগুলো গভীরভাবে বিশ্লেষণ করা।",
        bgText: "স্থাপত্য",
      },
      {
        title: "পরিকল্পনা ",
        desc: "উচ্চমানের ইউজার জার্নি ডিজাইন এবং টেকনিক্যাল স্ট্যাক ম্যাপ তৈরি করা।",
        bgText: "কোড",
      },
      {
        title: "প্রকৌশল ",
        desc: "মডুলার এবং টেস্ট-ড্রিভেন আর্কিটেকচারের মাধ্যমে দ্রুত ডেভেলপমেন্ট সম্পন্ন করা।",
        bgText: "গতি",
      },
      {
        title: "অপ্টিমাইজেশন ",
        desc: "ক্রমাগত উন্নতি এবং হাই-স্পিড গ্লোবাল নোডগুলোতে অ্যাপ্লিকেশন স্থাপন করা।",
        bgText: "গ্লোবাল",
      },
    ],

    //Success in Motion
  successBadge: "আমাদের সাফল্য",
  successTitle: "সাফল্যের",
  successNumbers: "পরিসংখ্যান",
  successDesc: "পরিমাপযোগ্য ফলাফল এবং গ্রাহক সন্তুষ্টির মাধ্যমে শ্রেষ্ঠত্ব প্রদান করছি",
  stats: [
    { 
      title: "২+ বছর", 
      desc: "ডিজিটাল আর্কিটেকচারে নিবেদিত কাজ।" 
    },
    { 
      title: "২টি প্রজেক্ট", 
      desc: "বিশ্বজুড়ে উচ্চ-প্রভাবশালী সমাধান প্রদান।" 
    },
    { 
      title: "১০০% ক্লায়েন্ট", 
      desc: "সকল অংশীদারিত্বে সন্তুষ্টির হার।" 
    }
  ],
  badges: [
    "২টি প্রজেক্ট সম্পন্ন", 
    "৫ স্টার রেটিং", 
    "সময়মতো ডেলিভারি", 
    "প্রিমিয়াম কোয়ালিটি"
  ],
    // Team Section
    teamBadge: "আমাদের সম্মিলিত শক্তির সাথে পরিচিত হোন",
    teamTitle: "আমাদের সৃজনশীল ",
    teamTitleGradient: "জোট",
    teamMembers: [
      {
        name: "হাফিজুর রহমান",
        role: "প্রতিষ্ঠাতা ও লিড ডেভেলপার",
        description:
          "MERN স্ট্যাক দক্ষতায় উচ্চ-ক্ষমতাসম্পন্ন ডিজিটাল ইকোসিস্টেম স্থাপত্যবিদ।",
        image: "/team/hafizur.jpg",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
      {
        name: "এলেনা ভ্যান্স",
        role: "কৌশল প্রধান",
        description: "জটিল মার্কেট ডেটাকে সুশৃঙ্খল রোডম্যাপে রূপান্তরিত করছেন।",
        image: "/team/Elena.jpg",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
      {
        name: "জুলিয়ান ক্রস",
        role: "লিড সিস্টেম আর্কিটেক্ট",
        description: "শূন্য লেটেন্সি নির্ভুলতায় অদৃশ্য ভিত্তি নির্মাণ করছেন।",
        image: "/team/Julian.jpg",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
      {
        name: "মোঃ শুকুর মাহমুদ",
        role: "প্রতিষ্ঠাতা ও ডেভেলপার",
        description: "শূন্য লেটেন্সি নির্ভুলতায় অদৃশ্য ভিত্তি নির্মাণ করছেন।",
        image: "/team/Shukur.png",
        social: {
          email: "hafizur@growbusiness.solutions",
          linkedin: "https://linkedin.com/in/hafizur",
          github: "https://github.com/hafizur",
          twitter: "https://twitter.com/hafizur",
          facebook: "https://facebook.com/hafizur",
        },
      },
    ],

    reviews: {
  badge: "সামাজিক প্রমাণ",
  title: "সেরাদের",
  titleGradient: "বিশ্বস্ত সঙ্গী",
  desc: "বিশ্বস্ত গ্রাহকদের মুখে আমাদের সাফল্যের গল্প",
  avgRating: "গড় রেটিং",
  happyClients: "সন্তুষ্ট ক্লায়েন্ট",
  projectsDelivered: "প্রজেক্ট ডেলিভারি",
  support: "সাপোর্ট",
  swipeHint: "সোয়াইপ করুন →",
  noTestimonials: "কোনো টেস্টিমোনিয়াল নেই। অ্যাডমিন প্যানেল থেকে যোগ করুন।",
  loadingTexts: ["টেস্টিমোনিয়াল আনছে", "ডাটা প্রসেস করছে", "রিভিউ প্রস্তুত করছে", "প্রায় প্রস্তুত"],
  pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন",
  complete: "সম্পূর্ণ"
},
    // Tech Stack Section
    techStack: {
      title: "দ্যা",
      titleGradient: "এটমিক",
      titleEnd: "স্ট্যাক।",
      features: [
        {
          title: "অপটিমাইজড কোর",
          desc: "শূন্য ডাউনটাইমের জন্য লেটেন্সি-টিউনড সার্ভার পরিবেশ।",
        },
        {
          title: "রিঅ্যাকটিভ ইউআই",
          desc: "স্টেট-ড্রিভেন ফ্লুইড ইন্টারফেস যা নিখুঁত ইউজার ইন্টারঅ্যাকশন নিশ্চিত করে।",
        },
        {
          title: "ডিস্ট্রিবিউটেড এজ",
          desc: "গ্লোবাল সিডিএন ডেলিভারি যা সর্বত্র দ্রুতগতির অ্যাক্সেস নিশ্চিত করে।",
        },
        {
          title: "আয়রনক্ল্যাড সিকিউরিটি",
          desc: "এন্ড-টু-এন্ড এনক্রিপশন এবং অ্যাডভান্সড অথেন্টিকেশন প্রোটোকল।",
        },
        {
          title: "স্কেলেবল লজিক",
          desc: "দীর্ঘমেয়াদী রক্ষণাবেক্ষণ এবং বৃদ্ধির জন্য মডুলার আর্কিটেকচার।",
        },
        {
          title: "স্মার্ট ইনসাইটস",
          desc: "রিয়েল-টাইম মনিটরিং এবং ইউজার বিহেভিয়ার ডেটা ট্র্যাকিং।",
        },
      ],
      centerText: "MERN+",
      prevButton: "পূর্ববর্তী",
      nextButton: "পরবর্তী",
    },
  portfolio: {
  badge: "নির্বাচিত কাজ",
  title: "ডিজিটাল",
  titleGradient: "শিল্পকর্ম",
  desc: "আমাদের ডিজিটাল মাস্টারপিসের সংগ্রহটি অন্বেষণ করুন — প্রতিটি প্রকল্প সৃজনশীলতা এবং প্রযুক্তিগত শ্রেষ্ঠত্বের সাথে সমাধান করা একটি অনন্য চ্যালেঞ্জকে উপস্থাপন করে।",
  stats: [
    { label: "প্রদর্শিত প্রকল্প", suffix: "+" },
    { label: "ক্লায়েন্ট সন্তুষ্টি" },
    { label: "সাপোর্ট" }
  ],
  viewAll: "সব প্রকল্প দেখুন",
  noProjects: "কোনো প্রকল্প পাওয়া যায়নি।",
  noProjectsDesc: "এখানে প্রকল্প দেখতে অ্যাডমিন ড্যাশবোর্ড থেকে কিছু প্রকল্প যোগ করুন।",
  loadingTexts: ["ডাটা আনছে", "অ্যাসেট প্রসেস করছে", "পোর্টফোলিও প্রস্তুত করছে", "প্রায় প্রস্তুত"],
  pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন",
  complete: "সম্পূর্ণ"
},

    // contact us
    secureChannel: "সরাসরি পরামর্শ গেটওয়ে",
    initiate: "আপনার ব্র্যান্ডকে",
    connection: "বিকশিত করুন",
    contactDesc:
      "ডিজিটাল দুনিয়ায় রাজত্ব করতে প্রস্তুত? আপনার বিজনেসের জন্য ২৪/৭ কাজ করবে এমন একটি হাই-কনভার্সন প্ল্যাটফর্ম তৈরি করতে আমাদের নিরাপদ প্রোটোকলের মাধ্যমে যোগাযোগ করুন।",
    nameLabel: "নাম",
    namePlaceholder: "আপনার নাম বা পদবি",
    emailLabel: "ইমেল",
    emailPlaceholder: "আপনার ইমেল অ্যাড্রেস",
    messageLabel: "আপনার বার্তা লিখুন",
    messagePlaceholder: "আপনার বার্তাটি এখানে লিখুন...",
    executeProtocol: "প্রোটোকল কার্যকর করুন",
    successMessage:
      "বার্তা সফলভাবে পাঠানো হয়েছে। ২৪ ঘণ্টার মধ্যে যোগাযোগ করা হবে।",
    quantumLine: "কোয়ান্টাম লাইন",
    neuralLink: "নিউরন লিংক",
    phone: "+৮৮০ ১২৩৪ ৫৬৭ ৮৯০",
    email: "contact@growbusiness.solutions",
  },
};

export type LanguageType = keyof typeof translations;
