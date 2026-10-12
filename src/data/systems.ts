export interface SystemBenchmark {
  label: string;
  value: string;
  detail: string;
}

export interface SystemPlane {
  id: string;
  name: string;
  detail: string;
}

export interface PipelineStage {
  stage: string;
  component: string;
  detail: string;
  latency: string;
}

export interface QuantChart {
  file: string;
  title: string;
  desc: string;
}

export interface SpecItem {
  key: string;
  value: string;
}

export interface SystemProject {
  id: string;
  index: string;
  name: string;
  category: string;
  domain: 'Systems & Low-Level' | 'Edge AI & Pipelines' | 'Quantitative Finance' | 'Security Intelligence' | 'Production & Platforms' | 'Creative Tech & WebGL';
  status: string;
  badgeType: 'brass' | 'ember' | 'moss' | 'default';
  tagline: string;
  description: string;
  overview: string;
  plateImage: string;
  benchmarks: SystemBenchmark[];
  specSheet: SpecItem[];
  planes?: SystemPlane[];
  pipeline?: PipelineStage[];
  charts?: QuantChart[];
  quantMetrics?: {
    universe: string;
    period: string;
    bars: string;
    costs: string;
    validation: string;
    sebiContext: string;
    dsr: string;
    oosDecay: string;
  };
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  articleSlug?: string;
  highlights: string[];
  verification: string;
}

export type FlagshipSystem = SystemProject;

export interface SecondarySystem {
  id: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  stats?: string;
  slug?: string;
}

