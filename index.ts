// ─── TDD Squad 🔴🟢🔵 ───────────────────────────────────────────────────────
// Generates a squad.config.ts (Squad SDK-First Mode) in a target repository
// for TDD workflow via GitHub Copilot.

import { generateSquad } from './generate.js';

// ═══════════════════════════════════════════════════════════════════════════════
// ANSI helpers
// ═══════════════════════════════════════════════════════════════════════════════

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

function banner(): void {
  console.log();
  console.log(`${C.cyan}${C.bold}  🔴🟢🔵  TDD Squad${C.reset}`);
  console.log(`${C.dim}  ─────────────────────────────────────────${C.reset}`);
  console.log(`${C.dim}  Squad SDK-First Mode — TDD agents${C.reset}`);
  console.log(`${C.dim}  Red (write tests) → Green (make pass) → Blue (refactor)${C.reset}`);
  console.log();
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════════════════

function main(): void {
  banner();

  const args = process.argv.slice(2);
  const targetDir = args[0] ?? process.cwd();

  console.log(`${C.magenta}  Generating squad.config.ts in ${targetDir}...${C.reset}`);
  console.log();

  const result = generateSquad(targetDir);

  if (result.created.length > 0) {
    console.log(`${C.green}  ✅ Created:${C.reset}`);
    for (const f of result.created) {
      console.log(`${C.dim}     • ${f}${C.reset}`);
    }
  }

  if (result.skipped.length > 0) {
    console.log();
    console.log(`${C.yellow}  ⏭  Already exists (skipped):${C.reset}`);
    for (const f of result.skipped) {
      console.log(`${C.dim}     • ${f}${C.reset}`);
    }
  }

  console.log();
  console.log(`${C.cyan}  Next steps:${C.reset}`);
  console.log(`${C.dim}    1. npm install @bradygaster/squad-sdk${C.reset}`);
  console.log(`${C.dim}    2. squad build${C.reset}`);
  console.log(`${C.dim}    3. Open VS Code and use the Squad agent${C.reset}`);
  console.log();
}

main();
