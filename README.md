# TDD Squad

Test-Driven Development workflow encoded as a [Squad](https://github.com/bradygaster/squad) team. Three AI agents enforce the Red-Green-Refactor cycle directly in GitHub Copilot.

## Prerequisites

- Node.js >= 18
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

### 1. Generate the Squad in your project

```bash
# Generate in the current directory
npm start

# Generate in another repository
npm start -- ~/code/my-project
```

This creates the full Squad structure in the target repository:

```
my-project/
  squad.agent.md                    # Copilot agent entry point
  .squad/
    team.md                         # Team roster (Red, Green, Blue, Scribe)
    routing.md                      # Work routing rules
    ceremonies.md                   # TDD ceremonies (test review gate, retro)
    decisions.md                    # Shared team brain
    agents/
      red/charter.md + history.md   # 🔴 Test Writer
      green/charter.md + history.md # 🟢 Implementer
      blue/charter.md + history.md  # 🔵 Refactorer
      scribe/charter.md            # 📋 Session Logger
    decisions/inbox/                # Decision drop-box for agents
    orchestration-log/              # Agent work logs
    skills/                         # Reusable learnings
    identity/                       # Team identity
    log/                            # Session logs
```

### 2. Use the Squad in GitHub Copilot

Open the target repo in VS Code, select the Squad agent, and describe a feature:

```
@tdd-squad Add email validation to the User class
```

The coordinator runs the full TDD cycle: Red → (human review) → Green → Blue.

Or address agents individually:

```
@red Write tests for the password reset flow
@green Make the tests pass
@blue Clean up the auth module
```

The Squad maintains full conversation state — agents learn your codebase, record decisions, and build knowledge across sessions.

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
| Scribe | Logging | Records decisions and session history (silent) |

---

## Project Structure

```
tdd-squad/
  index.ts           # CLI entry point — runs the generator
  generate.ts        # Squad file generator with agent definitions
  package.json
  tsconfig.json
```

---

## Re-running

Running `npm start` again is safe — existing files are skipped, not overwritten. To update files, delete the ones you want to regenerate and run again.

---

## License

MIT