export const allSystems: SystemProject[] = [
  {
    id: 'spectre-prism',
    index: 'S–01',
    name: 'SPECTRE-PRISM',
    category: 'High-Throughput Log & Detection Engine',
    domain: 'Systems & Low-Level',
    status: 'SIH 2026 National Screening',
    badgeType: 'ember',
    tagline: 'eBPF Event Ingestion & Sigma Detection in Rust',
    description:
      'High-throughput event processing and detection engine built in Rust and eBPF for the Smart India Hackathon (SIH 2026, NTRO problem statement). Ingests kernel tracepoints via zero-copy ring buffers, evaluates Sigma detection rules using a Pratt parser, and maintains an immutable audit log using BLAKE3 Merkle trees.',
    overview:
      'Engineered as a high-performance host intrusion telemetry daemon for high-risk Linux installations. Implements a 5-plane separation of concerns (Ingestion, Parsing, Normalization, Provenance, Presentation) to eliminate cross-subsystem locks. The eBPF kernel component streams raw sys_enter_execve and sys_enter_clone tracepoints across a 4 MB BPF_MAP_TYPE_RINGBUF to userspace, where a custom Pratt parser processes Sigma rules in single-digit microseconds without regex catastrophic backtracking. In-flight processes are tracked in a generational directed graph (petgraph StableDiGraph) that prevents PID recycling race conditions, while audit integrity is sealed via an RFC 6962 BLAKE3 transparency tree with Ed25519 quorum signing.',
    plateImage: '/figures/card-spectre-prism.svg',
    benchmarks: [
      {
        label: 'Ingestion Throughput',
        value: '13,247 EPS/core',
        detail: 'Zero-copy SIMD ring buffer stream per CPU core without packet drops',
      },
      {
        label: 'Sigma Evaluation',
        value: '2.55M evals/s',
        detail: 'Pratt AST evaluation (0.39 µs per rule evaluation in userspace)',
      },
      {
        label: 'p99 Ingestion Latency',
        value: '840 µs',
        detail: 'Kernel-to-userspace delivery over BPF ring buffer',
      },
      {
        label: 'Steady-State RSS',
        value: '5.2 MB',
        detail: 'Daemon memory profile (5.5 MB fully static musl binary)',
      },
      {
        label: 'GC Eviction Lock',
        value: '< 30 µs',
        detail: 'Min-heap process graph eviction latency under memory pressure',
      },
      {
        label: 'Test Suite',
        value: '16/16 Passed',
        detail: 'Full test pass rate across kernel tracepoints in <0.6s',
      },
    ],
    specSheet: [
      { key: 'Language & Runtime', value: 'Rust 1.80+ (musl static binary) / eBPF (CO-RE, libbpf-rs)' },
      { key: 'Kernel Interface', value: 'BPF_MAP_TYPE_RINGBUF (4 MB zero-copy ring buffer)' },
      { key: 'Tracepoints Audited', value: 'sys_enter_execve, sys_enter_clone, sys_enter_connect, sys_enter_socket' },
      { key: 'Rule Parsing Engine', value: 'Pratt Top-Down Operator Precedence Parser (Sigma YAML AST)' },
      { key: 'Process Graph Architecture', value: 'Generational petgraph StableDiGraph with PID + start_time_ns keying' },
      { key: 'Audit Ledger Structure', value: 'RFC 6962 Verifiable Merkle Tree using BLAKE3 hashes' },
      { key: 'Consensus & Signatures', value: 'Ed25519 m-of-n multi-signature audit quorum' },
      { key: 'Active Containment', value: 'Two-phase signal isolation: SIGSTOP freeze -> SIGKILL termination' },
      { key: 'Daemon Memory Budget', value: '5.2 MB steady-state RSS under 13,000+ EPS live load' },
    ],
    planes: [
      {
        id: 'P1',
        name: 'INGESTION',
        detail:
          'eBPF tracepoints on sys_enter_execve with null-delimited argv walker. 4 MB BPF_MAP_TYPE_RINGBUF delivers sustained high-throughput event capture without stack overflow.',
      },
      {
        id: 'P2',
        name: 'PARSING',
        detail:
          'Pratt Top-Down Operator Precedence parser converts Sigma detection rules into optimized ASTs, evaluating expressions efficiently in userspace.',
      },
      {
        id: 'P3',
        name: 'NORMALIZATION',
        detail:
          'Generational process graph using petgraph StableDiGraph. ProcessKey combining PID and start_time_ns eliminates PID recycling collisions.',
      },
      {
        id: 'P4',
        name: 'PROVENANCE',
        detail:
          'RFC 6962 transparency log structure using BLAKE3 hashing. Logarithmic audit paths with Ed25519 multi-signature consensus.',
      },
      {
        id: 'P5',
        name: 'PRESENTATION',
        detail:
          'Terminal interface built with Ratatui featuring process trees and an event inspector. Two-phase containment via pidfd_send_signal.',
      },
    ],
    tech: ['Rust', 'eBPF', 'libbpf-rs', 'BLAKE3', 'Ed25519', 'Ratatui', 'Linux Kernel'],
    repoUrl: 'https://github.com/Aayushbankar/spectre-prism',
    articleSlug: 'spectre-prism-log-engine',
    highlights: [
      'Cleared college institutional screening for Smart India Hackathon (SIH 2026, NTRO problem statement SIH26156).',
      'Eliminated PID reuse collisions by indexing nodes on (PID, start_time_ns) composite keys.',
      'Achieved 13,247 EPS per CPU core while maintaining steady-state RSS under 5.2 MB.',
    ],
    verification: 'Hardware-verified on local test bench under QEMU and bare-metal Ubuntu 24.04 kernel 6.8+.',
  },
  {
    id: 'wolvie',
    index: 'S–02',
    name: 'Wolvie',
    category: 'Local Edge Voice Pipeline',
    domain: 'Edge AI & Pipelines',
    status: 'Active Project',
    badgeType: 'brass',
    tagline: 'Sub-Second Offline Voice Assistant Pipeline',
    description:
      'An offline conversational voice assistant pipeline built for consumer laptops. Chains Silero Voice Activity Detection, faster-whisper speech recognition, llama.cpp quantized models, and Piper neural TTS over WebRTC audio streaming, achieving ~530ms round-trip latency without external APIs.',
    overview:
      'Wolvie provides a 100% private, on-device conversational voice interface without cloud dependencies or telemetry leaks. By breaking traditional monolithic voice agents into a tightly buffered micro-pipeline, audio travels from local microphone capture (Opus 48 kHz mono over WebRTC) directly into an INT8 Silero VAD segmenter. Detected speech is transcribed via faster-whisper in ~180ms, fed immediately into a local llama.cpp 7B Q4_K_M server running on CPU at 23 tok/s, and synthesized by Piper neural TTS in 95ms. The resulting round-trip latency (~530ms) delivers natural conversational pacing without GPU hardware acceleration.',
    plateImage: '/figures/card-wolvie.svg',
    benchmarks: [
      {
        label: 'Round-Trip Latency',
        value: '~530 ms',
        detail: 'End-to-end speech-to-synthetic-audio loopback latency',
      },
      {
        label: 'VAD Window',
        value: '5 ms',
        detail: 'Silero v5 ONNX INT8 with 98.2% speech recall',
      },
      {
        label: 'ASR Transcription',
        value: '180 ms',
        detail: 'faster-whisper tiny.en INT8 (WER 4.1% on LibriSpeech)',
      },
      {
        label: 'LLM Generation',
        value: '220 ms',
        detail: 'llama.cpp 7B Q4_K_M running at 23 tok/s on CPU',
      },
      {
        label: 'Neural TTS',
        value: '95 ms',
        detail: 'Piper v1.2.0 rendering 22 kHz audio (MOS 4.2)',
      },
      {
        label: 'WebRTC Overhead',
        value: '18 ms',
        detail: 'Direct browser DataChannel Opus frame delivery',
      },
    ],
    specSheet: [
      { key: 'Architecture Style', value: 'Asynchronous streaming micro-pipeline over WebRTC DataChannel' },
      { key: 'Voice Activity Detection', value: 'Silero v5 ONNX INT8 (5 ms window resolution, 98.2% recall)' },
      { key: 'Automatic Speech Recognition', value: 'faster-whisper tiny.en INT8 (beam_size=5, WER 4.1%)' },
      { key: 'Inference Engine', value: 'llama.cpp HTTP server hosting 7B Q4_K_M quantized weights' },
      { key: 'Token Generation Speed', value: '23 tokens/second on Intel Core i5 12-core CPU' },
      { key: 'Speech Synthesis', value: 'Piper v1.2.0 neural vocoder (22 kHz Opus output, MOS 4.2)' },
      { key: 'Audio Transport', value: 'WebRTC getUserMedia + Opus audio track (32 kbps mono)' },
      { key: 'Privacy & Cloud State', value: '100% offline, zero network egress, air-gapped operation' },
    ],
    pipeline: [
      {
        stage: '01',
        component: 'CAPTURE',
        detail: 'WebRTC getUserMedia capturing 48 kHz mono audio encoded in Opus at 32 kbps.',
        latency: '12 ms',
      },
      {
        stage: '02',
        component: 'VAD',
        detail: 'Silero v5 ONNX INT8 model segmenting speech at 5 ms window resolution.',
        latency: '5 ms',
      },
      {
        stage: '03',
        component: 'ASR',
        detail: 'faster-whisper tiny.en INT8 with beam_size=5 generating text transcriptions.',
        latency: '180 ms',
      },
      {
        stage: '04',
        component: 'LLM',
        detail: 'llama.cpp 7B Q4_K_M generating streaming completion tokens on raw CPU.',
        latency: '220 ms',
      },
      {
        stage: '05',
        component: 'TTS',
        detail: 'Piper v1.2.0 neural vocoder rendering high-fidelity 22 kHz speech frames.',
        latency: '95 ms',
      },
      {
        stage: '06',
        component: 'STREAM',
        detail: 'WebRTC audio track streaming frames back into browser playback buffer.',
        latency: '18 ms',
      },
    ],
    tech: ['Python', 'WebRTC', 'faster-whisper', 'llama.cpp', 'Piper TTS', 'Silero VAD', 'FastAPI'],
    repoUrl: 'https://github.com/Aayushbankar/wolvie',
    highlights: [
      'Sub-second ~530ms voice response loop without requiring discrete GPUs.',
      'Air-gapped operation guarantees no conversational data is sent to external servers.',
      'WebRTC streaming client allows responsive in-browser interaction on ordinary laptops.',
    ],
    verification: 'Empirically profiled using millisecond hardware timestamps across 100+ audio interaction loops.',
  },
  {
    id: 'quantlab',
    index: 'S–03',
    name: 'QuantLab',
    category: 'Algorithmic Backtesting',
    domain: 'Quantitative Finance',
    status: 'Minor Project Wrap',
    badgeType: 'brass',
    tagline: 'Event-Driven Simulation with Indian Market Friction',
    description:
      'GTU Diploma Semester 5 minor project (DI05000341). An event-driven backtesting engine modeling statutory Indian taxes (STT, stamp duty, GST) and Almgren-Chriss nonlinear slippage, using Combinatorial Purged Cross-Validation (CPCV) with embargo and Deflated Sharpe Ratio to assess overfitting.',
    overview:
      'Grounded in the SEBI 2024 retail trading study—which revealed 93% of active retail traders in India lost money, with transaction friction accounting for 28% of gross losses. QuantLab exposes the statistical illusions in retail trading strategies by enforcing rigorous empirical friction. It replaces naive frictionless backtests with discrete event simulation, modeling Almgren-Chriss square-root market impact and the exact Indian statutory tax schedule (STT, stamp duty, GST, SEBI turnover, brokerage caps). Overfitting is audited using Combinatorial Purged Cross-Validation (N=10, k=2, 45 paths) with 10-bar embargoes and Deflated Sharpe Ratio penalties.',
    plateImage: '/figures/card-quantlab.svg',
    benchmarks: [
      {
        label: 'Deflated Sharpe',
        value: '0.73 DSR',
        detail: 'Multi-testing penalty applied across 10 trial strategies',
      },
      {
        label: 'OOS Sharpe Decay',
        value: '31% Decay',
        detail: 'In-sample Sharpe 2.84 degrades to 1.96 under CPCV embargo',
      },
      {
        label: 'AR(1) Embargo Shift',
        value: '28.9% → 37.8%',
        detail: 'Probability of Backtest Overfitting exposed by 5% purge',
      },
      {
        label: 'Statutory Drag',
        value: '₹384.81 / trade',
        detail: 'Taxes consume ~3.85% of profit on ₹1L round-trip',
      },
      {
        label: 'Execution Model',
        value: 'T+1 Invariant',
        detail: 'Signal evaluated at Day t Close; filled at Day t+1 Open',
      },
      {
        label: 'Universe Scope',
        value: 'NIFTY 50 + Midcaps',
        detail: 'Daily bars from 2019–2024 with split and dividend adjustments',
      },
    ],
    specSheet: [
      { key: 'Simulation Architecture', value: 'Discrete event-driven loop with stateful Order, Position, Portfolio objects' },
      { key: 'Validation Framework', value: 'Combinatorial Purged Cross-Validation (N=10, k=2, 45 paths, 10-bar embargo)' },
      { key: 'Overfitting Metrics', value: 'Deflated Sharpe Ratio (DSR), Probability of Backtest Overfitting (PBO)' },
      { key: 'Slippage Model', value: 'Almgren-Chriss square-root temporary & permanent execution impact' },
      { key: 'Statutory Fee Schedule', value: 'Brokerage (₹20 cap) + STT (0.10%) + Stamp Duty (0.015%) + GST (18%) + Exchange (0.00297%)' },
      { key: 'Universe Analyzed', value: 'NIFTY 50 + 100 liquid midcaps across 7 sectors (5-year continuous history)' },
      { key: 'Lookahead Guard', value: 'T+1 invariant strictly separating signal calculation from execution fill' },
      { key: 'User Interface', value: 'Interactive Streamlit comparison matrix and automated performance tearsheet generator' },
    ],
    quantMetrics: {
      universe: 'NIFTY 50 + 100 liquid midcaps across 7 sectors',
      period: '2019-01-01 to 2024-12-31 (5-year continuous history)',
      bars: 'Daily EOD bars via Yahoo Finance with adjustment factors',
      costs:
        'Brokerage (₹20 cap) + STT (0.10%) + Exchange (0.00297%) + SEBI turnover (0.0001%) + GST (18%) + Stamp duty (0.015%) + Almgren-Chriss nonlinear slippage',
      validation: 'CPCV (N=10, k=2, 45 paths, embargo=10 bars), Deflated Sharpe Ratio, Sortino ratio, PBO calculation',
      sebiContext:
        'Grounded in SEBI 2024 study: 93% of active retail traders in India lost money; transaction costs accounted for 28% of gross losses.',
      dsr: '0.73 across 10 trials',
      oosDecay: '31% degradation between in-sample and cross-validated out-of-sample',
    },
    charts: [
      {
        file: 'simulated_equity_curve.png',
        title: 'Simulated Equity Curve',
        desc: 'SMA crossover strategy on NIFTY50 universe with full Almgren-Chriss impact and statutory costs.',
      },
      {
        file: 'simulated_equity_drawdown.png',
        title: 'Drawdown Profile',
        desc: 'Max drawdown analysis showing 23.4% peak-to-trough decline under market stress periods.',
      },
      {
        file: 'sharpe_comparison.png',
        title: 'In-Sample vs OOS Sharpe',
        desc: 'In-sample Sharpe ratio of 2.84 falls to 1.96 under out-of-sample combinatorial purged testing.',
      },
      {
        file: 'cagr_sharpe_comparison.png',
        title: 'CAGR vs Sharpe Ratio',
        desc: 'Comparison of 3 strategies under gross vs net performance; momentum survives friction while RSI collapses.',
      },
      {
        file: 'market_impact_curve.png',
        title: 'Almgren-Chriss Impact Calibration',
        desc: 'Square-root market impact curve calibrated on National Stock Exchange tick volumes.',
      },
      {
        file: 'monthly_heatmap.png',
        title: 'Monthly Returns Distribution',
        desc: '5-year monthly return heatmap revealing regime changes and cost drag distribution shift.',
      },
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Statsmodels', 'Almgren-Chriss Model'],
    repoUrl: 'https://github.com/Aayushbankar/Quantlab',
    highlights: [
      'Models statutory Indian taxes that wipe out typical algorithmic paper gains.',
      'Incorporates Combinatorial Purged Cross-Validation with 10-bar embargoes.',
      'Deflated Sharpe Ratio penalizes multi-testing data snooping bias across strategy trials.',
    ],
    verification: 'Evaluated against 5 years of National Stock Exchange historical EOD data (2019-2024).',
  },
  {
    id: 'cve-aggregator',
    index: 'S–04',
    name: 'CVE Intelligence Aggregator',
    category: 'Vulnerability Intelligence Platform',
    domain: 'Security Intelligence',
    status: 'Production-Ready',
    badgeType: 'ember',
    tagline: 'Real-Time Advisory Normalization & Threat-Weighted Risk Scoring',
    description:
      'A self-hosted cybersecurity intelligence platform automating the aggregation, normalization, prioritization, and alerting of Common Vulnerabilities and Exposures. Ingests NVD API v2.0, CISA Known Exploited Vulnerabilities (KEV), and GitHub Security Advisories into an indexed SQLite store with composite threat prioritization.',
    overview:
      'Engineered to solve the signal-to-noise crisis in enterprise vulnerability management. Rather than ranking vulnerabilities solely on static theoretical CVSS base scores, CVE Aggregator applies a composite operational priority metric: Base CVSS + 2.5 for entries actively listed in CISA KEV + 1.5 for confirmed public exploits. A multi-threaded background task scheduler runs every 4 hours, implementing self-healing exponential backoff buffers to survive strict NVD API rate limits. Records are merged transactionally using SQLite ON CONFLICT DO UPDATE upserts with B-Tree indices. Features an interactive terminal UI built with Rich and a custom glassmorphic web portal.',
    plateImage: '/figures/card-cve-aggregator.svg',
    benchmarks: [
      {
        label: 'Sync Cadence',
        value: 'Every 4 Hours',
        detail: 'Multi-threaded background task scheduler via APScheduler',
      },
      {
        label: 'Priority Boost',
        value: '+2.5 KEV / +1.5 EXP',
        detail: 'Operational threat scoring boosting weaponized vulnerabilities',
      },
      {
        label: 'API Resiliency',
        value: '100% Rate-Limit Recovery',
        detail: 'Self-healing exponential backoff surviving NVD 6-req/30s quotas',
      },
      {
        label: 'Query Latency',
        value: '< 4 ms',
        detail: 'Indexed word-boundary regex scans on SQLite WAL database',
      },
      {
        label: 'Automated Reports',
        value: 'Markdown, CSV, JSON',
        detail: 'Nightly diff reports generated and exported automatically',
      },
    ],
    specSheet: [
      { key: 'Backend Stack', value: 'Python 3.11, Flask, APScheduler, sqlite3 with WAL journaling' },
      { key: 'Advisory Ingestion Feeds', value: 'NVD API v2.0, CISA KEV JSON dataset, GitHub Security Advisories' },
      { key: 'Risk Scoring Algorithm', value: 'Operational Composite Metric: CVSS + 2.5(CISA KEV) + 1.5(Public Exploit)' },
      { key: 'Database Architecture', value: 'Thread-safe SQLite connection pool with B-tree indices on cve_id & published_date' },
      { key: 'Watchlist Match Engine', value: 'Word-boundary regular expression scans (\\btech\\b) across vulnerability text' },
      { key: 'User Interfaces', value: 'Responsive glassmorphic web portal + Rich terminal dashboard (TUI)' },
      { key: 'Resilience Strategy', value: 'Exponential backoff jitter buffer preventing 403/429 rate limit bans' },
      { key: 'Operating Footprint', value: 'Zero external cloud database required; 100% self-hosted & local' },
    ],
    tech: ['Python', 'Flask', 'APScheduler', 'SQLite', 'Rich TUI', 'NVD API', 'CISA KEV'],
    repoUrl: 'https://github.com/Aayushbankar/cve_aggregator',
    highlights: [
      'Self-healing exponential backoff survives strict NVD rate limits without crashing.',
      'Composite threat metric separates theoretical risks from weaponized in-the-wild exploits.',
      'Includes dual interfaces: Rich terminal dashboard for analysts and web UI for reports.',
    ],
    verification: 'Deployed locally and continuously tracking CVE feeds with verified transactional integrity.',
  },
  {
    id: 'privata',
    index: 'S–05',
    name: 'Privata',
    category: 'Air-Gapped Offline Document Query',
    domain: 'Edge AI & Pipelines',
    status: 'Complete',
    badgeType: 'moss',
    tagline: 'Zero-Cloud RAG Engine with ChromaDB Vector Search',
    description:
      'A lightweight, offline-first document ingestion and semantic query tool using Retrieval-Augmented Generation (RAG). Embeds sensitive PDFs, Markdown files, and code repositories into a persistent ChromaDB vector store using local Sentence Transformers, enabling air-gapped private intelligence search without third-party data leaks.',
    overview:
      'Built specifically for handling sensitive security audit reports and proprietary codebase documents that cannot be uploaded to external AI services. Privata executes a complete local Retrieval-Augmented Generation workflow directly on consumer hardware. Documents are segmented into 500-token chunks with 50-token sliding window overlaps, converted into 384-dimensional dense vectors using Hugging Face Sentence Transformers (all-MiniLM-L6-v2), and stored locally in ChromaDB. Queries perform instant cosine nearest-neighbor retrieval, synthesizing answers via local LLM or sandboxed APIs while keeping the document corpus strictly air-gapped.',
    plateImage: '/figures/card-privata.svg',
    benchmarks: [
      {
        label: 'Vector Search Latency',
        value: '< 15 ms',
        detail: 'ChromaDB cosine similarity retrieval on 10,000+ vector chunks',
      },
      {
        label: 'Embedding Model',
        value: 'all-MiniLM-L6-v2',
        detail: '384-dimensional dense embeddings executed locally in RAM',
      },
      {
        label: 'Ingestion Speed',
        value: '~120 pages/min',
        detail: 'Document chunking, normalization, and embedding rate',
      },
      {
        label: 'Privacy Assurance',
        value: 'Zero Cloud Egress',
        detail: 'Raw document bytes never leave the local machine',
      },
    ],
    specSheet: [
      { key: 'Architecture', value: 'Chunking -> Local Dense Embeddings -> ChromaDB Retrieval -> LLM Generation' },
      { key: 'Vector Database', value: 'ChromaDB (local persistent storage)' },
      { key: 'Embedding Framework', value: 'Sentence Transformers (Hugging Face PyTorch runtime)' },
      { key: 'Document Parsers', value: 'PyPDF2, python-docx, Markdown & raw text sliding tokenizers' },
      { key: 'Chunking Strategy', value: '500-token sliding window with 50-token overlap and section preservation' },
      { key: 'Query Interface', value: 'Interactive CLI with color-coded citations and source document offsets' },
      { key: 'Deployment Target', value: 'Air-gapped security research workstations without internet access' },
    ],
    tech: ['Python', 'LangChain', 'ChromaDB', 'Sentence Transformers', 'Hugging Face', 'CLI'],
    repoUrl: 'https://github.com/Aayushbankar/privata',
    highlights: [
      'Air-gapped operation ensures sensitive vulnerability logs never leak to cloud LLMs.',
      'Sub-15ms semantic vector search across thousands of technical pages.',
      'Zero monthly cloud infrastructure cost; runs entirely on standard laptop CPUs.',
    ],
    verification: 'Verified locally over technical whitepapers and internal engineering documentation.',
  },
  {
    id: 'onetimeshare',
    index: 'S–06',
    name: 'OneTimeShare',
    category: 'Ephemeral Cryptographic Vault',
    domain: 'Security Intelligence',
    status: 'Production Deployed',
    badgeType: 'brass',
    tagline: 'Zero-Knowledge Ephemeral File & Secret Vault with Atomic TTL',
    description:
      'A secure, ephemeral secret-sharing service built with Flask and Redis. Guarantees single-view access and permanent asset destruction using atomic Redis MULTI/EXEC transaction blocks and TTL expiration keys, preventing replay attacks and race condition downloads.',
    overview:
      'Developed during a 30-day build-in-public production engineering challenge. OneTimeShare solves the risk of sharing sensitive credentials, SSH private keys, and one-off configuration files over email or Slack. Secrets and encrypted files are uploaded with a caller-selected Time-To-Live (TTL) and assigned a cryptographically random UUID4 handle. Downloads are wrapped in atomic Redis WATCH/MULTI/EXEC pipelines: the asset is returned and purged simultaneously in a single atomic database operation. Concurrent requests fail immediately, ensuring that a secret can only ever be viewed once.',
    plateImage: '/figures/card-onetimeshare.svg',
    benchmarks: [
      {
        label: 'Access Guarantee',
        value: 'Strict 1-View',
        detail: 'Asset is permanently deleted immediately upon first successful view',
      },
      {
        label: 'Transaction Atomicity',
        value: 'MULTI / EXEC',
        detail: 'Eliminates concurrent race condition multiple downloads',
      },
      {
        label: 'TTL Expiration',
        value: 'Automated Garbage Sweep',
        detail: 'Unviewed secrets automatically evicted by Redis memory TTL',
      },
      {
        label: 'Deployment',
        value: 'Live on Render',
        detail: 'Production containerized deployment with Docker Compose',
      },
    ],
    specSheet: [
      { key: 'Backend Framework', value: 'Python 3.11, Flask, Gunicorn' },
      { key: 'Key-Value Datastore', value: 'Redis 7.0 with volatile-ttl eviction policies' },
      { key: 'Concurrency Safety', value: 'Redis WATCH / MULTI / EXEC atomic transaction pipeline' },
      { key: 'Identifier Entropy', value: '128-bit cryptographically secure UUID4 identifiers' },
      { key: 'File Sanitization', value: 'Strict MIME-type validation, filename hashing, and disk isolation' },
      { key: 'CI/CD Pipeline', value: 'GitHub Actions testing suites with Docker image builds' },
      { key: 'Live URL', value: 'https://onetimeshare.onrender.com' },
    ],
    tech: ['Python', 'Flask', 'Redis', 'Docker', 'Docker Compose', 'GitHub Actions', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Aayushbankar/onetimeshare',
    liveUrl: 'https://onetimeshare.onrender.com',
    highlights: [
      'Atomic Redis transactions prevent concurrent double-download race conditions.',
      'Automated key eviction guarantees unretrieved secrets expire cleanly without manual cleanup.',
      'Comprehensive 30-day documentation log tracking every architectural decision.',
    ],
    verification: 'Deployed live on Render with automated integration test suites passing in CI.',
  },
  {
    id: 'it-department-portal',
    index: 'S–07',
    name: 'IT Department Official Portal',
    category: 'Production Campus Portal',
    domain: 'Production & Platforms',
    status: 'Live in Production',
    badgeType: 'moss',
    tagline: 'Zero-Cost Serverless Campus Portal Serving 500+ Daily Users',
    description:
      'The official digital platform for the Information Technology Department at Government Polytechnic Gandhinagar. Engineered from scratch with a serverless thick-client architecture utilizing Google Drive API as a headless CMS, delivering institutional notices, syllabus repositories, and student portals at $0 hosting expense.',
    overview:
      'Built and maintained as the official primary web presence for the IT Department at Govt. Polytechnic Gandhinagar. Because government educational departments typically lack recurring cloud hosting budgets, this project architected a thick-client headless CMS solution: faculty members update circulars, exam schedules, and learning materials inside standard Google Drive folders, and the front-end fetches and renders these assets securely via Google Drive REST APIs and client-side caching. Deployed via GitHub Pages with automated CI/CD, delivering high availability to 500+ daily students and faculty members at zero operating cost.',
    plateImage: '/figures/card-itgpg.svg',
    benchmarks: [
      {
        label: 'Active Users',
        value: '500+ Daily DAU',
        detail: 'Active daily student body and engineering faculty usage',
      },
      {
        label: 'Hosting Cost',
        value: '₹0.00 / month',
        detail: 'Permanent zero-cost architecture utilizing GitHub Pages & Google APIs',
      },
      {
        label: 'Production Uptime',
        value: '99.98%',
        detail: 'Sustained edge uptime since deployment in 2024',
      },
      {
        label: 'Load Performance',
        value: '< 400 ms FCP',
        detail: 'First Contentful Paint on mobile cellular campus connections',
      },
    ],
    specSheet: [
      { key: 'Static Site Generator', value: 'Jekyll with automated GitHub Pages edge deployment' },
      { key: 'Headless CMS', value: 'Google Drive API integration for real-time document publishing' },
      { key: 'Frontend Engineering', value: 'Modular Vanilla JavaScript, semantic HTML5, Bootstrap 5.3' },
      { key: 'Caching Layer', value: 'Client-side LocalStorage and SessionStorage caching for circulars' },
      { key: 'Accessibility & Mobile', value: 'Responsive across 320px to 4K displays with ARIA standards' },
      { key: 'Status', value: 'Official departmental website currently active in production' },
      { key: 'Live URL', value: 'https://itgpg.github.io/it/' },
    ],
    tech: ['Jekyll', 'GitHub Pages', 'Bootstrap 5.3', 'Google Drive API', 'Vanilla JavaScript'],
    repoUrl: 'https://github.com/itgpg/it',
    liveUrl: 'https://itgpg.github.io/it/',
    highlights: [
      'Official departmental web portal for Government Polytechnic Gandhinagar.',
      'Sustains 500+ daily active student users with 99.98% uptime at $0 hosting expense.',
      'Allows non-technical faculty to publish circulars directly through Google Drive.',
    ],
    verification: 'Live in production, serving hundreds of students and faculty members daily.',
  },
  {
    id: 'jarvis-agent',
    index: 'S–08',
    name: 'JARVIS Research Agent',
    category: 'Autonomous Research Agent',
    domain: 'Edge AI & Pipelines',
    status: 'Active Development',
    badgeType: 'ember',
    tagline: 'Local Uncensored ReAct Research Loop with Multi-Tool Calling',
    description:
      'An autonomous, locally-hosted research agent powered by quantized LLMs via llama.cpp. Orchestrates a ReAct (Reasoning + Acting) loop with automated web search, URL scraping, sandboxed code execution, and structured markdown synthesis without sending queries to proprietary cloud APIs.',
    overview:
      'Created to conduct automated, uncensored technical research on complex computing topics without token cost or privacy exposure. The agent runs on a local llama.cpp server and utilizes a ReAct cycle: the model analyzes a research prompt, emits structured tool-call actions (web search, page scraper, shell command, python interpreter), parses execution observations, and iterates until the research question is answered. Features an interactive Rich Terminal UI (TUI) displaying reasoning traces and tool outputs in real time.',
    plateImage: '/figures/card-jarvis.svg',
    benchmarks: [
      {
        label: 'Loop Architecture',
        value: 'ReAct Cycle',
        detail: 'Dynamic multi-step reasoning, tool execution, and self-correction',
      },
      {
        label: 'Model Runtime',
        value: 'Local llama.cpp',
        detail: 'Quantized GGUF models executed on local CPU/GPU hardware',
      },
      {
        label: 'Tool Integrations',
        value: 'Search, Scraping, Shell',
        detail: 'Multi-tool registry with sandboxed Python evaluation',
      },
      {
        label: 'Privacy',
        value: '100% Uncensored & Private',
        detail: 'Zero telemetry or prompt data transmitted to cloud providers',
      },
    ],
    specSheet: [
      { key: 'Core Architecture', value: 'Reason -> Act -> Observe -> Synthesize autonomous ReAct loop' },
      { key: 'Inference Backend', value: 'Local llama.cpp OpenAI-compatible HTTP server running quantized GGUF weights' },
      { key: 'Search & Ingestion', value: 'DuckDuckGo API, BeautifulSoup HTML-to-Markdown scraper' },
      { key: 'Execution Sandbox', value: 'Subprocess runner with configurable timeouts and output truncation' },
      { key: 'Terminal Interface', value: 'Python Rich TUI with live status spinners and color-coded reasoning trees' },
      { key: 'Context Pruning', value: 'Dynamic sliding window conversation manager preventing context window overflow' },
    ],
    tech: ['Python', 'llama.cpp', 'ReAct Pattern', 'Rich TUI', 'BeautifulSoup', 'AsyncIO'],
    repoUrl: 'https://github.com/Aayushbankar/researcher_agent',
    highlights: [
      'Autonomous ReAct loop can conduct multi-step technical investigations on local hardware.',
      'Integrates automated web retrieval with sandboxed code execution for factual validation.',
      'Completely self-hosted with zero recurring API subscription fees.',
    ],
    verification: 'Tested across hundreds of complex technical queries with automated trace outputs.',
  },
  {
    id: 'port-scanner',
    index: 'S–09',
    name: 'Multi-Threaded TCP Port Scanner',
    category: 'Concurrent Network Tooling',
    domain: 'Systems & Low-Level',
    status: 'Complete',
    badgeType: 'default',
    tagline: 'High-Concurrency Layer-4 Transport Scanner in Pure Python',
    description:
      'A concurrent Transport Layer (Layer 4) TCP port scanning utility written in Python. Implements worker thread pools, socket timeout tuning, non-blocking connection polling, and deterministic port classification without relying on external packet-crafting dependencies.',
    overview:
      'Designed to explore OS socket boundary behaviors and high-concurrency transport networking. Unlike naive scripts that spawn unbounded threads and crash against OS file descriptor limits (ulimit), this scanner implements a managed worker pool with tuned non-blocking connection timeouts. Completes standard TCP three-way handshakes to accurately classify ports into OPEN, CLOSED, or FILTERED states while respecting host resource boundaries.',
    plateImage: '/figures/card-portscanner.svg',
    benchmarks: [
      {
        label: 'Scan Throughput',
        value: '1,000 Ports / 1.8s',
        detail: 'Full port sweep over local subnet with deterministic response',
      },
      {
        label: 'Concurrency',
        value: 'Adaptive Thread Pool',
        detail: 'Calibrated worker threads respecting OS file descriptor caps',
      },
      {
        label: 'Timeout Resolution',
        value: 'Microsecond Socket Tuning',
        detail: 'Non-blocking socket polling minimizing idle wait latency',
      },
      {
        label: 'Port Classification',
        value: 'OPEN / CLOSED / FILTERED',
        detail: 'Deterministic status resolution via errno code handling',
      },
    ],
    specSheet: [
      { key: 'Networking Layer', value: 'Transport Layer (Layer 4) TCP 3-way handshake completion' },
      { key: 'Standard Library', value: 'Pure Python socket and concurrent.futures ThreadPoolExecutor' },
      { key: 'Error Handling', value: 'Deterministic handling of ECONNREFUSED, ETIMEDOUT, and ENETUNREACH' },
      { key: 'Resource Guard', value: 'Automatic socket closure preventing file descriptor leaks' },
      { key: 'Terminal Output', value: 'Color-coded ANSI tabular reports with service banner inspection' },
    ],
    tech: ['Python', 'Sockets', 'ThreadPoolExecutor', 'TCP/IP', 'Linux Networking'],
    repoUrl: 'https://github.com/Aayushbankar/port_scanner_mt',
    highlights: [
      'High-speed concurrent TCP scanning without external C dependencies or Scapy.',
      'Adaptive thread pool prevents OS ulimit starvation and socket leaks.',
      'Clean deterministic classification of port states based on kernel error codes.',
    ],
    verification: 'Benchmarked across local lab subnets and verified against known test target services.',
  },
  {
    id: 'pureedgesim',
    index: 'S–10',
    name: 'PureEdgeSim CLI Integration',
    category: 'Edge Simulation Framework',
    domain: 'Production & Platforms',
    status: 'Contributed / Open Source',
    badgeType: 'brass',
    tagline: 'Interactive Console Execution Mode for Edge & Mist Simulations',
    description:
      'Open-source contribution to PureEdgeSim, a widely cited simulation framework for Cloud, Edge, and Mist computing environments. Developed a modular interactive CLI execution mode allowing researchers to launch complex simulation scenarios without graphical GUI overhead.',
    overview:
      'PureEdgeSim is a standard Java-based simulation engine built on top of CloudSim, widely used by academic researchers to simulate device mobility, task offloading, and network latency in Edge and Fog computing topologies. Standard upstream execution relied heavily on GUI menus, hindering deployment on remote Linux servers and headless compute clusters. Contributed an interactive menu-driven CLI runner that enables configuration loading, simulation scenario orchestration, and automated logging directly from the terminal.',
    plateImage: '/figures/card-pureedgesim.svg',
    benchmarks: [
      {
        label: 'Framework Base',
        value: 'PureEdgeSim / CloudSim',
        detail: 'Widely cited peer-reviewed Cloud/Edge/Mist simulation engine',
      },
      {
        label: 'Execution Mode',
        value: 'Headless CLI',
        detail: 'Enables batch simulation runs on remote Linux compute servers',
      },
      {
        label: 'Configuration Speed',
        value: 'Interactive Menus',
        detail: 'Rapid scenario loading without graphical desktop environment',
      },
    ],
    specSheet: [
      { key: 'Programming Language', value: 'Java 17, Apache Maven build system' },
      { key: 'Upstream Project', value: 'PureEdgeSim open-source edge computing simulation ecosystem' },
      { key: 'Contribution Scope', value: 'Interactive CLI controller module and scenario parameter launcher' },
      { key: 'Use Case', value: 'Headless cluster evaluation of task offloading and edge resource allocation' },
    ],
    tech: ['Java', 'Maven', 'PureEdgeSim', 'Edge Computing', 'Mist Computing'],
    repoUrl: 'https://github.com/Aayushbankar/PureEdgeSim',
    highlights: [
      'Direct contribution to a widely cited open-source Edge simulation platform.',
      'Enables headless batch execution on remote HPC and Linux compute nodes.',
      'Modular architecture decouples simulation logic from desktop GUI bindings.',
    ],
    verification: 'Merged into personal fork and tested with standard PureEdgeSim benchmark scenarios.',
  },
  {
    id: 'polymathic-webgl',
    index: 'S–11',
    name: 'Polymathic 3D WebGL Ecosystem',
    category: '3D Graphics & Shader Labs',
    domain: 'Creative Tech & WebGL',
    status: 'Active Lab',
    badgeType: 'default',
    tagline: 'Custom Bayer Shaders & 60 FPS GSAP Scroll Timelines',
    description:
      'A series of advanced web portfolios (portfolio_architect, portfolio_pro, portfolio_pro_3d, portfolio_pro_real) exploring WebGL rendering, custom ASCII and Bayer dither post-processing shaders, particle geometry, and 60fps GSAP ScrollTrigger timelines.',
    overview:
      'A technical exploration into real-time GPU rendering in the browser without compromising accessibility or layout stability. Features custom Three.js shader passes that implement 4x4 Bayer ordered dithering and luminance quantizing for a retro-cybernetic aesthetic. The animation layer connects GSAP ScrollTrigger to 3D camera matrices and quaternion interpolations, maintaining strict 60fps hardware acceleration while providing full graceful fallbacks for devices without WebGL support.',
    plateImage: '/figures/card-polymathic.svg',
    benchmarks: [
      {
        label: 'GPU Frame Rate',
        value: '60 FPS Steady',
        detail: 'Hardware accelerated WebGL pipeline without jank or dropped frames',
      },
      {
        label: 'Shader Compilation',
        value: '< 45 ms',
        detail: 'Instantaneous GLSL fragment and vertex shader initialization',
      },
      {
        label: 'Cumulative Layout Shift',
        value: '0.00 CLS',
        detail: 'Canvas wrapper strictly dimensioned to prevent viewport shifts',
      },
      {
        label: 'Ecosystem Variants',
        value: '4 Iterations',
        detail: 'Demonstrates progression from static DOM to full WebGL space',
      },
      {
        label: 'Scroll Synchronization',
        value: '1:1 Scrub',
        detail: 'GSAP ScrollTrigger scrub coupled to Three.js camera position',
      },
      {
        label: 'Fallbacks',
        value: '100% Accessible',
        detail: 'CSS fallback layout loads seamlessly if WebGL is unavailable',
      },
    ],
    specSheet: [
      { key: 'Graphics Library', value: 'Three.js (r160+) / WebGL 2.0' },
      { key: 'Post-Processing Shaders', value: 'Custom 4x4 Bayer Matrix Ordered Dithering + Luminance Quantizer' },
      { key: 'Motion Orchestration', value: 'GSAP 3 (ScrollTrigger, TweenLite, TimelineMax)' },
      { key: 'Frontend Stack', value: 'React 18, Vite, Tailwind CSS, PostCSS' },
      { key: 'Asset Optimization', value: 'Low-poly GLTF/GLB models with DRACO compression' },
      { key: 'Telemetry', value: 'stats.js live draw-call and polygon count monitors' },
    ],
    tech: ['Three.js', 'WebGL', 'GLSL Shaders', 'GSAP 3', 'React', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Aayushbankar',
    highlights: [
      'Interactive 3D geometry coupled to document scroll progress.',
      'Custom fragment shaders applying ordered dithering and retro-CRT scanlines.',
      'Progressive enhancement ensures no content is blocked without WebGL.',
    ],
    verification: 'Profiled via Chrome DevTools GPU profiler across 1080p and 4K displays.',
  },
  {
    id: 'kafka-story-generator',
    index: 'S–12',
    name: 'Kafka Story Generator',
    category: 'Fine-Tuned NLP Text Generation',
    domain: 'Edge AI & Pipelines',
    status: 'Model Published',
    badgeType: 'default',
    tagline: 'Autoregressive GPT-2 Fine-Tuned on Kafka Corpus',
    description:
      'A fine-tuned language generation model trained on the complete literary works of Franz Kafka, packaged with an interactive web generation interface and hosted on the Hugging Face Model Hub (bankar404/kafka-gpt2-story-generator).',
    overview:
      'Engineered to study stylistic transfer and autoregressive token probability distributions in domain-specific literary corpora. The model was trained by fine-tuning GPT-2 using PyTorch and Hugging Face Transformers on cleaned, tokenized German and English translations of Kafka classics (The Metamorphosis, The Trial, The Castle). The inference interface incorporates temperature scaling, top-k sampling, and repetition penalties to reproduce authentic thematic motifs without mode collapse.',
    plateImage: '/figures/card-kafka.svg',
    benchmarks: [
      {
        label: 'Model Registry',
        value: 'Hugging Face Hub',
        detail: 'Public weights published at bankar404/kafka-gpt2-story-generator',
      },
      {
        label: 'Base Architecture',
        value: 'GPT-2 (124M)',
        detail: '12-layer decoder-only transformer with 768 hidden dimensions',
      },
      {
        label: 'Inference Latency',
        value: '< 850 ms',
        detail: 'Generates 120 tokens on CPU / <150ms on GPU hardware',
      },
      {
        label: 'Sampling Controls',
        value: 'Top-k & Top-p',
        detail: 'Adjustable temperature, nucleus sampling, and presence penalty',
      },
      {
        label: 'Corpus Quality',
        value: '100% Curated',
        detail: 'Text deduplication, custom sentence boundary tokens, and cleaning',
      },
      {
        label: 'Deployment',
        value: 'Web & API',
        detail: 'Interactive Flask generator portal with REST API endpoints',
      },
    ],
    specSheet: [
      { key: 'Frameworks', value: 'PyTorch, Hugging Face Transformers, Datasets' },
      { key: 'Model ID', value: 'bankar404/kafka-gpt2-story-generator' },
      { key: 'Base Checkpoint', value: 'gpt2 (124M parameters, 12 attention heads)' },
      { key: 'Training Dataset', value: 'Full public domain bibliography of Franz Kafka' },
      { key: 'Loss Function', value: 'Cross-Entropy Loss with Label Smoothing' },
      { key: 'Inference Engine', value: 'Hugging Face pipeline + Flask web server' },
    ],
    tech: ['Python', 'PyTorch', 'Transformers', 'Hugging Face', 'NLP', 'Flask'],
    repoUrl: 'https://github.com/Aayushbankar/Franz-Kafka-Story-generator',
    liveUrl: 'https://huggingface.co/bankar404/kafka-gpt2-story-generator',
    highlights: [
      'Published open model weights available on the Hugging Face community repository.',
      'Faithful capture of Kafkaesque bureaucratic absurdity and existential syntax.',
      'Lightweight local deployment runnable entirely on standard CPU laptops.',
    ],
    verification: 'Model checkpoints verified on Hugging Face Model Hub and evaluated with automated perplexity metrics.',
  },
  {
    id: 'yt-stlk',
    index: 'S–13',
    name: 'YT_STLK Activity Engine',
    category: 'Media Intelligence & Surveillance',
    domain: 'Production & Platforms',
    status: 'Live on Render',
    badgeType: 'moss',
    tagline: 'Real-Time Creator Playlist & Feed Ingestion Engine',
    description:
      'A cloud-deployed Python Flask surveillance engine running on Render that continuously monitors target YouTube creator channels for newly added playlists, unlisted uploads, and curriculum revisions with zero quota exhaustion.',
    overview:
      'Created to solve the problem of stealth playlist updates and unannounced lecture drops across technical course creators. The engine operates an intelligent polling loop that queries the YouTube Data API v3 while respecting strict daily quota budgets through hash-based change detection and conditional HTTP etags. Deltas are stored in an indexed SQLite database and broadcast to subscribed webhook channels in real time.',
    plateImage: '/figures/card-ytstlk.svg',
    benchmarks: [
      {
        label: 'Production Status',
        value: 'Active Deployment',
        detail: 'Running continuously in the cloud at stkher.onrender.com',
      },
      {
        label: 'Quota Conservation',
        value: '94% Reduction',
        detail: 'Etag caching and smart diffing prevents unnecessary API unit burn',
      },
      {
        label: 'Polling Cycle',
        value: 'Custom Cadence',
        detail: 'Automated background task worker checking channel deltas',
      },
      {
        label: 'Database Integrity',
        value: 'SQLite ACID',
        detail: 'Relational schema tracking channel IDs, playlist IDs, and video deltas',
      },
      {
        label: 'Alert Latency',
        value: '< 60 s',
        detail: 'Instant webhook notification upon detected playlist reorganization',
      },
      {
        label: 'Deployment Platform',
        value: 'Render Cloud',
        detail: 'Zero-cost continuous container deployment with health-checks',
      },
    ],
    specSheet: [
      { key: 'Backend Framework', value: 'Python 3, Flask, Gunicorn' },
      { key: 'Hosting Platform', value: 'Render (Web Service)' },
      { key: 'API Integration', value: 'Google APIs Client / YouTube Data API v3' },
      { key: 'Database', value: 'SQLite with WAL mode and compound unique indices' },
      { key: 'Job Scheduler', value: 'APScheduler background thread executor' },
      { key: 'Notification Channels', value: 'Discord Webhooks + JSON HTTP callbacks' },
    ],
    tech: ['Python', 'Flask', 'YouTube Data API', 'Render', 'SQLite', 'APScheduler'],
    repoUrl: 'https://github.com/Aayushbankar/yt_stlk',
    liveUrl: 'https://stkher.onrender.com',
    highlights: [
      'Deployed live on cloud infrastructure with public web interface.',
      'Saves developers from manual channel refreshes during technical bootcamps.',
      'Engineered with aggressive caching to remain well inside free-tier API quotas.',
    ],
    verification: 'Monitors multiple real-world programming education channels with verified continuous uptime.',
  },
  {
    id: 'itgrads-jobfeed',
    index: 'S–14',
    name: 'IT Grads Mobile Job Feed',
    category: 'High-Performance Web App',
    domain: 'Production & Platforms',
    status: 'Production Hardened',
    badgeType: 'moss',
    tagline: 'Pure PHP 8.2 & MySQL Snap-Scroll Feed with O(1) Pagination',
    description:
      'An ultra-responsive vertical snap-scroll job feed built without heavy JavaScript frameworks using Pure PHP 8.2, MySQL PDO with O(1) B-tree pagination, automatic regex text parsing, GD image compression, and mobile 100dvh viewport fit.',
    overview:
      'Demonstrates extreme frontend efficiency and backend minimalism by eschewing bulky JavaScript SPA frameworks in favor of high-performance server-rendered PHP 8.2 and modern CSS scroll-snap. Includes an automated text-blob parser that tokenizes emails, phone numbers, and recruitment hashtags on submission, alongside PHP GD image resizing that strips EXIF data and compresses resumes. Database queries use deterministic keyset cursor pagination with O(1) lookups.',
    plateImage: '/figures/card-itgrads.svg',
    benchmarks: [
      {
        label: 'Server Response Time',
        value: '< 15 ms TTFB',
        detail: 'Pure PHP 8.2 execution without framework bootstrap overhead',
      },
      {
        label: 'Pagination Complexity',
        value: 'O(1) Constant',
        detail: 'B-Tree indexed cursor pagination eliminating expensive OFFSET scans',
      },
      {
        label: 'Viewport Behavior',
        value: '100dvh Snap',
        detail: 'CSS scroll-snap-type: y mandatory with dynamic mobile viewport fit',
      },
      {
        label: 'Image Compression',
        value: 'Up to 78% Saved',
        detail: 'PHP GD auto-resizing, WebP conversion, and EXIF metadata stripping',
      },
      {
        label: 'Security Posture',
        value: 'CSRF & Sanitized',
        detail: 'Session-bound tokens, HTML Purifier, and PDO parameterized SQL',
      },
      {
        label: 'JS Dependency',
        value: '0 KB Frameworks',
        detail: 'Vanilla progressive enhancement with native browser behaviors',
      },
    ],
    specSheet: [
      { key: 'Server Environment', value: 'PHP 8.2 (OPcache enabled), Nginx' },
      { key: 'Database Layer', value: 'MySQL 8.0, InnoDB with composite B-Tree indexes' },
      { key: 'Authentication', value: 'Session-based Auth with Google OAuth 2.0 integration' },
      { key: 'Image Processing', value: 'PHP GD library with automated WebP compression' },
      { key: 'Styling Architecture', value: 'Modern CSS3 (scroll-snap, CSS variables, 100dvh)' },
      { key: 'Text Analysis', value: 'RegEx-based multi-token extractor for contact coordinates' },
    ],
    tech: ['PHP 8.2', 'MySQL', 'Vanilla JS', 'CSS Scroll-Snap', 'OAuth 2.0', 'PHP-GD'],
    repoUrl: 'https://github.com/Aayushbankar/itgrads_web',
    highlights: [
      'Sub-15ms server-side rendering without any frontend framework overhead.',
      'Mobile-first TikTok-style vertical snap-scroll navigation for job listings.',
      'Automated extraction of contact coordinates and candidate requirements from raw text.',
    ],
    verification: 'Stress-tested with Apache Bench (ab) achieving 2,400+ req/sec on local hardware.',
  },
];

export const flagships: FlagshipSystem[] = allSystems.slice(0, 3);

export const secondarySystems: SecondarySystem[] = allSystems.slice(3).map((s) => ({
  id: s.index,
  name: s.name,
  category: s.category,
  description: s.description,
  tech: s.tech,
  repoUrl: s.repoUrl,
  liveUrl: s.liveUrl,
  stats: s.benchmarks[0]?.value ? `${s.benchmarks[0].value} · ${s.category}` : s.category,
  slug: s.id,
}));

export function getSystemById(id: string): SystemProject | undefined {
  return allSystems.find((s) => s.id === id);
}
