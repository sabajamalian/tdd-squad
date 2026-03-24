# TDD Squad

Test-Driven Development workflow encoded as [GitHub Copilot custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents). Three AI agents enforce the Red-Green-Refactor cycle directly in Copilot Chat.

## Prerequisites

- Node.js >= 18
- npm >= 10.x

---

## Setup

```bash
git clone <repo-url>
cd tdd-squad
npm install
```

---

## Usage

### 1. Generate agents in your project

```bash
# Generate agents in the current directory
npm start

# Generate agents in another repository
npm start -- ~/code/my-project
```

This creates four `.github/agents/*.agent.md` files in the target repository:

| File | Agent | Role |
|------|-------|------|
| `tdd-squad.agent.md` | `@tdd-squad` | Orchestrator — runs the full Red → Green → Blue cycle |
| `red.agent.md` | `@red` | 🔴 Writes failing tests |
| `green.agent.md` | `@green` | 🟢 Implements minimum code to pass tests |
| `blue.agent.md` | `@blue` | 🔵 Refactors for quality |

### 2. Use the agents in GitHub Copilot Chat

Open the target repo in VS Code and use the agents:

```
@tdd-squad Add email validation to the User class
```

The orchestrator will run Red → (human review) → Green → Blue automatically.

Or address agents individually:

```
@red Write tests for the password reset flow
@green Make the tests pass
@blue Clean up the auth module
```

Because these are Copilot Chat agents, **conversation state is maintained** — you can say "proceed" or "make changes" and the agent remembers the full context.

---

## Workflow

```
🔴 Red (write failing tests)
  │
  ▼
⏸  Human Gate — review tests before proceeding
  │
  ▼
🟢 Green (minimum code to pass tests)
  │
  ▼
🔵 Blue (refactor, keep tests green)
  │
  ▼
✅ Cycle complete
```

| Agent | Phase | Role |
|-------|-------|------|
| Red | Write failing tests | Creates test cases before implementation exists |
| Green | Make tests pass | Implements minimum code -- nothing more |
| Blue | Refactor | Improves code quality, all tests must stay green |

---

## Project Structure

```
tdd-squad/
  index.ts           # CLI entry point — generates .github/agents/ files
  generate.ts        # Agent file generator with agent definitions
  package.json
  tsconfig.json
```

---

## Re-running

Running `npm start` again is safe — existing agent files are skipped, not overwritten. To update agents, delete the files you want to regenerate and run again.

---

## License

MIT
