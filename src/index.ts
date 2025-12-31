#!/usr/bin/env node
import { Command } from "commander";
import { addProject, isExists } from "./file-manager";

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
        if (isExists(options.id)) {
            console.log("You Already Initialized It!");
            process.exit(1);
        }
    })
    .action((options) => {
        console.log("Initializing New Project...");
        addProject(options.id, options.name, options.file);
        console.log('Project added successfully');
    });


program.parse();