#!/usr/bin/env node
import { Command } from "commander";
import { handleCreateProject, handleRemoveProject, handleShowProject } from "./display-manager";
import { startRepl } from "./repl";

const program = new Command();

program
    .name("taskify")
    .description("Taskify - Firebase Project Management CLI Tool")
    .version("1.0.0")
    .exitOverride();

program
    .command("add")
    .description("Register a new Firebase project")
    .requiredOption("-i, --id <id>", "Unique Project ID")
    .requiredOption("-n, --name <name>", "Display Name")
    .requiredOption("-f, --file <path>", "Path to service.json")
    .action((opts) => handleCreateProject(opts.id, opts.name, opts.file));

program
    .command("show")
    .alias("ls")
    .description("List all projects or show details of one")
    .option("-i, --id <id>", "Specific Project ID")
    .action((opts) => handleShowProject(opts.id));

program
    .command("remove")
    .alias("rm")
    .description("Remove one or all projects")
    .option("-i, --id <id>", "Project ID to remove")
    .option("-a, --all", "Clear entire storage")
    .action((opts) => {
        if (opts.all) {
            handleRemoveProject();
        } else if (opts.id) {
            handleRemoveProject(opts.id);
        }
    });

program
    .command("repl")
    .description("Start interactive mode")
    .action(() => {
        startRepl(program);
    });

program.parse();