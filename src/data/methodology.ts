export interface MethodologyPhase {
  number: string;
  name: string;
  title: string;
  motto: string;
  description: string;
  artifacts: string[];
}

export const methodology = {
  creed: 'Proof over claims. Evidence first, assertions never.',
  subtitle: 'The 5-Phase Empirical Security Research Lifecycle',
  summary:
    'Security research without verifiable telemetry is speculation. Every finding on this site follows an audited 5-stage lifecycle from initial threat modeling to coordinated vendor disclosure.',
  phases: [
    {
      number: '01',
      name: 'THREAT MODELING',
      title: 'Deconstruct Boundaries & Trust Assumptions',
      motto: 'Map the attack surface before executing a single instruction.',
      description:
        'Map process isolation, UID sandboxes, IPC channels, and kernel capability boundaries. Identify whether the target belongs above the waterline (framework/accessibility) or below it (SLUB allocators, system call handlers, driver ioctls).',
      artifacts: ['Trust-boundary diagrams', 'Attack tree decomposition', 'Mitigation inventory'],
    },
    {
      number: '02',
      name: 'LAB HARNESS SETUP',
      title: 'Hermetic, Instrumentable Execution Environments',
      motto: 'If it cannot be traced under a debugger, it cannot be verified.',
      description:
        'Construct deterministic reproduction environments using QEMU/KVM virtual machines with custom-compiled kernel targets. Attach automated GDB Python instrumentation, enable KASAN, KMEMLEAK, and UBSAN sanitizers, and write automated launcher scripts.',
      artifacts: ['qemu_launcher.sh', 'gdb_trace.py scripts', 'KASAN sanitizer logs'],
    },
    {
      number: '03',
      name: 'TARGETED ANALYSIS',
      title: 'Symbolic Analysis, Gadget Search & Verification',
      motto: 'Leverage static and dynamic tooling; verify every gadget by hand.',
      description:
        'Utilize binary analysis tooling (rp++, angr, custom GDB scripts) to catalog candidate gadgets, trace control-flow graphs, and validate memory layout constraints. Every candidate chain is manually checked against compiler offsets and target register state.',
      artifacts: ['target_db.kxdb gadget catalogs', 'angr CFG recovery logs', 'Manual GDB step traces'],
    },
    {
      number: '04',
      name: 'PROOF LEDGER VERIFICATION',
      title: 'Immutable Evidence Registers & Explicit Retractions',
      motto: 'Dead ends and retractions are published alongside verified proofs.',
      description:
        'Catalog every hypothesis in a structured verification ledger. Record claim numbers, exact memory addresses, reproduction commands, and status verdicts. Maintain an explicit DEAD_ENDS_REGISTER and retract disproved hypotheses publicly.',
      artifacts: ['VERIFICATION_LEDGER (42 claims)', 'DEAD_ENDS_REGISTER (21 paths)', 'EXPERIMENT_INDEX (19 runs)'],
    },
    {
      number: '05',
      name: 'HARDENING & DISCLOSURE',
      title: 'Defensive Signatures & Remediation Architecture',
      motto: 'Close the loop by authoring the signatures that kill the bug.',
      description:
        'Translate offensive findings into durable defensive telemetry. Author YARA rules for static payload detection, Suricata signatures for IPC anomaly inspection, and submit detailed engineering runbooks to upstream maintainers.',
      artifacts: ['YARA detection rules', 'Suricata network signatures', 'Vendor mitigation reports'],
    },
  ] as MethodologyPhase[],
};
