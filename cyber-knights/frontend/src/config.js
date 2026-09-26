// ─────────────────────────────────────────────────────────────
// Cyber Knights — single source of truth for editable content.
// No backend, no API calls: teams, members, partners, achievements,
// stats and socials are all read directly from this file.
//
// Anything below still marked with a `// TODO` needs real data
// before this goes fully live — see README.md for the full checklist.
// ─────────────────────────────────────────────────────────────

const config = {
  brand: {
    name: "Cyber Knights",
    tagline: "Break in. Level up. Defend the future.",
    description:
      "A non-profit student community teaching cybersecurity, connecting members to the industry, and supporting them through their education.",
  },

  // Official signup form (Google Form).
  joinUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfg67QNJpJyf7ro-hgdSLVncbfJI5Jazl2OUCskC3Mn5UPXWQ/viewform",

  // Used for the "For companies & universities" outreach block on the
  // Partnership page, and as the fallback address for the Join page
  // contact form (mailto).
  partnershipEmail: "cyberknights.eg@gmail.com",

  socials: [
    {
      id: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/share/1C2Ugdz5UQ/",
      description: "Community updates and announcements",
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/cyber.knight99",
      description: "Behind the scenes and event highlights",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/cyber-knights1/",
      description: "Professional network and achievements",
    },
    {
      // Handle is "cyperknight2" (not a typo to "fix") — matches the live account.
      id: "tiktok",
      label: "TikTok",
      url: "https://www.tiktok.com/@cyperknight2",
      description: "Short cybersecurity tips and clips",
    },
  ],

  nav: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Teams", to: "/teams" },
    { label: "Partnership", to: "/partnership" },
    { label: "Upcoming Events", to: "/upcoming-events" },
    { label: "Socials", to: "/socials" },
    { label: "Join Us", to: "/join" },
  ],

  missions: [
    {
      title: "Learn",
      body: "Hands-on labs, CTF practice, and workshops that take members from first login to real offensive and defensive skills.",
    },
    {
      title: "Connect to the industry",
      body: "Direct lines to working security professionals, partner companies, and the skills the job market actually asks for.",
    },
    {
      title: "Support students",
      body: "Mentorship, study groups, and a community that helps members stay in cybersecurity through their whole degree.",
    },
  ],

  // Home page, right after the Hero: what the club actually does.
  whatWeDo: [
    { title: "Learn", description: "Workshops, study groups & cybersecurity fundamentals." },
    { title: "Practice", description: "Hands-on labs, CTF challenges & technical exercises." },
    { title: "Compete", description: "University CTFs, team competitions & security challenges." },
    { title: "Connect", description: "Mentorship, industry exposure & career opportunities." },
  ],

  // About page, below the mission cards.
  whyUs: [
    {
      title: "Student-Led",
      body: "Built by students who actively compete and learn cybersecurity.",
    },
    { title: "Hands-On", body: "We focus on practical skills, not only theory." },
    { title: "Community-Driven", body: "Members learn, compete and build together." },
    {
      title: "Industry Connected",
      body: "We create bridges between students and the cybersecurity industry.",
    },
  ],

  // Never show a bare "0" for a stat — use a short qualitative label
  // ("TBD", "Growing", etc.) until a real number is confirmed.
  stats: [
    { label: "Members", value: "150+" },
    { label: "CTF Teams", value: "1" },
    { label: "Events", value: "TBD" }, // TODO: set real number of events held
    { label: "Partners", value: "1" },
  ],

  // Teams page: general focus areas Cyber Knights covers, shown as
  // descriptive tags alongside the active competitive team below.
  // Easy to extend with more entries as new areas become active.
  focusAreas: [
    "Web Security",
    "Digital Forensics",
    "Reverse Engineering",
    "Blue Team / SOC",
  ],

  teams: [
    {
      id: "el-fla73n",
      name: "EL FLA73N",
      tagline: "Capture The Flag division of Cyber Knights",
      achievements: [
        { event: "Regional CTF Qualifier", result: "Top 10 Finish" },
        { event: "Campus Security Jam", result: "1st Place — Web Track" },
      ],
      members: [
        { name: "Gerges Adel", role: "Forensics, Reverse Engineering" },
        { name: "Felopater Yohana", role: "Crypto" },
        { name: "Bassem Naser", role: "Web Exploitation" },
        { name: "Bishoy Salah", role: "Web Exploitation" },
        { name: "Elyaro Samir", role: "Web Exploitation" },
        { name: "Maria Melad", role: "Forensics" },
      ],
    },
  ],

  partners: [
    {
      id: "cyber-defender",
      name: "Cyber Defender",
      // Real file is in place at /public/partners/cyber-defender.png.
      // TODO: double-check this is the correct, final Cyber Defender logo asset.
      logo: "/partners/cyber-defender.png",
      description:
        "Official partnership bringing joint training and opportunities to Cyber Knights members.",
    },
  ],

  // Partnership page: generic collaboration blurb shown below the Cyber
  // Defender banner. Keep this free of any org name other than Cyber
  // Defender until a new partnership is confirmed — then either add a
  // new entry to `partners` above, or name them here directly.
  partnerships: {
    collaborationNote:
      "We collaborate with cybersecurity organizations, training providers, and academic communities to create practical opportunities for students.",
  },

  // Join page copy.
  join: {
    whoCanJoin:
      "LNU students interested in cybersecurity. Beginners are welcome. No previous CTF experience required.",
  },

  // Upcoming Events page: add a new entry here to add a new event card —
  // no component changes needed. Use "TBD" for date/location when not
  // yet confirmed; it will be shown plainly, not hidden. If ctaLink is
  // null, the card's button falls back to the site's joinUrl above.
  upcomingEvents: [
    {
      id: "freshman-session",
      name: "Freshman Orientation Session",
      description:
        "An introductory session for first-year students to learn about Cyber Knights and how to get involved.",
      date: "TBD",
      location: "TBD",
      ctaLabel: "Get notified",
      ctaLink: null,
    },
    {
      id: "the-knights-ctf",
      name: "The Knights CTF",
      description: "Our own CTF competition, open to students — details coming soon.",
      date: "TBD",
      location: "TBD",
      ctaLabel: "Get notified",
      ctaLink: null,
    },
  ],
  showUpcomingEvents: true,
};

export default config;
