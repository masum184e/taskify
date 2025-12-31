## SHEBANG

`#!/usr/bin/env node` is called a shebang. It tells your operating system how to run this file. **It must be the first line.**

What It Means? Run this file using Node.js

When you type: `taskify --help`, the OS looks at the first line of the file and says:

> “Ah, this file should be executed with node.”

### Break It Down

#### `#!`

- Special marker for Unix-like systems
- Means: this is an executable script

#### `/usr/bin/env`

- Finds a program in your system’s `PATH`
- Makes it portable (works across systems)

#### `node`

- The runtime that should execute the file

So together:

> Use whatever Node.js is available on this system to run this file

### Why It Is REQUIRED for CLI Tools

Without it: `taskify`

The OS does not know:

- What program should run the file
- How to interpret the JavaScript

Result:

- File opens
- Or nothing happens
- Or “command not found”

### Why Use `/usr/bin/env node` Instead of `/usr/bin/node`

- ❌ Hard-coded path - `#!/usr/bin/node`
  - Might fail if Node is installed elsewhere.
- Portable - `#!/usr/bin/env node`. Works on:
  - macOS
  - Linux
  - Windows (via npm shim)

### How It Works with npm bin

In `package.json`:

```json
"bin": {
"taskify": "./dist/index.js"
}
```

When you run:

```sh
npm link
```

npm creates:

- macOS/Linux → symlink
- Windows → `taskify.cmd`

That shim:

- Reads the shebang
- Executes the file with node

## Make it Executable

To run your tool globally or like a real command, add a `bin` section to your `package.json`:

```json
"bin": {
  "my-tool": "./index.js"
}
```

Then run `npm link` in your terminal to install it locally. Now you can just type `my-tool greet John` in your terminal.

## `npm link`

`npm link` forces npm to recreate the .cmd shim.

Run:

```sh
where taskify
```

You should see something like:

```sh
C:\Users\USER\AppData\Roaming\npm\taskify.cmd
```

If you don’t see `.cmd`, the CLI will not work.

## Most Used Methods & Commands

Commander uses a "fluent interface" (chainable methods). Here are the heavy hitters:

| Feature | Used For | Example (Code) | Example CLI Command & Result |
| ----------------------- | ------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| `new Command()` | Creates a new CLI program | `const program = new Command();` | `mycli --help` → shows CLI help instead of “command not found” |
| `.name()` | Sets the CLI name | `program.name('mycli');` | `mycli --help` → usage starts with `Usage: mycli [options]` |
| `.description()` | Describes the command | `program.description('A simple CLI tool');` | `mycli --help` → shows “A simple CLI tool” at the top |
| `.command()` | Multi-command CLIs | `program.command('build');` | `mycli build` → runs the `build` subcommand |
| `.option()` | Flags & config | `.option('-p, --port <number>')` | `mycli build --port 3000` → passes `3000` to the command |
| `.argument()` | Files, paths, IDs | `.argument('<file>')` | `mycli build app.js` → uses `app.js` as input |
| `.version()` | Tool versioning | `program.version('1.0.0');` | `mycli --version` → prints `1.0.0` |
| `.help()` | Auto-generated docs | `program.help();` | `mycli help` or error → prints full help text |
| `.requiredOption()` | Mandatory configs | `.requiredOption('-e, --env <env>')` | `mycli build` → ❌ error<br>`mycli build --env prod` → ✅ runs |
| `.action()` | Defines runtime behavior | `.action(() => {...})` | `mycli build` → executes command logic |
| `.parse(process.argv)` | Parses CLI input | `program.parse(process.argv);` | Any `mycli ...` command works only after parsing |
| `.showHelpAfterError()` | Help on mistakes | `program.showHelpAfterError();` | `mycli build --prt 3000` → shows error + help |
| `.alias()` | Shortcut command name | `.command('install').alias('i')` | `mycli i` → same as `mycli install` |
| `.preAction()` | Lifecycle Hook | `.hook('preAction', (cmd) => { ... })` | Run logic (like checking Auth) before any subcommand executes |

## Pro-Tips for Discovery

- **Automatic Help:** You don't need to write a help command. Commander generates it automatically. Try running `node index.js --help`.
- **Default Values:** You can add a third parameter to `.option()` to set a default: `.option('-p, --port <number>', 'port', '8080')`.
- **Variadic Arguments:** If you want to accept multiple inputs (like a list of files), use `...` syntax: `.argument('<files...>')`.
