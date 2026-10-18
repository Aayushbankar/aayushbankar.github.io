export interface TechNode {
  id: string;
  label: string;
  cluster: 'silicon-tooling' | 'kernel' | 'security' | 'systems' | 'edge-ai' | 'web-platform' | 'quantitative';
  level: string; // e.g. 'Daily Tooling', 'Empirical Verification', 'Production Proven'
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
  'silicon-tooling': {
    id: 'silicon-tooling',
    name: 'Silicon & Hardware Tooling',
    color: '#ff7a45',
    description: 'GDB multi-arch, hardware watchpoints, pahole struct alignment, QEMU/KVM micro-VMs, and ESP32 silicon.',
  },
  kernel: {
    id: 'kernel',
    name: 'Kernel Internals & Memory',
    color: '#f59e0b',
    description: 'SLUB allocator mechanics, kmalloc-192 freelists, epoll VFS queues, and eBPF kernel probes.',
  },
  security: {
    id: 'security',
    name: 'Vulnerability Research',
    color: '#ef4444',
    description: 'CVE-2026-46242 race condition, retpoline ROP pivots, Android GKI boundaries, and CVE threat scoring.',
  },
  systems: {
    id: 'systems',
    name: 'High-Throughput Systems',
    color: '#d97706',
    description: 'Rust zero-copy concurrency, SIMD AVX2 acceleration, BLAKE3 Merkle trees, and lock-free ring buffers.',
  },
  'edge-ai': {
    id: 'edge-ai',
    name: 'Offline Edge AI & Agents',
    color: '#84cc16',
    description: 'Sub-530ms voice pipelines, llama.cpp GGUF inference, local ReAct research agent, and ChromaDB RAG.',
  },
  'web-platform': {
    id: 'web-platform',
    name: 'Web & Campus Infrastructure',
    color: '#06b6d4',
    description: 'Production campus portals for 500+ daily peers, OneTimeShare Redis atomic engine, Astro, and self-hosted Linux.',
  },
  quantitative: {
    id: 'quantitative',
    name: 'Quantitative Simulation',
    color: '#a855f7',
    description: 'Discrete-event backtesting with realistic SEBI statutory friction and market impact curves.',
  },
};

