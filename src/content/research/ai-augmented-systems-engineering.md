---
title: "AI-Augmented Systems Engineering: Directing Autonomous Agents in Vulnerability Research"
description: "How to escape the 'vibe-coding' trap: an empirical, evidence-driven methodology for orchestrating multi-agent LLMs to reproduce kernel vulnerabilities and architect verifiable systems without losing technical depth. The 5-phase methodology used for Bad Epoll, SPECTRE-PRISM, and QuantLab."
publishDate: 2026-09-28
category: "AI Engineering"
tags: ["AI Orchestration", "Vulnerability Research", "Verification Ledger", "Autonomous Agents", "Prompt Architecture", "Bad Epoll", "SPECTRE-PRISM", "QuantLab"]
verifiableLedgerUrl: "https://github.com/Aayushbankar/aayushbankar.github.io"
featured: false
---

# AI-Augmented Systems Engineering

Over the past two years, software engineering has shifted toward generative AI. While rapid prototyping allows developers to quickly scaffold applications, applying AI agents to **low-level systems security and kernel vulnerability research** presents unique failure modes:

1. Hallucinated struct offsets and calling conventions (e.g., `task_struct->comm` at 1928 vs actual 1840 on local GCC 16 build)
2. Silent race condition bugs in multi-threaded C code that pass static analysis but panic at runtime
3. Overconfident assertions without mathematical proof (e.g., "PIVOT4 is `sldt`" — actually a syntax confusion hallucination)

To build reliable systems with AI, researchers must transition from *prompting* to **rigorous multi-agent orchestration backed by empirical verification ledgers**. This is the methodology used for CVE-2026-46242 (Bad Epoll), SPECTRE-PRISM, and QuantLab.

## The 5-Phase Empirical Methodology

```
[01 Threat Model] ──> [02 Lab Harness] ──> [03 AI Synthesis] ──> [04 Proof Ledger] ──> [05 Harden & Disclose]
```

### Phase 1: Threat Model — Audit Before Synthesis

Never ask an LLM to "write a kernel exploit" or "build a logging engine" directly. Instead, **specify the exact architectural contracts** as structured prompts:

- **Memory layouts**: SLUB cache sizing (`kmalloc-192` vs dedicated `eventpoll_epi`), `task_struct` offsets, `struct epitem` size (120B on Android GKI)
- **Register conventions**: x86_64 System V AMD64 ABI vs ARM64 AAPCS64
- **Mitigation constraints**: `CONFIG_RETPOLINE=y`, `kCFI`, `CONFIG_HARDENED_USERCOPY`, `CONFIG_SLUB_DEBUG`
- **Hardware boundaries**: QEMU/KVM virtualization artifacts, nested preemption latency, ARM64 PAC/MTE/SELinux

**Deliverable**: A `THREAT_MODEL.md` mapping attack surface → trust boundaries → required primitives.

### Phase 2: Lab Harness — Deterministic Reproduction Before Code

Every synthesized component must run inside automated, disposable environments **before** AI synthesis begins:

- **QEMU/KVM VMs** with kernel `.config` matching target (e.g., `lts-6.12.67` + KASAN + KCOV)
- **GDB automation scripts** (`trace_qemu.py`) for register dumping at pivot boundaries
- **Clang AddressSanitizer (KASAN) + ThreadSanitizer** instrumentation
- **Hardware watchpoints** via `perf`/`ptrace` for memory corruption detection
- **Deterministic crash reproduction**: Fixed seed, CPU pinning (`taskset -c 0`), CPU count controlled

**Deliverable**: A `LAB_HARNESS/` directory with `start_qemu.sh`, `run_gdb_interactive.sh`, `trace_qemu.py` that reproduces the target state **without AI code**.

### Phase 3: AI Synthesis — Structured Multi-Agent Orchestration

AI acts as an **execution engine**, not an architect. The human directs:

| Agent Role | Responsibility | Verification Gate |
|------------|----------------|-------------------|
| **Architect** | Writes `ARCHITECTURE.md`, `SPEC.md` — human only | Human review |
| **Synthesizer** | Generates C/Rust/Go from spec + harness feedback | Compiles + runs in harness |
| **Auditor** | Static analysis (clang-tidy, cppcheck, `angr` symbolic exec) | Zero critical findings |
| **Tester** | Runs harness, captures telemetry, feeds back to Synthesizer | Reproduces target behavior |
| **Ledger Keeper** | Records every claim → test vector mapping | 1:1 claim:evidence |

**Prompt architecture pattern** (used for Bad Epoll ROP chain):

```markdown
## SYSTEM PROMPT
You are a kernel exploit engineer. Target: Linux 6.12.67 x86_64.
Constraints: CONFIG_RETPOLINE=y, KASLR, SMEP, SMAP, kCFI.
Available: pipe_buffer cross-cache reclaim, AAR via fdinfo.
Required: JOP bridge → RSP pivot → ROP chain → commit_creds(prepare_kernel_cred(0)).

## CONTEXT
- KASLR base leaked: 0xffffffff81000000
- pipe_buffer.ops controlled at virt+0x120
- PIVOT1: mov [rdi+8], rcx; ret (offset 0x1bd from ksym)
- Need: PIVOT4 gadget (push rcx; pop rsp; pop rcx; ret)

## TASK
Find PIVOT4 in vmlinux using angr. Return offset from _text.
Output: JSON { "gadget": "push rcx; pop rsp; pop rcx; ret", "offset": 0x... }
```

**Key principle**: The AI never "decides" the exploit strategy. The human provides the strategy; the AI executes the mechanical search/generation within rigid constraints.

