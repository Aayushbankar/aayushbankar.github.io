export interface Credential {
  id: string;
  title: string;
  issuer: string;
  status: string;
  date: string;
  detail: string;
}

export interface CompetencyGroup {
  category: string;
  skills: string[];
}

export const profile = {
  name: 'Aayush Bankar',
  age: 18,
  title: 'Generalist Builder, Systems & Security Researcher',
  role: 'Student & Generalist Builder',
  company: 'CypherMatrix (Research Collaborator)',
  location: 'Gandhinagar, Gujarat, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST (UTC+5:30)',
  email: 'aayushbankar42@gmail.com',
  github: 'https://github.com/Aayushbankar',
  linkedin: 'https://www.linkedin.com/in/aayushbankar/',

  tagline: '18-year-old curious generalist builder exploring systems, security, and offline AI.',
  summary:
    '18-year-old student and builder from Gandhinagar, Gujarat. Moving across low-level systems, web engineering, edge AI audio, quant modeling, and vulnerability research — directing AI models to scaffold and explore fast, while personally diving deep to verify how things actually work under the hood.',

  domains: [
    {
      title: 'Vulnerability Research',
      desc: 'Analyzing kernel race conditions, heap layouts, and Android IPC boundaries with reproducible GDB harnesses.',
      tag: 'Kernel & Android',
    },
    {
      title: 'Systems Programming',
      desc: 'Building high-throughput event processing and monitoring tools using Rust, eBPF tracepoints, and SIMD parsing.',
      tag: 'Rust · C · eBPF',
    },
    {
      title: 'Edge AI & Audio',
      desc: 'Engineering local, low-latency conversational speech stacks (VAD + Whisper + llama.cpp + Piper) over WebRTC.',
      tag: 'Local AI · Audio',
    },
    {
      title: 'Quantitative Simulation',
      desc: 'Discrete event-driven backtesting modeling realistic market impact and statutory Indian tax friction.',
      tag: 'Python · Modeling',
    },
  ],

  education: {
    institution: 'Government Polytechnic Gandhinagar',
    degree: 'Diploma in Information Technology',
    cpi: '8.60 / 10.0',
    status: 'Final Year (Semester 6)',
    role: 'Lead Developer, Department Web Portal (itgpg.github.io, 500+ daily users)',
    nextStep: 'DDCET lateral-entry preparation → B.E. (Bachelor of Engineering)',
  },

  sih: {
    status: 'National Screening Round',
    competition: 'Smart India Hackathon (SIH 2026)',
    team: 'Team Spectre',
    problemStatement: 'SIH26156 (NTRO — Universal Log Pre-processing Framework)',
    verdict: 'Cleared internal college round; currently in national screening.',
  },

  labRig: {
    model: 'HP EliteBook 840 G5',
    cpu: 'Intel Core i5-8350U (4 Cores / 8 Threads @ 1.70 GHz, Turbo to 3.6 GHz)',
    ram: '8 GB DDR4 RAM',
    storage: '512 GB NVMe SSD',
    os: 'EndeavourOS (Arch Linux rolling, Linux 7.1 Kernel)',
    gpu: 'Intel UHD Graphics 620 (Integrated)',
    virtualization: 'QEMU/KVM with GDB telemetry & KASAN/UBSAN harnesses',
    edgeAi: 'llama.cpp CPU quantization (Q4_K_M GGUF, 100% offline on 8GB)',
  },

  credentials: [
    {
      id: '001',
      title: 'Certified AppSec Practitioner (CAP v2)',
      issuer: 'The SecOps Group',
      status: 'Verified',
      date: 'June 2026',
      detail: 'Web application security, OWASP Top 10, API testing, and common logic flaws.',
    },
    {
      id: '002',
      title: 'Certified Network Security Practitioner (CNSP)',
      issuer: 'The SecOps Group',
      status: 'Verified',
      date: 'June 2026',
      detail: 'Network protocols, traffic dissection, firewall configurations, and perimeter security.',
    },
    {
      id: '003',
      title: 'IBM SkillsBuild Professional Pathways',
      issuer: 'IBM',
      status: 'Completed (48/50 Modules)',
      date: '2025–2026',
      detail: 'Foundational coursework in enterprise security, system administration, and cloud environments.',
    },
    {
      id: '004',
      title: 'Diploma in Information Technology',
      issuer: 'Govt. Polytechnic Gandhinagar',
      status: 'CPI 8.60 / 10.0',
      date: '2024–2027',
      detail: 'Operating systems, computer networking, C/C++ programming, and web development.',
    },
  ] as Credential[],

  competencies: [
    {
      category: 'LOW-LEVEL & KERNEL',
      skills: [
        'Linux Kernel Subsystems',
        'C & x86_64 Assembly',
        'GDB Scripting & Telemetry',
        'QEMU / KVM Lab Harnesses',
        'SLUB Allocator Mechanics',
        'eBPF Tracepoints',
        'KASAN / Sanitizers',
      ],
    },
    {
      category: 'SECURITY & REVERSE ENGINEERING',
      skills: [
        'Vulnerability Teardowns',
        'Android Binder & IPC',
        'ContentProvider Security',
        'ROP Gadget Chains',
        'YARA Rule Writing',
        'Suricata Signatures',
        'Burp Suite',
      ],
    },
    {
      category: 'SYSTEMS & BACKEND',
      skills: [
        'Rust Systems Development',
        'eBPF Ring Buffers',
        'Event Ingestion & Parsing',
        'BLAKE3 & Merkle Structures',
        'Python & Flask',
        'Redis & SQLite',
        'Docker & Linux Admin',
      ],
    },
    {
      category: 'EDGE AI & PRACTICAL TOOLS',
      skills: [
        'llama.cpp Quantized Models',
        'Silero VAD Integration',
        'faster-whisper ASR',
        'Piper Neural TTS',
        'WebRTC Audio Streaming',
        'Local Vector Stores',
        'Jekyll & Static Sites',
      ],
    },
  ] as CompetencyGroup[],
};
