export interface TimelineMilestone {
  period: string;
  year: string;
  title: string;
  organization: string;
  role: string;
  summary: string;
  highlights: string[];
  tags: string[];
  type: 'professional' | 'technical';
  track: 'production' | 'security' | 'systems';
  trackLabel: string;
  metric: { value: string; label: string };
  retrospective: string;
}

export const careerTimeline: TimelineMilestone[] = [
  {
    year: '2024',
    period: 'Mid 2024',
    title: 'Web Engineering Foundations',
    organization: 'WayToWeb Technologies',
    role: 'Web Development Intern',
    summary:
      'Hands-on engineering focusing on web application fundamentals, DOM architectures, and responsive layout systems.',
    highlights: [
      'Engineered interactive UI modules and resolved cross-browser rendering edge cases',
      'Worked with client-server data flows and relational schema queries',
    ],
    tags: ['Web Protocols', 'Frontend Systems', 'JavaScript'],
    type: 'professional',
    track: 'production',
    trackLabel: 'Campus & Production Track',
    metric: { value: '100%', label: 'Hands-on Browser Groundwork' },
    retrospective:
      'Taught me that abstractions leak quickly across browsers; mastering DOM lifecycles and HTTP requests directly without bloated frameworks was foundational.',
  },
  {
    year: '2025',
    period: '2025 — Present',
    title: 'Department Portal Architecture',
    organization: 'Govt. Polytechnic Gandhinagar',
    role: 'Lead Developer',
    summary:
      'Architected and actively maintain the official web portal for the Information Technology department, serving 500+ daily active students and faculty.',
    highlights: [
      'Self-hosted static and dynamic resources with sub-second page loads',
      'Zero-budget deployment running reliably for the entire campus cohort',
      'Maintained academic CPI of 8.60 / 10.0 in parallel with production development',
    ],
    tags: ['500+ Active Users', 'Production Web', 'Architecture'],
    type: 'professional',
    track: 'production',
    trackLabel: 'Campus & Production Track',
    metric: { value: '500+', label: 'Daily Active Campus Peers' },
    retrospective:
      'When you are solely accountable to 500+ peers and professors, you cannot blame hosting providers. Designing for zero-budget self-hosted Linux taught me real operational discipline.',
  },
  {
    year: '2025',
    period: 'Late 2025',
    title: 'Temporal Graph HIDS Fellowship',
    organization: 'IBM SkillsBuild / CSRBOX',
    role: 'Cybersecurity Research Fellow',
    summary:
      'Engineered Project Spectre: a host-level intrusion detection architecture modeling OS process executions as continuous dynamic graphs.',
    highlights: [
      'Instrumented Linux kernel syscall telemetry via eBPF probes',
      'Constructed GCN + GRU spatial-temporal anomaly scoring pipelines',
      'Completed 48 intensive enterprise security modules',
    ],
    tags: ['eBPF Probes', 'Host Telemetry', 'IBM Certified'],
    type: 'professional',
    track: 'security',
    trackLabel: 'Security Research Track',
    metric: { value: '48 / 50', label: 'Enterprise Security Modules' },
    retrospective:
      'First deep dive into kernel telemetry. Revealed that naive user-space log monitoring misses malicious kernel transitions; you must observe events at the syscall boundary.',
  },
  {
    year: '2026',
    period: 'July 2026',
    title: 'Kernel Vulnerability Research',
    organization: 'CypherMatrix',
    role: 'Cybersecurity Research Intern',
    summary:
      'Deep-dive Linux kernel vulnerability research centered on CVE-2026-46242 (Bad Epoll), reproducing root execution in hermetic QEMU environments.',
    highlights: [
      'Achieved local root on Linux 6.12.67 via two-stage ROP pivot under CONFIG_RETPOLINE',
      'Implemented cross-cache slab reclamation with msg_msg heap spraying in kmalloc-192',
      'Authored a comprehensive 26-page technical whitepaper and 31-entry engineering log',
    ],
    tags: ['Linux Kernel 6.12', 'Root Exploit', 'CVE-2026-46242', 'QEMU/GDB'],
    type: 'professional',
    track: 'security',
    trackLabel: 'Security Research Track',
    metric: { value: '26 Pgs', label: 'Technical Whitepaper & PoC' },
    retrospective:
      'Proved that AI models hallucinate struct offsets under specific compiler flags. Every instruction and ROP gadget must be manually confirmed under GDB breakpoints on physical silicon.',
  },
  {
    year: '2026',
    period: '2026 — Present',
    title: 'Systems Security & Research Collaboration',
    organization: 'CypherMatrix',
    role: 'Long-Term Research Collaboration',
    summary:
      'Transitioned into ongoing security research focusing on Android platform boundaries, hardware GPU driver primitives, and high-performance systems engineering.',
    highlights: [
      'Ported epoll race analysis to Android GKI 6.1 ARM64 across 102,740 test iterations',
      'Cataloged hardware driver vulnerabilities across consumer Mali and Adreno GPUs',
      'Built high-performance UI interactions using GSAP ScrollTrigger and memory-safe flows',
    ],
    tags: ['Android GKI', 'Mali/Adreno GPUs', 'Systems Security', 'Research'],
    type: 'professional',
    track: 'security',
    trackLabel: 'Security Research Track',
    metric: { value: '102.7k', label: 'ARM64 Test Iterations' },
    retrospective:
      'Moving from standard x86_64 to ARM64 Android GKI proved that memory models, PAC, and SELinux policies fundamentally alter exploit viability. Methodical iteration beats guesswork.',
  },
  {
    year: '2026+',
    period: 'Active Track',
    title: 'Smart India Hackathon & Academic Lateral Entry',
    organization: 'SIH 2026 / DDCET',
    role: 'Lead Systems Engineer (Team Spectre)',
    summary:
      'Cleared institutional screening for SIH 2026 with SPECTRE-PRISM log pre-processing engine, currently competing in national screening while preparing for B.E. lateral entry.',
    highlights: [
      'Benchmarked Rust/eBPF ingestion at 13,247 EPS/core with RFC 6962 BLAKE3 Merkle proofs',
      'Active candidate for NTRO universal log pre-processing problem statement',
      'Preparing for DDCET lateral-entry examination into Bachelor of Engineering (B.E.)',
    ],
    tags: ['SIH 2026 Screening', 'Rust Systems', 'DDCET → B.E.'],
    type: 'professional',
    track: 'systems',
    trackLabel: 'High-Throughput Systems Track',
    metric: { value: '13,247', label: 'EPS/core Sustained Ingestion' },
    retrospective:
      'Translating research insights into high-throughput production Rust. Balancing SIH national competition, 8.60 academic CPI, and upcoming B.E. entrance exam.',
  },
];

