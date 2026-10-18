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
  domain: 'Systems & Low-Level' | 'Edge AI & Pipelines' | 'Quantitative Finance' | 'Security Intelligence' | 'Production & Platforms';
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
    status: 'Exploratory Prototype / Architectural Lab',
    badgeType: 'brass',
    tagline: 'Proof-of-Concept Offline Voice Loop Exploring Local GGUF Quantization & WebRTC on 8GB Hardware',
    description:
      'An exploratory proof-of-concept offline voice loop built as an architectural feasibility study on constrained 8GB consumer hardware. Orchestrates Silero Voice Activity Detection, faster-whisper INT8 speech recognition, llama.cpp quantized models, and Piper neural TTS over WebRTC, exploring local conversational latency boundaries without external cloud APIs.',
    overview:
      'Wolvie is an exploratory prototype and architectural feasibility laboratory investigating whether a private, sub-second conversational voice assistant loop can run entirely offline on standard 8GB consumer hardware (Intel Core i5-8350U, no dedicated GPU). By orchestrating a tightly buffered micro-pipeline, incoming audio from WebRTC microphone capture (Opus 48 kHz mono) is evaluated by an INT8 Silero VAD segmenter, transcribed via faster-whisper INT8 in ~180ms, fed into a local quantized llama.cpp 7B Q4_K_M server running on CPU at ~23 tok/s (~220ms), and synthesized by Piper neural TTS in ~95ms. The project established empirical benchmarks for edge quantization viability and latency trade-offs on resource-constrained systems.',
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
      { key: 'Token Generation Speed', value: '23 tokens/second on Intel Core i5-8350U (4-core / 8-thread)' },
      { key: 'Speech Synthesis', value: 'Piper v1.2.0 neural vocoder (22 kHz Opus output, MOS 4.2)' },
      { key: 'Audio Transport', value: 'WebRTC getUserMedia + Opus audio track (32 kbps mono)' },
      { key: 'Status & Feasibility', value: 'Exploratory Prototype / Architectural Lab (100% offline on 8GB)' },
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
        label: 'Deployment Architecture',
        value: 'Containerized (Docker)',
        detail: 'Isolated microservice architecture with Redis container orchestration',
      },
    ],
    specSheet: [
      { key: 'Backend Framework', value: 'Python 3.11, Flask, Gunicorn' },
      { key: 'Key-Value Datastore', value: 'Redis 7.0 with volatile-ttl eviction policies' },
      { key: 'Concurrency Safety', value: 'Redis WATCH / MULTI / EXEC atomic transaction pipeline' },
      { key: 'Identifier Entropy', value: '128-bit cryptographically secure UUID4 identifiers' },
      { key: 'File Sanitization', value: 'Strict MIME-type validation, filename hashing, and disk isolation' },
      { key: 'CI/CD Pipeline', value: 'GitHub Actions testing suites with Docker image builds' },
    ],
    tech: ['Python', 'Flask', 'Redis', 'Docker', 'Docker Compose', 'GitHub Actions', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Aayushbankar/onetimeshare',
    highlights: [
      'Atomic Redis transactions prevent concurrent double-download race conditions.',
      'Automated key eviction guarantees unretrieved secrets expire cleanly without manual cleanup.',
      'Comprehensive 30-day documentation log tracking every architectural decision.',
    ],
    verification: 'Verified containerized microservice stack with automated integration test suites passing in CI.',
  },
  {
    id: 'it-department-portal',
    index: 'S–07',
    name: 'IT Department Official Portal',
    category: 'Production Campus Portal',
    domain: 'Production & Platforms',
    status: 'Live in Production',
    badgeType: 'moss',
    tagline: 'Zero-Cost Static Campus Web Platform Serving 500+ Daily Users',
    description:
      'The official digital platform for the Information Technology Department at Government Polytechnic Gandhinagar. Built with a Thick-Client Architecture utilizing Jekyll static compilation, HTML5, CSS3, and vanilla JavaScript client-side routing, hosted on GitHub Pages with 0 cost while serving 500+ daily campus users.',
    overview:
      'Built and maintained as the official primary web presence for the IT Department at Govt. Polytechnic Gandhinagar. Designed for zero recurring infrastructure overhead, the platform implements a thick-client architecture with Jekyll static site compilation, semantic HTML5, CSS3, and modular vanilla JavaScript client-side routing. Deployed via GitHub Pages with automated CI/CD at ₹0 hosting cost, delivering institutional circulars, academic syllabi, and student resources with sub-400ms loading speeds to 500+ daily campus users.',
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
        detail: 'Permanent zero-cost architecture hosted on GitHub Pages static edge',
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
      { key: 'Architecture', value: 'Thick-Client Architecture with vanilla JavaScript client-side routing' },
      { key: 'Static Compilation', value: 'Jekyll static compilation with automated GitHub Pages edge deployment' },
      { key: 'Frontend Stack', value: 'HTML5, CSS3, and modular Vanilla JavaScript (Zero framework overhead)' },
      { key: 'Hosting & CDN', value: 'GitHub Pages with 0 cost (Permanent zero infrastructure budget)' },
      { key: 'Active Scale', value: 'Serving 500+ daily campus users (students, faculty, and administration)' },
      { key: 'Accessibility & Mobile', value: 'Responsive across 320px to 4K displays with ARIA standards' },
      { key: 'Status', value: 'Official departmental website currently active in production' },
      { key: 'Live URL', value: 'https://itgpg.github.io/it/' },
    ],
    tech: ['Jekyll', 'GitHub Pages', 'HTML5', 'CSS3', 'Vanilla JavaScript'],
    repoUrl: 'https://github.com/itgpg/it',
    liveUrl: 'https://itgpg.github.io/it/',
    highlights: [
      'Official departmental web portal for Government Polytechnic Gandhinagar.',
      'Sustains 500+ daily active campus users with 99.98% uptime at $0 hosting expense.',
      'Thick-client routing in vanilla JavaScript with Jekyll static compilation.',
    ],
    verification: 'Live in production, serving hundreds of students and faculty members daily.',
  },
  {
    id: 'port-scanner',
    index: 'S–08',
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
    id: 'kafka-story-generator',
    index: 'S–09',
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
    index: 'S–10',
    name: 'YT_STLK Activity Engine',
    category: 'Media Intelligence & Surveillance',
    domain: 'Production & Platforms',
    status: 'Complete',
    badgeType: 'default',
    tagline: 'Real-Time Creator Playlist & Feed Ingestion Engine',
    description:
      'A Python Flask surveillance engine that continuously monitors target YouTube creator channels for newly added playlists, unlisted uploads, and curriculum revisions with zero quota exhaustion.',
    overview:
      'Created to solve the problem of stealth playlist updates and unannounced lecture drops across technical course creators. The engine operates an intelligent polling loop that queries the YouTube Data API v3 while respecting strict daily quota budgets through hash-based change detection and conditional HTTP etags. Deltas are stored in an indexed SQLite database and broadcast to subscribed webhook channels in real time.',
    plateImage: '/figures/card-ytstlk.svg',
    benchmarks: [
      {
        label: 'Production Architecture',
        value: 'Continuous Daemon',
        detail: 'Automated background task worker checking channel deltas',
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
        label: 'Runtime Environment',
        value: 'Docker / Python Daemon',
        detail: 'Continuous local or server worker execution with health-checks',
      },
    ],
    specSheet: [
      { key: 'Backend Framework', value: 'Python 3, Flask, Gunicorn' },
      { key: 'Runtime Environment', value: 'Python Daemon / Docker Service' },
      { key: 'API Integration', value: 'Google APIs Client / YouTube Data API v3' },
      { key: 'Database', value: 'SQLite with WAL mode and compound unique indices' },
      { key: 'Job Scheduler', value: 'APScheduler background thread executor' },
      { key: 'Notification Channels', value: 'Discord Webhooks + JSON HTTP callbacks' },
    ],
    tech: ['Python', 'Flask', 'YouTube Data API', 'SQLite', 'APScheduler'],
    repoUrl: 'https://github.com/Aayushbankar/yt_stlk',
    highlights: [
      'Automated channel surveillance engine with public web and webhook interfaces.',
      'Saves developers from manual channel refreshes during technical bootcamps.',
      'Engineered with aggressive caching to remain well inside free-tier API quotas.',
    ],
    verification: 'Monitors multiple real-world programming education channels with verified continuous execution.',
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
