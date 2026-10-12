export interface ExploitPhase {
  phase: string;
  name: string;
  detail: string;
  status: 'verified' | 'disproved' | 'partial';
  artifact: string;
}

export interface Finding {
  index: string;
  stamp: string;
  title: string;
  domain: string;
  target: string;
  tagline: string;
  abstract: string;
  chain?: ExploitPhase[];
  flow?: string[];
  tier2?: {
    verdict: string;
    hits: string;
    deadEnds: number;
    experiments: number;
    claims: number;
    retractions: number;
    notes: string;
  };
  provenance?: {
    rootCause: string;
    decodedGadget: string;
    compilerMismatch: string;
  };
  verifiedTargets?: string[];
  defenses?: string[];
  repoUrl: string;
  articleSlug: string;
}

export const findings: Finding[] = [
  {
    index: '00–1',
    stamp: 'CVE-2026-46242',
    title: 'Bad Epoll',
    domain: 'Kernel Exploit Research',
    target: 'Linux 6.12.67 x86_64 / Android 14 GKI ARM64',
    tagline:
      'epoll race → UAF → cross-cache reclaim → KASLR leak → JOP pivot → ROP → root. Tier 1 verified. Tier 2: DoS-only (0/102,740).',
    abstract:
      'Full exploit chain dissection of an epoll subsystem Use-After-Free in fs/eventpoll.c. Demonstrates cross-cache slab reclamation in kmalloc-192 via msg_msg, /proc/self/fdinfo KASLR bypass, JOP stack pivot to pipe buffer, and ROP commit_creds privilege escalation. Rigorous empirical testing on Android GKI ARM64 reveals 0/102,740 natural hits across 19 experiments, confirming DoS-only viability without debugger assistance.',
    chain: [
      {
        phase: '01',
        name: 'RACE TRIGGER',
        detail:
          'Concurrent epoll_ctl(EPOLL_CTL_DEL) + close() on the same file descriptor. Schedulable window is ~6 instructions in ep_remove().',
        status: 'verified',
        artifact: 'QEMU/KVM test harness with synchronized GDB trace',
      },
      {
        phase: '02',
        name: 'UAF RECLAIM',
        detail:
          'Dangling struct file (120B in dedicated eventpoll_epi cache) after __ep_remove() races eventpoll_release(). Cross-cache kmalloc-192 reclaim via msg_msg spray.',
        status: 'verified',
        artifact: 'KASAN UAF trace at ep_poll_callback+0x284',
      },
      {
        phase: '03',
        name: 'CROSS-CACHE HIJACK',
        detail:
          'pipe_buffer spray reclaims freed slab page. pipe_buffer.ops function pointer table controlled to establish arbitrary kernel code redirection.',
        status: 'verified',
        artifact: 'pipe_buffer.ops overwrite → f_op control',
      },
      {
        phase: '04',
        name: 'KASLR BYPASS',
        detail:
          'Forged f_inode pointer read through /proc/self/fdinfo reveals kernel text pointers. Provides arbitrary address read (AAR) without crashing.',
        status: 'verified',
        artifact: 'AAR primitive via fdinfo leaking kernel base',
      },
      {
        phase: '05',
        name: 'JOP STACK PIVOT',
        detail:
          'PIVOT1 (mov [rdi+8], rcx; ret) bridges to PIVOT4 (push rcx; pop rsp; pop rcx; ret). Mathematically verified gadget sequence pivots kernel stack to pipe buffer.',
        status: 'verified',
        artifact: 'GDB step-by-step instruction log across pivot boundary',
      },
      {
        phase: '06',
        name: 'ROP PRIVILEGE ESCALATION',
        detail:
          'pop rdi → prepare_kernel_cred → commit_creds → swapgs; iretq. Spawns root shell under CONFIG_RETPOLINE mitigation.',
        status: 'verified',
        artifact: 'libxdk dynamic ROP generator from target_db.kxdb',
      },
    ],
    tier2: {
      verdict: 'DoS-Only (0 / 102,740 Hits)',
      hits: '0 / 102,740 natural hits',
      deadEnds: 21,
      experiments: 19,
      claims: 42,
      retractions: 3,
      notes:
        'The race is structurally real and ~100% reproducible with GDB hardware watchpoint assistance (VER-026). However, under natural Linux scheduler conditions on ARM64 GKI, 102,740 unaided attempts produced 0 exploitable hits (best timing alignment: 1 cycle, ~16 ns). 21 dead ends and 3 retracted claims cataloged in evidence registers.',
    },
    provenance: {
      rootCause:
        'Crash in ROP chain isolated to LEB128 decoded byte sequence 0xf5 0x0d decoding to gadget 0x1bd (0xffffffff810001bd) in target_db.kxdb.',
      decodedGadget: 'pop rdi; ret gadget offset mismatch across distro builds',
      compilerMismatch:
        'GCC 16.1.1 (Fedora build host) vs GCC 13.2.0 (Ubuntu target image) caused an 8-byte stack displacement.',
    },
    repoUrl: 'https://github.com/Aayushbankar/bad_epoll_ab_tier2',
    articleSlug: 'cve-2026-46242-bad-epoll',
  },
  {
    index: '00–2',
    stamp: 'CVE-2026-28576',
    title: 'Android Contacts SQLi',
    domain: 'Android Framework Security',
    target: 'Android 11 through Android 15 Developer Preview',
    tagline:
      'Projection injection in ContactsProvider2 → zero-permission boolean oracle over Binder IPC. Cross-UID data exfiltration.',
    abstract:
      'Vulnerability breakdown of an arbitrary SQL projection injection in Android’s core ContactsProvider2.java. By exploiting targetSdk compatibility logic that bypassed column allowlist enforcement, an unprivileged third-party app with zero permissions (no READ_CONTACTS) can construct a 1-bit boolean extraction oracle across Binder IPC boundaries to exfiltrate sqlite_master schemas and token stores.',
    flow: [
      'Untrusted unprivileged application invokes ContentResolver.query() with a crafted projection column array.',
      'ContactsProvider2.buildProjectionMap() fails to validate projection columns against allowlist under targetSdk compatibility logic.',
      'Malicious projection column injected: CASE WHEN (SELECT substr(sql,1,1) FROM sqlite_master WHERE type="table")="C" THEN 1 ELSE 0 END AS leak',
      'Android Binder IPC serializes and returns cursor to untrusted caller — zero permissions requested or checked.',
      '1-bit boolean oracle systematically enumerates database schemas, internal metadata, and cross-UID assets.',
    ],
    verifiedTargets: [
      'Android 11 (API 30)',
      'Android 12 & 12L (API 31/32)',
      'Android 13 (API 33)',
      'Android 14 (API 34)',
      'Android 15 Developer Preview (API 35)',
    ],
    defenses: [
      'YARA Rule: CVE-2026-28576_projection_injection (detects crafted SQL projection patterns in DEX/APK)',
      'Suricata Signature: CVE-2026-28576_binder_anomaly (detects anomalous binder parcel transactions over local bridge)',
    ],
    repoUrl: 'https://github.com/Aayushbankar/cve-2026-28576',
    articleSlug: 'cve-2026-28576-android-contacts-sqli',
  },
];
