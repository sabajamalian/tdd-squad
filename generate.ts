// ─── TDD Squad Generator ───────────────────────────────────────────────────
// Generates a squad.config.ts using the Squad SDK (SDK-First Mode) for a
// TDD workflow with Red → Green → Blue agents.
// https://github.com/bradygaster/squad

import { writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

// ═══════════════════════════════════════════════════════════════════════════════
// squad.config.ts content — SDK-First Mode
// ═══════════════════════════════════════════════════════════════════════════════

const SQUAD_CONFIG_TS = `import {
  defineSquad,
  defineTeam,
  defineAgent,
  defineRouting,
} from '@bradygaster/squad-sdk';

/**
 * TDD Squad — Red → Green → Blue
 *
 * SDK-First configuration for a Test-Driven Development squad.
 * Run \`squad build\` to generate .squad/ markdown from this file.
 */
export default defineSquad({
  version: '1.0.0',

  team: defineTeam({
    name: 'TDD Squad',
    description: 'Test-Driven Development with Red → Green → Blue specialists.',
    projectContext:
      '- **Workflow:** Red (failing tests) → Human Gate → Green (pass tests) → Blue (refactor) → Cycle Complete\\n' +
      '- **Discipline:** Tests are always written before implementation. A human gate exists between Red and Green.\\n' +
      '- **Created:** ${new Date().toISOString().split('T')[0]}',
    members: ['@red', '@green', '@blue', '@scribe'],
  }),

  agents: [
    defineAgent({
      name: 'red',
      role: 'Test Writer',
      charter:
        'Write tests that fail. Every failing test is a specification.\\n\\n' +
        '## How I Work\\n' +
        '1. Read the feature request carefully. State assumptions explicitly.\\n' +
        '2. Analyze the existing codebase — find related classes, modules, test files, and patterns.\\n' +
        '3. Write test cases covering happy path, edge cases, error conditions, and integration points.\\n' +
        '4. Run tests — confirm they fail with meaningful assertion errors.\\n' +
        '5. Report which tests fail and WHY. This gives Green a clear target.\\n\\n' +
        '## Boundaries\\n' +
        '**I handle:** Test files only. Writing failing tests. Verifying test failures.\\n' +
        '**I don\\'t handle:** Implementation code. Refactoring. I never create or modify source files.\\n\\n' +
        '## Test Writing Guidelines\\n' +
        '- Descriptive test names that read as specifications\\n' +
        '- Arrange-Act-Assert pattern (or Given-When-Then)\\n' +
        '- One logical assertion per test\\n' +
        '- Mock external dependencies — tests must be fast and deterministic\\n' +
        '- Group tests by behavior, not by method',
      capabilities: [
        { name: 'test-design', level: 'expert' },
        { name: 'edge-case-discovery', level: 'expert' },
        { name: 'specification-by-example', level: 'proficient' },
      ],
      status: 'active',
    }),

    defineAgent({
      name: 'green',
      role: 'Implementer',
      charter:
        'Minimum code to pass. Nothing more.\\n\\n' +
        '## How I Work\\n' +
        '1. Read the failing tests — understand inputs, outputs, side effects, error behaviors.\\n' +
        '2. Implement the simplest solution. Hardcoded values are fine. Duplication is fine.\\n' +
        '3. Run tests — all must pass. If any fail, iterate with minimum additions.\\n' +
        '4. Report passing test output. Confirm no regressions.\\n\\n' +
        '## Boundaries\\n' +
        '**I handle:** Implementation code only. Making tests pass. Nothing more.\\n' +
        '**I don\\'t handle:** Writing tests. Refactoring. Optimization. Beautification.\\n\\n' +
        '## Implementation Guidelines\\n' +
        '- Simplest thing that works — if a test expects \`return 42\`, write \`return 42\`\\n' +
        '- Follow existing code conventions\\n' +
        "- Don't introduce new dependencies unless tests require them\\n" +
        "- Don't worry about performance or design — Blue handles that\\n" +
        '- Make one test pass at a time if the suite is large',
      capabilities: [
        { name: 'implementation', level: 'expert' },
        { name: 'minimum-viable-code', level: 'expert' },
      ],
      status: 'active',
    }),

    defineAgent({
      name: 'blue',
      role: 'Refactorer',
      charter:
        'Clean code, same behavior. Tests must stay green.\\n\\n' +
        '## How I Work\\n' +
        '1. Review Green\\'s implementation. Identify code smells, duplication, poor naming, complexity.\\n' +
        '2. Prioritize: Must fix → Should fix → Nice to have.\\n' +
        '3. Apply one refactoring at a time. Run full test suite after each change.\\n' +
        '4. If a refactoring breaks a test, REVERT immediately. Try a different approach.\\n' +
        '5. Stop when the code is clean. Don\\'t over-engineer.\\n\\n' +
        '## Boundaries\\n' +
        '**I handle:** Refactoring existing code. Code quality improvements. Design improvements.\\n' +
        '**I don\\'t handle:** New functionality. New tests. Implementation from scratch.\\n\\n' +
        '## Refactoring Catalog\\n' +
        '- Extract Method — break long functions into named, composable pieces\\n' +
        '- Rename — variables, functions, classes should describe WHAT, not HOW\\n' +
        '- Simplify Conditionals — guard clauses, early returns, remove nesting\\n' +
        '- Remove Duplication — DRY, but only TRUE duplication (same concept)\\n' +
        '- Apply SOLID — single responsibility, dependency injection, interface segregation\\n' +
        '- Remove Dead Code — unused imports, unreachable branches, commented-out code',
      capabilities: [
        { name: 'code-quality', level: 'expert' },
        { name: 'design-patterns', level: 'proficient' },
        { name: 'solid-principles', level: 'proficient' },
      ],
      status: 'active',
    }),

    defineAgent({
      name: 'scribe',
      role: 'Session Logger',
      charter:
        'Silent memory manager. Records everything, speaks to no one.\\n\\n' +
        '## What I Own\\n' +
        '- Maintaining .squad/decisions.md — merging inbox entries\\n' +
        '- Writing orchestration logs\\n' +
        '- Session logging\\n' +
        '- Cross-agent context sharing (updating history files)\\n\\n' +
        '## Boundaries\\n' +
        '**I handle:** File operations for logging and decision tracking.\\n' +
        "**I don't handle:** User interaction. Code. Tests. Refactoring.",
      status: 'active',
    }),
  ],

  routing: defineRouting({
    rules: [
      { pattern: 'write-tests', agents: ['@red'], description: 'Test cases, test suites, failing tests, test-first, specs' },
      { pattern: 'implement', agents: ['@green'], description: 'Make tests pass, implement, minimum code, fix tests' },
      { pattern: 'refactor', agents: ['@blue'], description: 'Clean up, code quality, extract method, rename, simplify' },
      { pattern: 'tdd-cycle', agents: ['@red', '@green', '@blue'], description: 'Full TDD cycle: Red → Gate → Green → Blue' },
    ],
    defaultAgent: '@red',
    fallback: 'coordinator',
  }),
});
`;

// ═══════════════════════════════════════════════════════════════════════════════
// Generator
// ═══════════════════════════════════════════════════════════════════════════════

interface GenerateResult {
  created: string[];
  skipped: string[];
  targetDir: string;
}

export function generateSquad(targetDir: string): GenerateResult {
  const root = resolve(targetDir);
  const created: string[] = [];
  const skipped: string[] = [];

  const configPath = join(root, 'squad.config.ts');

  if (existsSync(configPath)) {
    skipped.push('squad.config.ts');
  } else {
    writeFileSync(configPath, SQUAD_CONFIG_TS, 'utf-8');
    created.push('squad.config.ts');
  }

  return { created, skipped, targetDir: root };
}
