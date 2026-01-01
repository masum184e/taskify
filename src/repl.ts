import readline from "readline";
import { Command } from "commander";

export function startRepl(program: Command) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "taskify> ",
    });

    console.log("Taskify REPL mode. Type 'help' or 'exit'.");
    rl.prompt();

    rl.on("line", async (line) => {
        const input = line.trim();

        if (!input) {
            rl.prompt();
            return;
        }

        if (input === "exit" || input === "quit") {
            rl.close();
            return;
        }

        if (input === "clear" || input === "cls") {
            console.clear();
            rl.prompt();
            return;
        }

        if (input === "help") {
            program.outputHelp();
            rl.prompt();
            return;
        }

        try {
            const argv = [...input.split(" ")];
            await program.parseAsync(argv, { from: "user" });
        } catch (err: any) {
            if (err.code !== "commander.exit") {
                console.error(err.message);
            }
        }

        rl.prompt();
    });

    rl.on("close", () => {
        console.log("👋 Goodbye!");
    });
}
