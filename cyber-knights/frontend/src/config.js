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

  // Small tracked/uppercase kicker line shown near the Hero, above the CTA
  // buttons. Not a replacement for the existing title/tagline/description.
  hero: {
    kicker: "TRAIN. PRACTICE. EVOLVE.",
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
    { label: "How We Work", to: "/how-we-work" },
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

  // Home page "WHAT WE DO" section — replaces the old 4-card Learn/Practice/
  // Compete/Connect grid with the full set of program areas. `color` is a
  // small accent hint only (a dot on the card), not a full theme.
  programs: [
    {
      id: "workshops",
      label: "Cybersecurity Workshops",
      color: "blue",
      description: "Hands-on sessions covering core security concepts.",
    },
    {
      id: "ctf",
      label: "CTF & Competitions",
      color: "red",
      description: "Team and individual capture-the-flag competitions.",
    },
    {
      id: "blue-team",
      label: "Blue Team / SOC",
      color: "green",
      description: "Defensive security, monitoring and incident response.",
    },
    {
      id: "forensics",
      label: "Digital Forensics / DFIR",
      color: "purple",
      description: "Investigating and analyzing digital evidence.",
    },
    {
      id: "web-security",
      label: "Web Security",
      color: "blue",
      description: "Finding and fixing vulnerabilities in web applications.",
    },
    {
      id: "reverse-engineering",
      label: "Reverse Engineering",
      color: "orange",
      description: "Analyzing binaries and understanding how software works.",
    },
    {
      id: "cloud-security",
      label: "Cloud Security",
      color: "cyan",
      description: "Securing cloud infrastructure and services.",
    },
    {
      id: "career-development",
      label: "Career Development",
      color: "indigo",
      description: "Resume help, mentorship and industry connections.",
    },
  ],

  // Home page "UPCOMING EVENT" section. No date/location/registration link
  // is invented — this stays TBD until real details are confirmed. If
  // ctaLink is null, the CTA falls back to the main joinUrl above.
  showUpcomingEvent: true,
  upcomingEvent: {
    name: "The Knights CTF",
    description: "Our own CTF competition, open to students — details coming soon.",
    date: "TBD",
    location: "TBD",
    ctaLabel: "Get notified",
    ctaLink: null,
  },

  // /upcoming-events page: the full list of events, shown as a card grid.
  // Separate from `upcomingEvent` above (which only feeds the single Home
  // page teaser) — add a new entry here to add a new event card, no
  // component changes needed. Use "TBD" for date/location when not yet
  // confirmed; it's shown plainly, not hidden. If ctaLink is null, the
  // card's button falls back to the site's joinUrl above.
  showUpcomingEvents: true,
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

  // Never show a bare "0" for a stat — use a short qualitative label
  // ("TBD", "Growing", etc.) until a real number is confirmed.
  stats: [
    { label: "Members", value: "150+" },
    { label: "CTF Teams", value: "1" },
    { label: "Events", value: "TBD" }, // TODO: set real number of events held
    { label: "Partners", value: "1" },
  ],

  // Teams page: focus-area teams Cyber Knights is building, shown alongside
  // the active competitive team below. `status: "forming"` gets a "Team
  // forming" badge; flip to "active" once a focus-area team is actually up
  // and running. Easy to extend with more entries as new areas start.
  focusAreas: [
    { label: "Web Security", status: "forming" },
    { label: "Digital Forensics", status: "forming" },
    { label: "Reverse Engineering", status: "forming" },
    { label: "Blue Team / SOC", status: "forming" },
  ],

  // Teams page: real, selected results for EL FLA73N, Cyber Knights' active
  // CTF team. This is the single source of truth for achievements — it also
  // powers the Home page teaser. Do not duplicate this data elsewhere.
  achievements: [
    {
      id: "ac3",
      competition: "AC3",
      result: "Top 14",
      scope: "National-level competition",
      description: "EL FLA73N competed in AC3 and achieved a Top 14 placement.",
    },
    {
      id: "cyber-talents",
      competition: "Cyber Talents",
      result: "Competed",
      scope: "Cybersecurity competition",
      description: "EL FLA73N participated in Cyber Talents.",
    },
    {
      id: "luxor-ctf",
      competition: "Luxor CTF",
      result: "2nd place",
      scope: "Local — Luxor",
      description: "EL FLA73N achieved 2nd place in a Luxor-level CTF competition.",
    },
    {
      id: "luxai",
      competition: "LUXAI",
      result: "30th place",
      scope: "CTF competition",
      description: "EL FLA73N achieved 30th place in LUXAI.",
    },
  ],

  teams: [
    {
      id: "el-fla73n",
      name: "EL FLA73N",
      tagline: "Capture The Flag division of Cyber Knights",
      status: "active",
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

  // /how-we-work page: the community's real training process, shown as a
  // vertical numbered timeline. Add/reorder entries here — no component
  // changes needed.
  howWeWork: [
    {
      id: "intro-session",
      title: "Welcome & Intro Session",
      description:
        "New members get an introductory session covering what cybersecurity is, what CTFs are, and how to study effectively.",
    },
    {
      id: "fundamentals-roadmap",
      title: "Fundamentals Roadmap",
      description:
        "A roadmap covering Networking, Linux, Python, and an introduction to cybersecurity (e.g. CompTIA Security+ or Cisco's Introduction to Cybersecurity).",
    },
    {
      id: "mentor-groups",
      title: "Mentor Groups",
      description:
        "Right after the intro session, members are split into groups, each led by a mentor who follows up on their progress and helps when they get stuck.",
    },
    {
      id: "red-vs-blue",
      title: "Red vs Blue Session",
      description:
        "Once the fundamentals are done, a dedicated session explains the difference between Red Team (offensive) and Blue Team (defensive) security, helping members choose their specialization.",
    },
    {
      id: "specialization-track",
      title: "Specialization Track",
      description:
        "Members are grouped with mentors matching their chosen track (Red or Blue) and given a roadmap to start that specialization.",
    },
    {
      id: "continued-support",
      title: "Continued Mentor Support",
      description:
        "Mentors keep helping with references, courses, and sponsored or discounted course opportunities when available.",
    },
    {
      id: "practice-experience",
      title: "Practice & Real Experience",
      description:
        "Members are encouraged to pursue internships, form CTF teams, and take part in competitions.",
    },
    {
      id: "career-readiness",
      title: "Career Readiness",
      description:
        "The overall goal is to prepare members with real, practical skills and experience for the job market.",
    },
  ],
};

export default config;
