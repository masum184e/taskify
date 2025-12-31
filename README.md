# Taskify

**Taskify** is a simple yet powerful **command-line task manager** built with **Node.js, TypeScript, and Commander.js**.  
It supports both **single-command execution** and an **interactive REPL mode**, making it ideal for learning real-world CLI development.

## Features

- Add, list, complete, and remove tasks
- Persistent storage using a local JSON file
- Interactive **REPL mode** (terminal stays alive)
- Non-interactive CLI commands
- Type-safe implementation with TypeScript

## Commands Supported

```sh
taskify add "Buy milk" --priority high --due 2025-01-05
taskify list
taskify list --completed
taskify done 1
taskify remove 1
```

## Installation

```sh
git clone <your-repo-url>
cd taskify
npm install
```

## How to run

### Global Command

```sh
npm run build
npm link
taskify --help
```

### REPL Mode

```sh
npm run dev -- repl
```

You should see:

```sh
Taskify REPL started. Type 'help' for commands.
taskify>
```

Then

```sh
taskify> add buy milk
taskify> list
taskify> add buy water
taskify> list
taskify> exit
```

## CLI Commands

| Command            | Description            |
| ------------------ | ---------------------- |
| `add <title>`      | Add a new task         |
| `list`             | List all tasks         |
| `list --completed` | List completed tasks   |
| `list --pending`   | List pending tasks     |
| `done <id>`        | Mark task as completed |
| `remove <id>`      | Remove a task          |
| `repl`             | Start interactive mode |

**Example Session:**

```sh
Taskify REPL started. Type 'help' for commands.
taskify> add buy milk
taskify> list
1. [ ] buy milk (medium)

taskify> add buy water
taskify> list
1. [ ] buy milk (medium)
2. [ ] buy water (medium)

taskify> exit
Goodbye 👋
```

## Future Improvements

1. Quote-aware parsing (add "buy milk")
2. Autocomplete & command history
3. Colored output & tables
4. Config file support
5. Plugin system
6. SQLite or LevelDB storage
7. Publish as a global npm package
