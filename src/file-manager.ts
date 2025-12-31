import fs from "fs";
import path from "path";
import { Project, ServiceAccountContent, TaskifyStorage } from "./types/project";
import { isValidServiceAccount } from "./lib";

const STORAGE_PATH = path.join(process.cwd(), "projects.json");

const loadStorage = (): TaskifyStorage => {
    try {
        if (!fs.existsSync(STORAGE_PATH)) return { projects: [] };
        const content = fs.readFileSync(STORAGE_PATH, "utf-8").trim();
        if (!content) return { projects: [] };
        const data = JSON.parse(content);
        return { projects: Array.isArray(data.projects) ? data.projects : [] };
    } catch (error) {
        console.error("Error: Failed to parse storage file (projects.json).");
        return { projects: [] };
    }
};

const saveStorage = (storage: TaskifyStorage) => {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(storage, null, 2));
};

export const getProjects = () => loadStorage().projects;

export const findProjectById = (id: string) => 
    loadStorage().projects.find(p => p.id === id);

export const checkProjectExists = (id: string): boolean => 
    loadStorage().projects.some(p => p.id === id);

export const insertProject = (id: string, name: string, serviceFilePath: string) => {
    const absolutePath = path.resolve(serviceFilePath);
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found at: ${absolutePath}`);
    }

    const serviceData: ServiceAccountContent = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
    if (!isValidServiceAccount(serviceData)) {
        throw new Error("Invalid Firebase Service Account JSON.");
    }

    const storage = loadStorage();
    const newProject: Project = {
        id,
        name,
        addedAt: new Date().toISOString(),
        data: serviceData
    };

    storage.projects.push(newProject);
    saveStorage(storage);
};

export const deleteProjectById = (id: string): boolean => {
    const storage = loadStorage();
    const initialCount = storage.projects.length;
    storage.projects = storage.projects.filter(p => p.id !== id);
    
    if (storage.projects.length < initialCount) {
        saveStorage(storage);
        return true;
    }
    return false;
};

export const clearAllProjects = () => saveStorage({ projects: [] });