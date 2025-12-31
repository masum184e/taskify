#!/usr/bin/env node
import { Command } from "commander";
import { createProject, isProjectExists, showProjectById, showProjects } from "./display-manager";

const program = new Command();

program
    .name("taskify")
    .description("Taskify - Firebase Project Management CLI Tool")
    .version("1.0.0");

program
    .command("add")
    .description("Add a Firebase Project")
    .requiredOption("-i, --id <id>", "Project ID")
    .requiredOption("-n, --name <name>", "Project Name")
    .requiredOption("-f, --file <path>", "Path to service.json file")
    .hook("preAction", (thisCommand) => {
        const options = thisCommand.opts();
        isProjectExists(options.id)
    })
    .action((options) => {
        createProject(options.id, options.name, options.file)
    });

program
    .command("show")
    .description("...")
    .option("-i, --id <id>", "Project ID")
    .hook("preAction", (thisCommand) => {
        const options = thisCommand.opts();
        isProjectExists(options.id)
    })
    .action((options) => {
        (options.id) ? showProjectById(options.id) : showProjects();
    })

program.parse();