export const technicalProgression = [
  {
    level: '01',
    phase: 'FOUNDATIONS & TOOLING',
    skills: 'C Programming · x86_64 Assembly · GDB Python Scripting · Linux Internals',
    detail:
      'Mastered raw pointer arithmetic, memory allocators, POSIX system calls, and building hermetic QEMU/KVM lab harnesses for kernel debugging.',
  },
  {
    level: '02',
    phase: 'LOCAL EDGE AI & AUDIO',
    skills: 'Silero VAD · faster-whisper · llama.cpp GGUF · Piper TTS · WebRTC',
    detail:
      'Constructed completely offline, sub-530ms voice-to-voice pipelines on consumer hardware without sending audio bytes to any cloud API.',
  },
  {
    level: '03',
    phase: 'HIGH-THROUGHPUT SYSTEMS',
    skills: 'Rust · eBPF Tracepoints · Lock-Free Ring Buffers · SIMD AVX2 · BLAKE3 Merkle Trees',
    detail:
      'Architected event ingestion engines capable of sustained 13,000+ events/sec per core with cryptographic tamper-evident audit transparency.',
  },
  {
    level: '04',
    phase: 'VULNERABILITY RESEARCH',
    skills: 'Kernel SLUB Mechanics · ROP/JOP Gadget Chains · Android Binder IPC · Mitigation Auditing',
    detail:
      'Dissecting race conditions, finding compiler offset bugs, evaluating kCFI/PAC/SELinux mitigations, and publishing empirical ledgers with reproducible proofs.',
  },
];
