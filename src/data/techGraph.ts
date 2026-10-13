export interface TechNode {
  id: string;
  label: string;
  cluster: 'kernel' | 'security' | 'systems' | 'edge-ai' | 'web-platform' | 'quantitative';
  level: string; // e.g. 'Advanced', 'Proficient', 'Production Proven'
  summary: string;
  evidence: string;
  artifactUrl?: string;
  x?: number;
  y?: number;
}

export interface TechEdge {
  source: string;
  target: string;
  relation: string;
}

export interface ClusterMeta {
  id: string;
  name: string;
  color: string;
  description: string;
}

export const graphClusters: Record<string, ClusterMeta> = {
  kernel: {
    id: 'kernel',
    name: 'Low-Level & Kernel',
    color: '#ff7a45',
    description: 'Pointer mechanics, OS subsystems, SLUB memory allocators, and hermetic micro-VMs.',
  },
  security: {
    id: 'security',
    name: 'Vulnerability Research',
    color: '#e05252',
    description: 'Linux race conditions, heap spraying, ROP gadgets, and Android security boundaries.',
  },
  systems: {
    id: 'systems',
    name: 'High-Throughput Systems',
    color: '#d9b36a',
    description: 'Rust zero-copy concurrency, eBPF tracepoints, BLAKE3 Merkle trees, and SIMD parsing.',
  },
  'edge-ai': {
    id: 'edge-ai',
    name: 'Offline Edge AI',
    color: '#9da65d',
    description: 'Sub-530ms conversational voice pipelines running 100% offline on an 8GB laptop CPU.',
  },
  'web-platform': {
    id: 'web-platform',
    name: 'Web & Campus Infrastructure',
    color: '#79c0ff',
    description: 'Production campus portals for 500+ daily peers, Astro, TypeScript, and self-hosted Linux.',
  },
  quantitative: {
    id: 'quantitative',
    name: 'Simulation & Markets',
    color: '#c8a24b',
    description: 'Discrete-event backtesting with realistic SEBI statutory friction and market impact curves.',
  },
};