### Phase 4: Proof Ledger — The Defining Principle

The verification ledger is what separates AI-augmented engineering from vibe coding. **Every technical claim must map to an empirical test vector.**

```
Claim: "PIVOT4 executes flawlessly"
Evidence: GDB trace at 0xffffffff810001bd showing RCX→RSP, RIP=PIVOT4, no fault
Location: trace_qemu.py output, PIVOT4_FINAL_PROOF.md

Claim: "98% KASLR leak success rate (warm slab)"
Evidence: 100 consecutive runs in QEMU, 98 leaks, 2 timeouts
Location: 02_tier1/00_progress_report.md

Claim: "DoS-only on Android GKI 6.1 ARM64"
Evidence: 102,740 race attempts, 0 hits, 21 dead ends documented
Location: DEAD_ENDS_REGISTER.md, EXPERIMENT_INDEX.md
```

**Ledger format** (markdown, machine-parseable):

```markdown
## VERIFICATION_LEDGER

### CLAIM-001
**Statement**: Cross-cache reclaim via pipe_buffer succeeds
**Type**: Primitive Verification
**Test Vector**: `exp007_same_cache_reclaim.c` — allocates 5000 epitems, frees target, sprays 5000 pipes
**Result**: PASS — forged `file->f_op` at `virt+0x120` controls `epoll_wait` dispatch
**Timestamp**: 2026-07-15T14:32:11+05:30
**Artifacts**: QEMU log, KASAN report, GDB trace

### CLAIM-042
**Statement**: Tier 2 race not naturally schedulable on Android GKI 6.1
**Type**: Negative Result
**Test Vector**: 102,740 iterations of race trigger on Pixel 7a (android14-6.1)
**Result**: FAIL — 0 hits, all attempts time out or panic preemptively
**Dead Ends**: 21 (see DEAD_ENDS_REGISTER.md)
**Timestamp**: 2026-08-03T09:17:44+05:30
```

### Phase 5: Harden & Disclose — Defensive Output

The final phase produces artifacts that outlive the exploit:

| Output | Purpose |
|--------|---------|
| **YARA/Suricata signatures** | Detection for the vulnerability class |
| **Patch mitigation analysis** | Root cause → fix mapping for vendors |
| **Verification ledger** | Publicly auditable evidence |
| **Reproduction harness** | One-command `./reproduce.sh` for vendors |
| **Engineering KT** | Knowledge transfer for team continuation |

---

## Case Studies: This Methodology in Production

### Bad Epoll (CVE-2026-46242) — Tier 1 ✅, Tier 2 ❌ (DoS-only)

| Phase | Artifact | Status |
|-------|----------|--------|
| 1 Threat Model | `THREAT_MODEL.md` (epoll race surface) | ✅ |
| 2 Lab Harness | QEMU/KVM + `trace_qemu.py` + KASAN | ✅ |
| 3 AI Synthesis | `libxdk` ROP generator + `angr` gadget search | ✅ (blocked at `.kxdb` mismatch) |
| 4 Proof Ledger | 42 claims / 21 dead ends / 19 experiments | ✅ |
| 5 Harden | YARA: `CVE-2026-46242_epoll_uaf`, Suricata: `epoll_race_anomaly` | ✅ |

**Key lesson**: The `.kxdb` database mismatch (GCC 16 local vs Google build) was caught **only** because the ledger demanded offset provenance tracing. Vibe coding would have shipped a broken exploit.

### SPECTRE-PRISM — 5-Plane Architecture Delivered

| Phase | Artifact | Status |
|-------|----------|--------|
| 1 Threat Model | Unverifiable telemetry → verifiable architecture | ✅ |
| 2 Lab Harness | eBPF probes + `analyzer.py` + synthetic load generator | ✅ |
| 3 AI Synthesis | Rust (spectre-agent/graph/rules) + eBPF-C + WASM parsers | ✅ |
| 4 Proof Ledger | 42 claims (13K EPS, 840µs p99, BLAKE3 Merkle, Ed25519 quorum) | ✅ |
| 5 Harden | SIH 2026 screening + RFC 6962 compliance audit | ✅ |

### QuantLab — Event-Driven Backtesting with Almgren-Chriss Impact

| Phase | Artifact | Status |
|-------|----------|--------|
| 1 Threat Model | Overfitting → transaction cost decay → PBO | ✅ |
| 2 Lab Harness | CPCV (k=16, p=4, embargo=10) + AR(1) synthetic tests | ✅ |
| 3 AI Synthesis | Python engine (SMA/RSI/Momentum) + Almgren-Chriss √model | ✅ |
| 4 Proof Ledger | DSR=0.73, 31% OOS decay, Sortino, 7 simulation charts | ✅ |
| 5 Harden | GTU DI05000341 minor project submission | ✅ |

---

## The Ground-Truth Systems Fluency Requirement

**Critical**: An engineer directing AI tooling must maintain manual systems fluency. Understanding raw POSIX APIs, C memory allocators, pointer arithmetic, and assembly instructions under GDB is non-negotiable. If you cannot write and audit the harness by hand, you cannot verify automated outputs or spot subtle race conditions.

> "AI as an exploratory tool, human as the verifying architect. The verification ledger is the contract between them."

---

*Cross-references: [Bad Epoll Teardown](/research/cve-2026-46242-bad-epoll) · [SPECTRE-PRISM Engine](/systems#spectre-prism) · [QuantLab Engine](/systems#quantlab) · [About & Methodology](/about)*