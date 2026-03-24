# TDD Squad

Test-Driven Development workflow encoded as a [Squad SDK](https://github.com/bradygaster/squad) team configuration. Generates a `squad.config.ts` using Squad's SDK-First Mode with Red, Green, and Blue agents that enforce the TDD cycle in GitHub Copilot.

## Prerequisites

- Node.js >= 22.5
- npm >= 10.x
- [Squad CLI](https://github.com/bradygaster/squad) installed (`npm install -g @bradygaster/squad-cli`)

---

## Setup

```bash
git clone <repo-url>
cd tdd-squad
npm install
```

---

## Usage

### 1. Generate `squad.config.ts` in your project

```bash
# Generate in the current directory
npm start

# Generate in another repository
npm start -- ~/code/my-project
```

This creates a `squad.config.ts` in the target directory using the Squad SDK builders (`defineSquad`, `defineTeam`, `defineAgent`, `defineRouting`).

### 2. Install the Squad SDK, init, and build

```bash
cd ~/code/my-project
npm install @bradygaster/squad-sdk
squad init
squad build
```

`squad init` scaffolds the Squad in your project (creates `squad.agent.md`, workflows, identity, etc.). `squad build` then generates the `.squad/` agent charters and governance files from your `squad.config.ts`.

### 3. Use the Squad in GitHub Copilot

Open the target repo in VS Code, select the Squad agent, and describe a feature:

```
Add email validation to the User class
```

The coordinator runs the full TDD cycle: Red → (human review) → Green → Blue.

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
| Green | Make tests pass | Implements minimum code — nothing more |
| Blue | Refactor | Improves code quality, all tests must stay green |
| Scribe | Logging | Records decisions and session history (silent) |

---

## Project Structure

```
tdd-squad/
  index.ts           # CLI entry point — runs the generator
  generate.ts        # Generates squad.config.ts content
  package.json
  tsconfig.json
```

---

## Re-running

Running `npm start` again is safe — an existing `squad.config.ts` is skipped, not overwritten. To regenerate, delete it and run again.

---

## License

MIT
