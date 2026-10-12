export interface ScopedService {
  index: string;
  title: string;
  scope: string;
  deliverables: string[];
  timeline: string;
}

export const collab = {
  headline: 'Scoped Engagements with Proof',
  subheadline: 'Transparent technical scopes with concrete milestones, reproducible test harnesses, and verifiable deliverables.',
  availability: {
    status: 'Available for Scoped Research',
    note: 'Based in Gandhinagar, Gujarat (IST). Final-year Diploma IT student & systems security researcher. Open for scoped vulnerability audits, exploit reproduction, and verifiable systems engineering.',
    location: 'Gandhinagar, Gujarat, India (IST / UTC+5:30)',
  },
  services: [
    {
      index: '01',
      title: 'Scoped Vulnerability Research & Triage',
      scope: 'Targeted kernel subsystem and Android framework audits, exploit primitive synthesis, and patch evaluation.',
      deliverables: [
        'Hermetic QEMU/KVM reproduction harness with automated GDB Python telemetry',
        'Empirical verification ledger detailing every tested claim, address, and gadget',
        'Explicit dead-ends register documenting non-viable exploitation paths',
        'Vendor remediation report and defensive YARA / Suricata detection rules',
      ],
      timeline: '2–4 weeks per scoped target',
    },
    {
      index: '02',
      title: 'Verifiable Systems & Log Architecture',
      scope: 'High-throughput ingestion engines, cryptographic transparency ledgers, and tamper-evident event streaming.',
      deliverables: [
        'Zero-copy SIMD ingestion pipelines in Rust and C with deterministic benchmarks',
        'RFC 6962 BLAKE3 Merkle tree audit logging with inclusion proof verification',
        'Multi-signature quorum attestations (Ed25519) and OCSF 1.2.0 schema normalization',
        'Interactive operational terminal dashboards (Ratatui TUI) with low RSS footprint',
      ],
      timeline: '3–6 weeks per system plane',
    },
    {
      index: '03',
      title: 'Edge AI & Local Offline Pipelines',
      scope: 'Local-first voice and retrieval systems engineered for consumer edge hardware without cloud dependencies.',
      deliverables: [
        'End-to-end chained voice pipeline (Silero VAD + faster-whisper + llama.cpp + Piper TTS)',
        'Sub-second conversational turn latency optimization over WebRTC data channels',
        'Local vector database ingestion (ChromaDB / Sentence Transformers) with zero data leakage',
        'Complete hardware resource profiling on standard x86_64 laptops',
      ],
      timeline: '2–3 weeks per pipeline',
    },
  ] as ScopedService[],
};
