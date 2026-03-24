# TDD Squad

Test-Driven Development workflow encoded as a [Squad](https://github.com/bradygaster/Squad) agent team. Three AI agents enforce the Red-Green-Refactor cycle.

## Prerequisites

- Node.js >= 20.x
- npm >= 10.x
- GitHub Copilot CLI installed and authenticated

### Verify

```bash
node --version    # v20.x or higher
npm --version     # 10.x or higher
copilot --version # confirm Copilot CLI is available
```

### Install GitHub Copilot CLI (if not installed)

```bash
npm install -g @github/copilot
copilot auth login
```

---

## Setup

```bash
git clone <repo-url>
cd tdd-squad
npm install
```

---

## Running

### Via npm (CLI mode)

Pass a feature description as an argument:

```bash
npm start -- "Add email validation to the User class"
npm start -- "Implement a discount calculator for orders"
```

### Via npx (without global install)

```bash
npx tsx index.ts "Add email validation to the User class"
```

### Via GitHub Copilot agent mode

Load the squad config directly in Copilot:

```bash
copilot --agent squad
```

Then type your feature request in the Copilot chat:

```
Add email validation to the User class
```

### Address agents individually

```bash
# Red phase only -- write failing tests
npm start -- "Red, write tests for the password reset flow"

# Green phase only -- make tests pass
npm start -- "Green, make the tests pass"

# Blue phase only -- refactor
npm start -- "Blue, clean up the auth module"
```

---

## Workflow

```
Red (write failing tests)
  |
  v
Human Gate (optional, configurable)
  |
  v
Green (minimum code to pass tests)
  |
  v
Blue (refactor, keep tests green)
  |
  v
Cycle complete
```

| Agent | Phase | Role |
|-------|-------|------|
| Red | Write failing tests | Creates test cases before implementation exists |
| Green | Make tests pass | Implements minimum code -- nothing more |
| Blue | Refactor | Improves code quality, all tests must stay green |

---

## Configuration

All configuration lives in `squad.config.ts`.

### Human Gate

Controls whether the workflow pauses between Red and Green for manual review:

```typescript
// squad.config.ts
const humanGate = true;   // pause after Red -- review tests before proceeding
const humanGate = false;  // auto-proceed -- Red -> Green -> Blue without stopping
```

### Model Selection

```typescript
const defaults = defineDefaults({
  model: {
    preferred: 'claude-sonnet-4.5',
    fallback: 'claude-haiku-4.5'
  }
});
```

### Routing Patterns

Keywords that trigger specific agents:

| Pattern | Agent(s) | Phase |
|---------|----------|-------|
| `red`, `write test`, `failing test`, `test first` | Red | Single |
| `green`, `make pass`, `implement`, `fix the test` | Green | Single |
| `blue`, `refactor`, `clean up`, `improve` | Blue | Single |
| `tdd`, `full cycle`, `add feature`, `new feature` | Red -> Green -> Blue | Full |

---

## Project Structure

```
tdd-squad/
  index.ts           # CLI entry point, connects to Copilot and runs the TDD cycle
  squad.config.ts    # Agent definitions, routing rules, team config
  package.json
  tsconfig.json
```

---

## Tech Stack

- TypeScript (ES2022, ESNext modules)
- [Squad SDK](https://github.com/bradygaster/Squad) (`@bradygaster/squad-sdk`)
- `tsx` for direct TypeScript execution
- GitHub Copilot CLI as the AI backend

---

## Troubleshooting

### Connection refused

```
Could not connect to the Copilot CLI.
```

Fix:

```bash
npm install -g @github/copilot
copilot auth login
npm start -- "your feature description"
```

### Command not found: copilot

```bash
npm install -g @github/copilot
```

### TypeScript errors

```bash
npx tsc --noEmit
```

---

## License

MIT