export const techNodes: TechNode[] = [
  // ── Low-Level & Kernel ──
  {
    id: 'c-lang',
    label: 'C (POSIX / Systems)',
    cluster: 'kernel',
    level: 'Core Baseline',
    summary: 'Manual memory layout, pointer arithmetic, ioctl syscalls, and low-level networking.',
    evidence: 'Hermetic QEMU harnesses and zero-copy user-space memory inspectors.',
  },
  {
    id: 'asm-x86',
    label: 'x86_64 Assembly',
    cluster: 'kernel',
    level: 'Proficient',
    summary: 'Instruction disassembly, System V calling conventions, stack alignment, and gadget analysis.',
    evidence: 'Two-stage stack pivot under CONFIG_RETPOLINE for CVE-2026-46242.',
  },
  {
    id: 'linux-kernel',
    label: 'Linux Kernel Subsystems',
    cluster: 'kernel',
    level: 'Deep Research',
    summary: 'Epoll wait queues, VFS file tables, anonymous inodes, and scheduling race windows.',
    evidence: 'Deep analysis of Linux 6.12.67 epoll_ctl vs epoll_wait lifecycle.',
  },
  {
    id: 'slub-allocator',
    label: 'SLUB Allocator Mechanics',
    cluster: 'kernel',
    level: 'Specialized',
    summary: 'Object caches, kmalloc-192 freelists, slab pages, and cross-cache heap reclamation.',
    evidence: 'Deterministic msg_msg spraying in kmalloc-192 with KASAN validation.',
  },
  {
    id: 'ebpf-probes',
    label: 'eBPF & libbpf',
    cluster: 'kernel',
    level: 'Production Proven',
    summary: 'In-kernel ring buffers (BPF_MAP_TYPE_RINGBUF), kprobes, and low-overhead syscall tracing.',
    evidence: 'Kernel probe ingestion sustaining 13,247 EPS/core in SPECTRE-PRISM.',
  },
  {
    id: 'qemu-kvm',
    label: 'QEMU / KVM Lab Harness',
    cluster: 'kernel',
    level: 'Daily Tooling',
    summary: 'Hermetic micro-VMs booting custom Linux kernels in <400ms with automated GDB Python hooks.',
    evidence: 'Scripted reproduction harness for kernel vulnerabilities on EndeavourOS.',
  },

  // ── Vulnerability Research ──
  {
    id: 'bad-epoll',
    label: 'CVE-2026-46242 (Bad Epoll)',
    cluster: 'security',
    level: 'Whitepaper & Root PoC',
    summary: 'UAF race condition in Linux epoll subsystem yielding local root execution on 6.12.67.',
    evidence: '26-page technical whitepaper, 31-entry engineering log, and QEMU root exploit.',
    artifactUrl: '/research/cve-2026-46242-bad-epoll',
  },
  {
    id: 'contacts-sqli',
    label: 'CVE-2026-28576 (Android SQLi)',
    cluster: 'security',
    level: 'Full Disclosure',
    summary: 'SQL injection vulnerability in Android Contacts ContentProvider URI query projection.',
    evidence: 'Coordinated vendor report, test APK harness, and defense mitigations.',
    artifactUrl: '/research/cve-2026-28576-android-contacts-sqli',
  },
  {
    id: 'android-gki',
    label: 'Android GKI 6.1 (ARM64)',
    cluster: 'security',
    level: 'Research Collaborator',
    summary: 'Porting epoll race conditions to Android Generic Kernel Image across 102,740 test runs.',
    evidence: 'CypherMatrix research collaboration analyzing Binder IPC & hardware drivers.',
  },
  {
    id: 'rop-chains',
    label: 'ROP / JOP Gadget Chains',
    cluster: 'security',
    level: 'Verified Mechanics',
    summary: 'Cataloging gadget viability, stack pivot sequences, and register constraints under retpoline.',
    evidence: 'Displacement-verified gadget chain for commit_creds(prepare_kernel_cred(0)).',
  },
  {
    id: 'sanitizers',
    label: 'Sanitizers (KASAN / UBSan)',
    cluster: 'security',
    level: 'Empirical Verification',
    summary: 'Kernel address sanitizers, memory leak tracers, and undefined behavior diagnostics.',
    evidence: 'Zero false-positive panic triage across 1M+ synthetic tracepoints.',
  },
  {
    id: 'detection-rules',
    label: 'Detection Telemetry (Sigma/YARA)',
    cluster: 'security',
    level: 'Defensive Engineering',
    summary: 'Authoring AST Pratt parsers for Sigma rules and YARA signatures for static binaries.',
    evidence: 'Sub-15µs AST evaluation per event inside SPECTRE-PRISM engine.',
  },

  // ── High-Throughput Systems ──
  {
    id: 'rust-lang',
    label: 'Rust Systems Programming',
    cluster: 'systems',
    level: 'Production Grade',
    summary: 'Thread safety without GC, zero-copy slicing, borrow-checked memory guarantees, and SIMD.',
    evidence: 'Core implementation language of SPECTRE-PRISM and cryptographic Merkle logs.',
  },
  {
    id: 'spectre-prism',
    label: 'SPECTRE-PRISM Engine',
    cluster: 'systems',
    level: 'SIH 2026 National Screening',
    summary: '5-plane universal log pre-processing engine sustaining 13,247 EPS/core on an 8GB laptop.',
    evidence: 'Screening selection for Smart India Hackathon problem statement SIH26156.',
    artifactUrl: '/systems/spectre-prism',
  },
  {
    id: 'blake3-merkle',
    label: 'BLAKE3 & RFC 6962 Merkle',
    cluster: 'systems',
    level: 'Cryptographic Audit',
    summary: 'Tree-hashed cryptographic log sealing providing tamper-evident inclusion proofs.',
    evidence: 'RFC 6962 audit transparency integrated into real-time log ingestion pipeline.',
  },
  {
    id: 'simd-avx2',
    label: 'SIMD AVX2 Acceleration',
    cluster: 'systems',
    level: 'Hardware Optimization',
    summary: 'Vectorized byte scanning, token boundary discovery, and string pattern matching.',
    evidence: '4.8x speedup over scalar tokenizers on Intel i5-8350U CPU.',
  },
  {
    id: 'lockfree-ring',
    label: 'Lock-Free Ring Buffers',
    cluster: 'systems',
    level: 'Systems Concurrency',
    summary: 'Single-producer multi-consumer cross-thread ring buffers avoiding mutex lock overhead.',
    evidence: 'Sustained microsecond tail latencies across 4 CPU cores on EndeavourOS.',
  },

  // ── Offline Edge AI & Speech ──
  {
    id: 'rig-8gb',
    label: 'Everyday 8GB Rig Baseline',
    cluster: 'edge-ai',
    level: 'Quality Floor',
    summary: 'HP EliteBook 840 G5 (i5-8350U, 8GB RAM, EndeavourOS) acting as mandatory execution floor.',
    evidence: 'Zero swap thrash during concurrent local LLM inference and kernel micro-VM boots.',
  },
  {
    id: 'llama-cpp',
    label: 'llama.cpp & GGUF Quantization',
    cluster: 'edge-ai',
    level: 'Optimized Inference',
    summary: 'Running Q4_K_M quantized 3B/7B language models in ~4.2 GB RSS purely on laptop CPU.',
    evidence: '100% offline conversational logic in Wolvie voice assistant at ₹0 API cost.',
  },
  {
    id: 'silero-vad',
    label: 'Silero VAD (Voice Activity)',
    cluster: 'edge-ai',
    level: 'Real-Time Edge',
    summary: 'Ultra-lightweight neural speech detection triggering instantaneous STT transcription.',
    evidence: '<20ms speech boundary detection on raw microphone audio streams.',
  },
  {
    id: 'faster-whisper',
    label: 'faster-whisper (CTranslate2)',
    cluster: 'edge-ai',
    level: 'Optimized STT',
    summary: 'Quantized INT8 speech-to-text inference with low CPU usage and high accuracy.',
    evidence: 'Mean 180ms transcription latency on conversational voice segments.',
  },
  {
    id: 'piper-tts',
    label: 'Piper Neural TTS',
    cluster: 'edge-ai',
    level: 'Fast Speech Synthesis',
    summary: 'Lightweight onnxruntime neural speech synthesis generating high-quality voice audio.',
    evidence: 'Audio synthesis starting within 120ms of model token generation.',
  },
  {
    id: 'wolvie-assistant',
    label: 'Wolvie Voice Assistant',
    cluster: 'edge-ai',
    level: 'Deployed System',
    summary: 'Chained local conversational agent with 530ms total round-trip latency over local WebRTC.',
    evidence: 'Complete offline desktop voice assistant running smoothly on 8GB hardware.',
    artifactUrl: '/systems/wolvie',
  },

  // ── Web & Campus Platform ──
  {
    id: 'it-portal',
    label: 'Govt. Polytechnic IT Portal',
    cluster: 'web-platform',
    level: 'Production Deployment',
    summary: 'Official campus department portal engineered and maintained for 500+ daily peers and faculty.',
    evidence: 'Zero-budget self-hosted deployment running reliably with sub-second page loads.',
  },
  {
    id: 'typescript-esm',
    label: 'TypeScript & Modern ESM',
    cluster: 'web-platform',
    level: 'Daily Architecture',
    summary: 'Strict type safety, modern ECMAScript module standards, and client-side reactive state.',
    evidence: 'Powering campus tools, quantitative backtesters, and portfolio interfaces.',
  },
  {
    id: 'astro-tailwind',
    label: 'Astro 7 & Tailwind CSS v4',
    cluster: 'web-platform',
    level: 'Static-First Frontend',
    summary: 'Zero-JS baseline hydration, ClientRouter page transitions, and modern design systems.',
    evidence: 'Awwwards-caliber editorial dossier building in <3 seconds across 23 routes.',
  },
  {
    id: 'gsap-motion',
    label: 'GSAP 3.15 ScrollTrigger',
    cluster: 'web-platform',
    level: 'Motion Architecture',
    summary: 'Hardware-accelerated viewport reveals, magnetic physics, and respectful motion degradation.',
    evidence: 'Smooth 60fps animations respecting prefers-reduced-motion across devices.',
  },
  {
    id: 'postgres-sqlite',
    label: 'PostgreSQL & SQLite',
    cluster: 'web-platform',
    level: 'Data Architecture',
    summary: 'Relational schema design, indexed queries, transactions, and embedded SQLite ledgers.',
    evidence: 'Fast query performance on campus databases and backtest trade journals.',
  },
  {
    id: 'linux-hosting',
    label: 'Linux Self-Hosting & Nginx',
    cluster: 'web-platform',
    level: 'Operational DevOps',
    summary: 'Systemd service daemons, Nginx reverse proxies, SSL certificates, and firewall hardening.',
    evidence: 'Running self-hosted campus portals and telemetry nodes without paid SaaS.',
  },

  // ── Quantitative Simulation ──
  {
    id: 'quantlab',
    label: 'QuantLab Simulation Engine',
    cluster: 'quantitative',
    level: 'Research System',
    summary: 'Discrete-event financial simulator modeling trade executions under market impact and slippage.',
    evidence: 'Tested across 1,000+ simulated market regimes with automated drawdown verification.',
    artifactUrl: '/systems/quantlab',
  },
  {
    id: 'market-friction',
    label: 'SEBI Indian Statutory Friction',
    cluster: 'quantitative',
    level: 'Microstructure Modeling',
    summary: 'Explicit modeling of Securities Transaction Tax (STT), exchange turnover, and GST drag.',
    evidence: 'Proves how statutory friction erodes naive trading alpha in Indian markets.',
  },
];

