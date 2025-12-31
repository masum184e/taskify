# Taskify

**Taskify** is a command-line tool for managing **Firebase projects locally**.
It allows you to register, inspect, and remove Firebase projects using their **service account JSON** files, with safe validation and persistent storage.

## Features

- Interactive **REPL mode** (terminal stays alive)
- Non-interactive CLI commands
- Register Firebase projects using service account JSON
- Validate Firebase service account structure
- List all registered projects
- View details of a specific project
- Remove individual projects or clear all
- Persistent local storage (`projects.json`)
- Type-safe implementation with TypeScript
- Simple, predictable CLI interface

## Installation

```sh
git clone <your-repo-url>
cd taskify
npm install
```

## How to run

### Global Command

Build and Link Globally

```sh
npm run build
npm link
```

Verify installation:

```sh
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
taskify> add -i joinify-01 -n "Joinify" -f ./firebase-adminsdk.json # Add New Project
taskify> show                   # Show All Projects
taskify> show -i joinify-01     # Show Single Project
taskify> remove --all           # Remove All Projects
taskify> remove -i joinify-01   # Remove Single Project
taskify> exit
```

- `-i`, `--id` → Unique project identifier
- `-n`, `--name` → Display name
- `-f`, `--file` → Path to Firebase service account JSON

## Storage

Projects are stored locally in:

```sh
projects.json
```

This file is automatically created in the directory where the CLI is executed.

## CLI Commands

| Command        | Alias | Description                   |
| -------------- | ----- | ----------------------------- |
| `add`          | —     | Register a Firebase project   |
| `show`         | `ls`  | List all projects or show one |
| `remove`       | `rm`  | Remove a project              |
| `remove --all` | —     | Clear all projects            |
| `--help`       | `-h`  | Show help                     |
| `--version`    | `-V`  | Show version                  |

## Future Improvements

1. Quote-aware parsing
2. Autocomplete & command history
3. Colored output & tables
4. Config file support
5. Plugin system
6. SQLite or LevelDB storage
7. Publish as a global npm package
8. Table-based output
9. Encrypted storage for service accounts