export const techNodes: TechNode[] = [
  // ── 01. Silicon & Hardware Tooling ──
  {
    id: 'gdb-multiarch',
    label: 'GDB Multi-Arch & Scripting',
    cluster: 'silicon-tooling',
    level: 'Daily Exploit Tooling',
    summary: 'Automated breakpoint orchestration, instruction patching (b . loops), and register dumps via GDB Python API.',
    evidence: 'exp015_gdb.py and expect_qemu.exp orchestrating deterministic thread preemption in QEMU.',
  },
  {
    id: 'hardware-watchpoints',
    label: 'Hardware Watchpoints (perf / ptrace)',
    cluster: 'silicon-tooling',
    level: 'Empirical Verification',
    summary: 'Configuring CPU hardware watchpoints to detect concurrent memory writes without artificial race skew.',
    evidence: 'VER-026 verification catching concurrent NULL write to refs.first at offset 160 of freed struct eventpoll.',
  },
  {
    id: 'pahole-dwarf',
    label: 'pahole & DWARF Struct Analysis',
    cluster: 'silicon-tooling',
    level: 'Kernel Binary Analysis',
    summary: 'Extracting kernel struct layouts, cache-line holes, and compiler alignment to prevent offset desync.',
    evidence: 'Pahole inspection proving timerfd_ctx is 248B on x86_64, falling into kmalloc-256 instead of 192.',
  },
  {
    id: 'qemu-kvm',
    label: 'QEMU / KVM Micro-VM Harness',
    cluster: 'silicon-tooling',
    level: 'Lab Infrastructure',
    summary: 'Hermetic micro-VM testbenches booting custom patched Linux kernels in <400ms with remote GDB stubs.',
    evidence: 'Zero-cost local reproduction framework on EndeavourOS laptop for kernelCTF and Android GKI.',
  },
  {
    id: 'retpoline-thunks',
    label: 'Retpoline Trampolines (__x86_return_thunk)',
    cluster: 'silicon-tooling',
    level: 'Mitigation Analysis',
    summary: 'Analyzing speculative execution mitigations that strip bare ret instructions, requiring rare assembly pivots.',
    evidence: 'Documented research on __x86_return_thunk blocking generic ROP in 375MB vmlinux binary.',
  },
  {
    id: 'esp32-silicon',
    label: 'ESP32 Silicon & IoT Protocol Stack',
    cluster: 'silicon-tooling',
    level: 'Hardware Engineering',
    summary: 'Direct microcontroller programming, sensor interfacing, and low-power telemetry via MQTT & CoAP.',
    evidence: 'Govt. Polytechnic Gandhinagar 100% practical assessment coursework with ESP32 Arduino IDE.',
  },

  // ── 02. Kernel Internals & Memory Subsystems ──
  {
    id: 'c-lang',
    label: 'C (POSIX & Kernel Internals)',
    cluster: 'kernel',
    level: 'Core Baseline',
    summary: 'Pointer mechanics, container_of() macros, anonymous inodes, and direct syscall ioctls.',
    evidence: 'Hermetic exploit harnesses and low-level kernel C reproductions in QEMU.',
  },
  {
    id: 'slub-allocator',
    label: 'SLUB Allocator Mechanics',
    cluster: 'kernel',
    level: 'Deep Memory Architecture',
    summary: 'Kernel freelists, kmalloc-192 caches, slab pages, cross-cache reclamation, and dev_null grooming.',
    evidence: 'Deterministic msg_msg heap spraying into kmalloc-192 validated against KASAN.',
  },
  {
    id: 'epoll-vfs',
    label: 'Linux Epoll & VFS File Tables',
    cluster: 'kernel',
    level: 'Subsystem Internals',
    summary: 'fdtable array management, eventpoll_release_file lifecycle, and lockless fast-path race windows.',
    evidence: 'Single source-of-truth breakdown of include/linux/eventpoll.h READ_ONCE lockless path.',
  },
  {
    id: 'ebpf-probes',
    label: 'eBPF & libbpf Telemetry',
    cluster: 'kernel',
    level: 'High-Performance Tracing',
    summary: 'In-kernel ring buffers (BPF_MAP_TYPE_RINGBUF), tracepoints, and sub-microsecond event capture.',
    evidence: 'Host telemetry ingestion sustaining 13,247 EPS/core in SPECTRE-PRISM and Project Spectre HIDS.',
  },
  {
    id: 'credentials-struct',
    label: 'struct cred & Privilege Escalation',
    cluster: 'kernel',
    level: 'Exploit Primitives',
    summary: 'Process credentials layout, commit_creds(prepare_kernel_cred(0)), and arbitrary pipe buffer R/W.',
    evidence: 'Exploit primitive hunt for privilege escalation without unconstrained code execution.',
  },

  // ── 03. Vulnerability Research & Exploits ──
  {
    id: 'bad-epoll',
    label: 'CVE-2026-46242 (Bad Epoll)',
    cluster: 'security',
    level: 'Root PoC & Whitepaper',
    summary: 'UAF race condition in Linux epoll subsystem yielding local root execution on 6.12.67.',
    evidence: '26-page technical whitepaper, 31-entry engineering log, and verified QEMU root exploit.',
    artifactUrl: '/research/cve-2026-46242-bad-epoll',
  },
  {
    id: 'contacts-sqli',
    label: 'CVE-2026-28576 (Android SQLi)',
    cluster: 'security',
    level: 'Full Disclosure',
    summary: 'SQL injection vulnerability in Android Contacts ContentProvider URI query projection.',
    evidence: 'Coordinated vendor disclosure, proof-of-concept APK harness, and defense mitigations.',
    artifactUrl: '/research/cve-2026-28576-android-contacts-sqli',
  },
  {
    id: 'android-gki',
    label: 'Android GKI 6.1 (ARM64)',
    cluster: 'security',
    level: 'Research Collaboration',
    summary: 'Porting epoll race conditions to ARM64 GKI across 102,740 test runs at CypherMatrix.',
    evidence: 'Documented verification ledger (42 claims) and dead-ends register analyzing kCFI & PAC.',
  },
  {
    id: 'cve-aggregator',
    label: 'CVE Intelligence Platform',
    cluster: 'security',
    level: 'Production System',
    summary: 'Modular threat intelligence platform prioritizing vulnerabilities via NVD API v2.0 & CISA KEV feeds.',
    evidence: 'Self-healing exponential backoff, thread-safe APScheduler SQLite pipeline, and regex watchlists.',
    artifactUrl: '/systems/cve-aggregator',
  },
  {
    id: 'security-certs',
    label: 'CAP v2 & CNSP Certifications',
    cluster: 'security',
    level: 'Industry Certified',
    summary: 'Certified AppSec Practitioner v2 and Certified Network Security Practitioner from The SecOps Group.',
    evidence: 'Formal credentials earned June 17, 2026 covering OWASP Top 10, secure SDLC, and protocol audits.',
  },

  // ── 04. High-Throughput Systems & Rust ──
  {
    id: 'rust-lang',
    label: 'Rust Systems Programming',
    cluster: 'systems',
    level: 'Production Grade',
    summary: 'Thread safety without garbage collection, zero-copy byte slicing, and compile-time concurrency.',
    evidence: 'Core engine language for SPECTRE-PRISM and cryptographic Merkle tree sealing.',
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
    label: 'BLAKE3 & RFC 6962 Merkle Trees',
    cluster: 'systems',
    level: 'Cryptographic Audit',
    summary: 'Tamper-evident tree-hashed log sealing providing logarithmic-size O(log N) inclusion proofs.',
    evidence: 'RFC 6962 audit transparency integrated into real-time log ingestion pipeline.',
  },
  {
    id: 'simd-avx2',
    label: 'SIMD AVX2 Vectorization',
    cluster: 'systems',
    level: 'Hardware Optimization',
    summary: 'Vectorized byte scanning, token boundary discovery, and string pattern matching.',
    evidence: '4.8x speedup over scalar tokenizers on Intel i5-8350U CPU.',
  },
  {
    id: 'lockfree-ring',
    label: 'Lock-Free Ring Buffers',
    cluster: 'systems',
    level: 'Low-Latency Concurrency',
    summary: 'Single-producer multi-consumer cross-thread ring buffers avoiding mutex lock contention.',
    evidence: 'Sustained microsecond tail latencies across 4 CPU cores on EndeavourOS.',
  },

  // ── 05. Offline Edge AI & Agents ──
  {
    id: 'rig-8gb',
    label: '8GB Hardware Rig Baseline',
    cluster: 'edge-ai',
    level: 'Execution Constraint Floor',
    summary: 'HP EliteBook 840 G5 (i5-8350U, 8GB RAM, EndeavourOS) acting as mandatory execution floor.',
    evidence: 'Zero swap thrash during concurrent local LLM inference and kernel micro-VM boots.',
  },
  {
    id: 'llama-cpp',
    label: 'llama.cpp & GGUF Quantization',
    cluster: 'edge-ai',
    level: 'Local Inference',
    summary: 'Running Q4_K_M quantized 3B/7B language models in ~4.2 GB RSS purely on laptop CPU.',
    evidence: '100% offline conversational logic in Wolvie voice assistant at ₹0 API cost.',
  },
  {
    id: 'wolvie-assistant',
    label: 'Wolvie Voice Pipeline',
    cluster: 'edge-ai',
    level: 'Production System',
    summary: 'Sub-530ms voice assistant combining Silero VAD, faster-whisper INT8, and Piper neural TTS.',
    evidence: 'Complete offline desktop voice assistant running smoothly on 8GB hardware.',
    artifactUrl: '/systems/wolvie',
  },
  {
    id: 'privata-rag',
    label: 'Privata Offline RAG',
    cluster: 'edge-ai',
    level: 'Local Vector Search',
    summary: 'Offline-first document ingestion and semantic query tool using Sentence Transformers and ChromaDB.',
    evidence: 'Enables AI-powered semantic search over private documents without cloud servers or GPUs.',
    artifactUrl: '/systems/privata',
  },
  {
    id: 'kafka-gpt2',
    label: 'Kafka GPT-2 Fine-Tuning',
    cluster: 'edge-ai',
    level: 'Model Training',
    summary: 'Fine-tuning GPT-2 on Franz Kafka literary works to generate existential narrative prose.',
    evidence: 'Deployed model on Hugging Face: bankar404/kafka-gpt2-story-generator.',
    artifactUrl: '/systems/kafka-story-generator',
  },

  // ── 06. Web & Campus Infrastructure ──
  {
    id: 'it-portal',
    label: 'Govt. Polytechnic IT Portal',
    cluster: 'web-platform',
    level: 'Campus Production',
    summary: 'Official campus department portal engineered and maintained for 500+ daily peers and faculty.',
    evidence: 'Headless CMS via Google Drive API + Jekyll CI/CD running reliably with sub-second page loads.',
    artifactUrl: '/systems/it-department-portal',
  },
  {
    id: 'onetimeshare',
    label: 'OneTimeShare Ephemeral Service',
    cluster: 'web-platform',
    level: 'Production System',
    summary: 'Secure ephemeral file sharing built with Flask, Redis atomic MULTI/EXEC, and UUID tokens.',
    evidence: 'Race-condition-free single-use downloads with TTL-based automatic Redis expiration.',
    artifactUrl: '/systems/onetimeshare',
  },
  {
    id: 'astro-tailwind',
    label: 'Astro 7 & Modern ESM',
    cluster: 'web-platform',
    level: 'Static-First Architecture',
    summary: 'Zero-JS baseline hydration, ClientRouter transitions, TypeScript, and Tailwind CSS v4 design systems.',
    evidence: 'Production dossier portfolio building in <3 seconds across 23 static routes.',
  },
  {
    id: 'gsap-motion',
    label: 'GSAP 3.15 ScrollTrigger',
    cluster: 'web-platform',
    level: 'Kinetic Interface Engineering',
    summary: 'Hardware-accelerated viewport reveals, spring physics, and responsive reduced-motion adaptation.',
    evidence: 'Fluid 60fps animations respecting prefers-reduced-motion across devices.',
  },
  {
    id: 'linux-hosting',
    label: 'Linux Self-Hosting & Daemons',
    cluster: 'web-platform',
    level: 'Operational DevOps',
    summary: 'Systemd service units, Nginx reverse proxies, SSL certificates, and firewall hardening.',
    evidence: 'Running self-hosted campus portals and telemetry nodes without paid cloud infrastructure.',
  },

  // ── 07. Quantitative Simulation ──
  {
    id: 'quantlab',
    label: 'QuantLab Simulation Engine',
    cluster: 'quantitative',
    level: 'Financial Systems',
    summary: 'Discrete-event financial simulator modeling trade executions under market impact and slippage.',
    evidence: 'Tested across 1,000+ simulated market regimes with automated drawdown verification.',
    artifactUrl: '/systems/quantlab',
  },
  {
    id: 'market-friction',
    label: 'SEBI Statutory Friction Model',
    cluster: 'quantitative',
    level: 'Microstructure Modeling',
    summary: 'Explicit modeling of Securities Transaction Tax (STT), exchange turnover, and GST drag.',
    evidence: 'Proves how statutory friction erodes naive trading alpha in Indian markets.',
  },
];

