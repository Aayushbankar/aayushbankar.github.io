export interface ScopedService {
  index: string;
  title: string;
  scope: string;
  deliverables: string[];
  timeline: string;
}

export interface GroundTruthFAQ {
  q: string;
  a: string;
}

export const collab = {
  headline: 'Connect & Collaborate',
  subheadline: 'Open for software engineering internships, junior systems roles, open research collaborations, and hackathons.',
  availability: {
    status: 'Open to Roles & Projects',
    note: '18-year-old student and generalist builder based in Gandhinagar, Gujarat. Open for software engineering internships, junior systems/web roles, open research collaborations, and hackathon teams.',
    location: 'Gandhinagar, Gujarat, India (IST / UTC+5:30)',
  },
  services: [
    {
      index: '01',
      title: 'Software & Systems Engineering Roles',
      scope: 'Open for internships or junior engineering roles across full-stack web engineering, low-level systems (C/Rust), or security analysis where I can contribute fast prototyping and rigorous verification.',
      deliverables: [
        'Full-stack web engineering with modern frameworks and robust backend services',
        'Low-level C and Rust systems engineering with clean POSIX/Linux APIs',
        'Hermetic QEMU/KVM test harnesses and automated benchmark validation',
        'Direct, communicative collaboration across Git workflows and Linux environments',
      ],
      timeline: 'Immediate & Summer 2026',
    },
    {
      index: '02',
      title: 'Vulnerability Research & Bug Reproduction',
      scope: 'Collaborating with security researchers, bug hunters, and academic labs to build hermetic QEMU harnesses, step through kernel/Android race conditions under GDB, and verify root causes.',
      deliverables: [
        'Hermetic QEMU/KVM reproduction harness with automated GDB Python telemetry',
        'Empirical verification ledger detailing every tested claim, address, and offset',
        'Explicit dead-ends register documenting non-viable exploitation paths',
        'Vendor remediation notes, reproduction artifacts, and defensive detection rules',
      ],
      timeline: 'Open collaboration / Sprint',
    },
    {
      index: '03',
      title: 'Hackathons & Local-First Systems',
      scope: 'Teaming up for national hackathons (like SIH), collegiate challenges, or building local-first open-source tools (offline voice stacks, SIMD log engines, ephemeral vaults) on modest hardware.',
      deliverables: [
        'High-velocity architecture and working MVP delivery under tight deadlines',
        'Local-first edge AI pipelines optimized for standard x86_64 consumer laptops',
        'Cryptographic verification proofs (BLAKE3 Merkle trees, Ed25519 signatures)',
        'Technical presentation and transparent benchmark reproducibility artifacts',
      ],
      timeline: 'Hackathon & sprint cycles',
    },
  ] as ScopedService[],

  faqs: [
    {
      q: 'What is your current academic status?',
      a: 'I am 18 years old and in the final semester of my Information Technology Diploma at Government Polytechnic Gandhinagar, holding an academic CPI of 8.60/10.00. I am preparing for the DDCET examination for lateral entry into B.E. Computer Engineering.',
    },
    {
      q: 'How do you balance AI assistance with manual engineering?',
      a: 'I use frontier AI models aggressively as scaffolding catalysts—to draft initial test harnesses, parse specs, and explore CVE vectors quickly. But I never trust AI outputs on memory layout: I manually verify every struct offset, assembly instruction under GDB, and timing window in local QEMU micro-VMs before trusting it.',
    },
    {
      q: 'What is your physical test bench setup?',
      a: 'All my work is done on an HP EliteBook 840 G5 laptop running EndeavourOS (Arch Linux rolling) with an Intel Core i5-8350U CPU and 8 GB of RAM. Every project, from local quantized LLMs to kernel exploits, is designed to run deterministically on this machine without paid cloud GPU clusters.',
    },
    {
      q: 'Are you open to remote or relocated positions?',
      a: 'Yes. I am based in Gandhinagar, Gujarat (IST, UTC+5:30). I am fully set up for remote engineering worldwide, and open to relocation across major Indian tech hubs for the right engineering opportunity.',
    },
  ] as GroundTruthFAQ[],
};
