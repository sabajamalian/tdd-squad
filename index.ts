// ─── TDD Squad 🔴🟢🔵 ───────────────────────────────────────────────────────
// Generates Squad directory structure (.squad/ + squad.agent.md) in a
// target repository for TDD workflow via GitHub Copilot.

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
  console.log(`${C.dim}  Test-Driven Development with AI agents.${C.reset}`);
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

  console.log(`${C.magenta}  Generating TDD Squad in ${targetDir}...${C.reset}`);
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
  console.log(`${C.cyan}  Squad is ready! Open the project in VS Code and use:${C.reset}`);
  console.log(`${C.dim}    @tdd-squad  — Full Red → Green → Blue cycle${C.reset}`);
  console.log(`${C.dim}    @red        — Write failing tests${C.reset}`);
  console.log(`${C.dim}    @green      — Make tests pass${C.reset}`);
  console.log(`${C.dim}    @blue       — Refactor for quality${C.reset}`);
  console.log();
  console.log(`${C.dim}  Files generated:${C.reset}`);
  console.log(`${C.dim}    squad.agent.md        — Copilot agent entry point${C.reset}`);
  console.log(`${C.dim}    .squad/team.md        — Team roster${C.reset}`);
  console.log(`${C.dim}    .squad/routing.md     — Work routing rules${C.reset}`);
  console.log(`${C.dim}    .squad/agents/        — Agent charters & history${C.reset}`);
  console.log(`${C.dim}    .squad/decisions.md   — Shared team brain${C.reset}`);
  console.log();
}

main();
