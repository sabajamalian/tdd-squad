# TDD Squad 🔴🟢🔵

Test-Driven Development workflow encoded as a [Squad](https://github.com/bradygaster/Squad) agent team.

Red → Green → Refactor, guided by AI.

## Quick Start

```bash
npm install
npm start
```

Then in GitHub Copilot:

```
Add email validation to the User class
```

## The Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   🔴 RED        │────▶│   🟢 GREEN      │────▶│   🔵 BLUE       │
│   Test Writer   │     │   Implementer   │     │   Refactorer    │
│                 │     │                 │     │                 │
│ Write failing   │     │ Make tests      │     │ Clean up code   │
│ tests first     │     │ pass (minimum)  │     │ keep tests green│
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                                │
         ▼                                                │
   ⏸️ Human Gate                                          │
   (configurable)                              ✅ Cycle complete
```

## Agents

| Agent | Phase | What it does |
|-------|-------|--------------|
| 🔴 Red | Write failing tests | Creates comprehensive test cases BEFORE any implementation exists |
| 🟢 Green | Make tests pass | Implements the minimum code to make tests green — nothing more |
| 🔵 Blue | Refactor | Improves code quality while keeping all tests passing |

## Human Gate

The `humanGate` flag in `squad.config.ts` controls whether the workflow pauses between Red and Green:

```typescript
const humanGate = true;  // Pause after Red — review failing tests before proceeding
const humanGate = false; // Auto-proceed — Red → Green → Blue without stopping
```

When enabled, Red presents the failing test results and waits for your approval before Green begins implementation. This prevents wasted effort if the tests don't match your requirements.

## Example Commands

```
# Full TDD cycle
"Add a discount calculator to the Order class"

# Address agents directly
"Red, write tests for the password reset flow"
"Green, make the tests pass"
"Blue, clean up the auth module"

# Refactoring only
"Blue, refactor the payment service"
```

## Configuration

Edit `squad.config.ts` to customize:

- **`humanGate`** — `true`/`false` to enable/disable the review gate between Red and Green
- **Agent charters** — adjust test-writing standards, implementation constraints, or refactoring priorities
- **Model selection** — change the preferred model in `defaults`
- **Routing patterns** — modify which keywords trigger which agents

## Why This Pattern?

TDD discipline is hard to maintain. This squad enforces it structurally:

- **Red can't implement.** Tests must be written before code exists.
- **Green can't over-engineer.** Minimum code to pass, nothing more.
- **Blue can't change behavior.** Refactoring must keep tests green.
- **The human gate** (when enabled) catches requirement mismatches early.

Each agent has a narrowly scoped responsibility with explicit constraints, making it impossible to skip steps or cut corners.

## License

MIT
