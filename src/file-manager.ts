import fs from "fs";
import path from "path";
import { Project, ServiceAccountContent, TaskifyStorage } from "./types/project";
import { isValidServiceAccount } from "./lib";

const FILE_PATH = path.join(process.cwd(), "projects.json");

const getProjects = (): TaskifyStorage => {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            return { projects: [] };
        }

        const content = fs.readFileSync(FILE_PATH, "utf-8").trim();
        if (!content) return { projects: [] };

        const data = JSON.parse(content);
        return {
            projects: Array.isArray(data.projects) ? data.projects : []
        };
    } catch (error) {
        console.error("Error reading projects.json: Invalid JSON format.");
        return { projects: [] };
    }
};

const isExists = (id: string): boolean => {
    const storage = getProjects();
    return storage.projects.some((p) => p.id === id);
};

const addProject = (id: string, name: string, serviceFilePath: string) => {
    const absolutePath = path.resolve(serviceFilePath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`\nError: File not found at: ${absolutePath}`);
        process.exit(1);
    }

    try {
        const serviceContentRaw = fs.readFileSync(absolutePath, "utf-8");
        const serviceData = JSON.parse(serviceContentRaw);

        if (!isValidServiceAccount(serviceData)) {
            console.error("Error: The provided JSON is not a valid Firebase Service Account.");
            console.info("Tip: Download the JSON from Firebase Console > Project Settings > Service Accounts.");
            process.exit(1);
        }

        const storage = getProjects();

        const newProject: Project = {
            id,
            name,
            addedAt: new Date().toISOString(),
            data: serviceData
        };

        storage.projects.push(newProject);

        fs.writeFileSync(FILE_PATH, JSON.stringify(storage, null, 2));

    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("Error: The service account file contains malformed JSON.");
        } else {
            console.error("An unexpected error occurred:", (error as Error).message);
        }
        process.exit(1);
    }
};

const getProjectById = (id: string): Project | undefined => {
    const storage = getProjects();
    return storage.projects.find((p) => p.id === id);
};

const removeProjectById = (id: string): boolean => {
    const storage = getProjects();
    const initialLength = storage.projects.length;

    storage.projects = storage.projects.filter((p) => p.id !== id);

    if (storage.projects.length < initialLength) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(storage, null, 2));
        return true;
    }
    return false;
};

const removeProjects = (): void => {
    const emptyStorage: TaskifyStorage = {
        projects: [],
    };
    fs.writeFileSync(FILE_PATH, JSON.stringify(emptyStorage, null, 2));
};

export { isExists, addProject, getProjects, getProjectById, removeProjectById, removeProjects };