export const techEdges: TechEdge[] = [
  // C / Assembly / Kernel connections
  { source: 'c-lang', target: 'linux-kernel', relation: 'Kernel API & Syscalls' },
  { source: 'c-lang', target: 'slub-allocator', relation: 'Memory Allocation' },
  { source: 'asm-x86', target: 'rop-chains', relation: 'Gadget Disassembly' },
  { source: 'linux-kernel', target: 'bad-epoll', relation: 'Subsystem Vulnerability' },
  { source: 'linux-kernel', target: 'slub-allocator', relation: 'Cache Architecture' },
  { source: 'linux-kernel', target: 'ebpf-probes', relation: 'Tracing Probes' },
  { source: 'linux-kernel', target: 'android-gki', relation: 'ARM64 Kernel Base' },
  { source: 'qemu-kvm', target: 'linux-kernel', relation: 'Hermetic Debug Lab' },
  { source: 'qemu-kvm', target: 'sanitizers', relation: 'KASAN Instrumentation' },

  // Security / Exploit connections
  { source: 'slub-allocator', target: 'bad-epoll', relation: 'kmalloc-192 Heap Spray' },
  { source: 'rop-chains', target: 'bad-epoll', relation: 'Retpoline Stack Pivot' },
  { source: 'sanitizers', target: 'bad-epoll', relation: 'UAF Race Verification' },
  { source: 'android-gki', target: 'bad-epoll', relation: 'ARM64 GKI 6.1 Port' },
  { source: 'android-gki', target: 'contacts-sqli', relation: 'Android IPC Security' },
  { source: 'detection-rules', target: 'spectre-prism', relation: 'Sigma Rule Engine' },

  // Systems / Rust connections
  { source: 'ebpf-probes', target: 'rust-lang', relation: 'libbpf Zero-Copy Ingestion' },
  { source: 'rust-lang', target: 'spectre-prism', relation: 'Core Implementation' },
  { source: 'spectre-prism', target: 'blake3-merkle', relation: 'Tamper-Proof Audit Tree' },
  { source: 'spectre-prism', target: 'simd-avx2', relation: 'Vectorized Token Parsing' },
  { source: 'spectre-prism', target: 'lockfree-ring', relation: 'Cross-Core Ring Buffer' },

  // Edge AI connections
  { source: 'rig-8gb', target: 'llama-cpp', relation: '4.2GB Memory Ceiling' },
  { source: 'rig-8gb', target: 'wolvie-assistant', relation: 'Physical Execution Rig' },
  { source: 'silero-vad', target: 'wolvie-assistant', relation: 'Trigger Detection' },
  { source: 'faster-whisper', target: 'wolvie-assistant', relation: 'Speech-to-Text' },
  { source: 'llama-cpp', target: 'wolvie-assistant', relation: 'Reasoning Engine' },
  { source: 'piper-tts', target: 'wolvie-assistant', relation: 'Neural Voice Synthesis' },

  // Web & Platform connections
  { source: 'it-portal', target: 'postgres-sqlite', relation: 'Database Backend' },
  { source: 'it-portal', target: 'linux-hosting', relation: 'Zero-Budget Self-Hosting' },
  { source: 'typescript-esm', target: 'it-portal', relation: 'Client Architecture' },
  { source: 'typescript-esm', target: 'astro-tailwind', relation: 'Type-Safe Components' },
  { source: 'astro-tailwind', target: 'gsap-motion', relation: 'Scroll Physics' },

  // Quantitative connections
  { source: 'quantlab', target: 'market-friction', relation: 'Statutory Drag Engine' },
  { source: 'rust-lang', target: 'quantlab', relation: 'High-Speed Discrete Sim' },
];
