export interface CyberLayer {
  name: string;
  code: 'AW' | 'BW';
  strategy: string;
  stability: string;
  risk: string;
  accent: 'moss' | 'ember';
  summary: string;
}

export interface Mitigation {
  name: string;
  purpose: string;
  bypass: string;
  status: 'bypassed' | 'partial' | 'hard' | 'academic' | 'defeated' | 'limited' | 'effective' | 'extreme';
}

export interface CveLandscapeEntry {
  cve: string;
  component: string;
  type: string;
  exploitedInWild: boolean;
  chainStage: string;
  patched: string;
}

export const cyberArch = {
  title: 'Unified Android Exploit Architecture',
  subtitle: 'Threat Model & Mitigation Matrix from Research Vault',
  layers: [
    {
      name: 'Above the Waterline',
      code: 'AW',
      strategy: 'Accessibility Services, Device Admin, Default Assistant / Launcher injection',
      stability: 'High stability across OEM versions',
      risk: 'Android 17 AAPM (Accessibility Anti-Abuse Protection Mechanism) restricts non-assistive apps',
      accent: 'moss',
      summary:
        'User-space automation exploiting framework permissions. Highly resilient against ASLR/CFI but vulnerable to user consent prompts and upcoming platform security lockdowns.',
    },
    {
      name: 'Below the Waterline',
      code: 'BW',
      strategy: 'Kernel & driver memory corruption chains (epoll UAF, Qualcomm/Mali GPU drivers, NFC)',
      stability: 'Fragile — monthly Android Common Kernel (ACK) patches break offsets and groom sequences',
      risk: 'Defended by hardware MTE, PAC, shadow stacks, kCFI, SELinux, and Samsung RKP',
      accent: 'ember',
      summary:
        'Zero-interaction local privilege escalation targeting core kernel subsystems. Requires chaining multiple info-leaks, heap grooms, and stack pivots to bypass modern defense layers.',
    },
  ] as CyberLayer[],

  mitigations: [
    {
      name: 'KASLR',
      purpose: 'Randomizes kernel base address on boot',
      bypass: 'Information leaks (/proc/self/fdinfo, msg_msg heap leaks)',
      status: 'bypassed',
    },
    {
      name: 'kCFI',
      purpose: 'Forward-edge indirect call verification',
      bypass: 'Type-matching gadgets with identical function signatures',
      status: 'partial',
    },
    {
      name: 'PAC (ARMv8.3+)',
      purpose: 'Cryptographic pointer authentication codes',
      bypass: 'Speculative side-channel oracles (high noise floor)',
      status: 'hard',
    },
    {
      name: 'MTE (ARMv9+)',
      purpose: '4-bit hardware memory tagging per 16 bytes',
      bypass: 'Deterministic tag reuse or TikTag side-channels',
      status: 'academic',
    },
    {
      name: 'SELinux',
      purpose: 'Mandatory Access Control security policy',
      bypass: 'Arbitrary kernel write overwriting LSM hook pointer tables',
      status: 'defeated',
    },
    {
      name: 'Scudo',
      purpose: 'Hardened user-space slab allocator',
      bypass: 'Non-deterministic grooming & randomized quarantine queue',
      status: 'limited',
    },
    {
      name: 'Shadow Call Stack',
      purpose: 'Isolates function return addresses on dedicated stack',
      bypass: 'ROP blocked; requires pure JOP/COP or direct data manipulation',
      status: 'effective',
    },
    {
      name: 'seccomp-bpf',
      purpose: 'Restricts available system calls for sandboxed processes',
      bypass: 'Limits attack surface; forces exploitation through allowed epoll/IPC APIs',
      status: 'effective',
    },
    {
      name: 'Samsung RKP',
      purpose: 'EL2 hypervisor protecting kernel page tables from modification',
      bypass: 'EL2 attack surface is minimal; prevents direct credential overwrites',
      status: 'extreme',
    },
  ] as Mitigation[],

  cveLandscape: [
    {
      cve: 'CVE-2025-48595',
      component: 'Android Framework',
      type: 'Integer Overflow',
      exploitedInWild: true,
      chainStage: 'Stage 2 (Sandbox Escape)',
      patched: 'Jun 2026',
    },
    {
      cve: 'CVE-2025-38352',
      component: 'Kernel (POSIX timers)',
      type: 'Race Condition',
      exploitedInWild: true,
      chainStage: 'Stage 3 (Root Escalation)',
      patched: 'Sep 2025',
    },
    {
      cve: 'CVE-2025-48543',
      component: 'Android Runtime (ART)',
      type: 'Privilege Escalation',
      exploitedInWild: true,
      chainStage: 'Stage 1–2 (Code Exec)',
      patched: 'Sep 2025',
    },
    {
      cve: 'CVE-2026-21385',
      component: 'Qualcomm GPU Driver',
      type: 'Integer Overflow',
      exploitedInWild: true,
      chainStage: 'Stage 3 (Kernel Read/Write)',
      patched: 'Mar 2026',
    },
    {
      cve: 'CVE-2026-0083',
      component: 'NFC Subsystem',
      type: 'UAF Race',
      exploitedInWild: false,
      chainStage: 'Stage 1 (Remote Attack Surface)',
      patched: 'Android 17',
    },
    {
      cve: 'CVE-2026-46242',
      component: 'Linux Kernel (epoll)',
      type: 'UAF Race (Bad Epoll)',
      exploitedInWild: false,
      chainStage: 'Collapses Stages 2+3',
      patched: 'Apr 2026',
    },
    {
      cve: 'CVE-2026-43074',
      component: 'Linux Kernel (epoll)',
      type: 'UAF Dereference',
      exploitedInWild: false,
      chainStage: 'Stage 3 (Kernel Denial of Service)',
      patched: 'Apr 2026',
    },
  ] as CveLandscapeEntry[],
};
