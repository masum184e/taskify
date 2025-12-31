#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
    .name("taskify")
    .description("Taskify - Firebase Project Management CLI Tool")
    .version("1.0.0")