export const techEdges: TechEdge[] = [
  // Silicon Tooling & Hardware connections
  { source: 'gdb-multiarch', target: 'qemu-kvm', relation: 'Remote GDB Stubs' },
  { source: 'gdb-multiarch', target: 'bad-epoll', relation: 'Breakpoint Orchestration' },
  { source: 'hardware-watchpoints', target: 'bad-epoll', relation: 'VER-026 Concurrent Write' },
  { source: 'pahole-dwarf', target: 'slub-allocator', relation: 'Cache-Line Alignment' },
  { source: 'pahole-dwarf', target: 'bad-epoll', relation: 'kmalloc-192 Size Check' },
  { source: 'retpoline-thunks', target: 'bad-epoll', relation: 'Bare RET Gadget Search' },
  { source: 'esp32-silicon', target: 'linux-hosting', relation: 'MQTT Telemetry Link' },
  { source: 'c-lang', target: 'esp32-silicon', relation: 'Firmware C++ Driver' },
  { source: 'qemu-kvm', target: 'c-lang', relation: 'Hermetic Repro Lab' },

  // Kernel & Memory connections
  { source: 'c-lang', target: 'epoll-vfs', relation: 'Syscall Invocations' },
  { source: 'c-lang', target: 'slub-allocator', relation: 'Heap Memory Allocation' },
  { source: 'slub-allocator', target: 'bad-epoll', relation: 'kmalloc-192 msg_msg Spray' },
  { source: 'epoll-vfs', target: 'bad-epoll', relation: 'Lockless Fast-Path UAF' },
  { source: 'credentials-struct', target: 'bad-epoll', relation: 'commit_creds Target' },
  { source: 'ebpf-probes', target: 'c-lang', relation: 'Kernel Tracepoints' },
  { source: 'ebpf-probes', target: 'spectre-prism', relation: 'Zero-Copy Log Stream' },

  // Security & Exploit connections
  { source: 'bad-epoll', target: 'android-gki', relation: 'ARM64 GKI 6.1 Port' },
  { source: 'android-gki', target: 'contacts-sqli', relation: 'Android Security Auditing' },
  { source: 'cve-aggregator', target: 'security-certs', relation: 'CAP / CNSP Principles' },
  { source: 'security-certs', target: 'bad-epoll', relation: 'Vulnerability Analysis' },

  // Systems & Rust connections
  { source: 'rust-lang', target: 'spectre-prism', relation: 'Core Implementation' },
  { source: 'spectre-prism', target: 'blake3-merkle', relation: 'Tamper-Proof Audit Tree' },
  { source: 'spectre-prism', target: 'simd-avx2', relation: 'Vectorized Byte Scanning' },
  { source: 'spectre-prism', target: 'lockfree-ring', relation: 'Cross-Core Ring Buffer' },

  // Edge AI & Agent connections
  { source: 'rig-8gb', target: 'llama-cpp', relation: '4.2GB Memory RSS Ceiling' },
  { source: 'rig-8gb', target: 'wolvie-assistant', relation: 'Physical Execution Rig' },
  { source: 'llama-cpp', target: 'wolvie-assistant', relation: 'Offline Reasoning Engine' },
  { source: 'llama-cpp', target: 'privata-rag', relation: 'Offline Vector Ingestion' },

  // Web & Infrastructure connections
  { source: 'it-portal', target: 'linux-hosting', relation: 'Zero-Budget Deployment' },
  { source: 'onetimeshare', target: 'linux-hosting', relation: 'Redis Service Units' },
  { source: 'astro-tailwind', target: 'gsap-motion', relation: 'Kinetic Scroll Timeline' },
  { source: 'astro-tailwind', target: 'it-portal', relation: 'Web Architecture' },

  // Quantitative connections
  { source: 'quantlab', target: 'market-friction', relation: 'Statutory Drag Engine' },
  { source: 'rust-lang', target: 'quantlab', relation: 'Discrete Event Simulation' },
];
