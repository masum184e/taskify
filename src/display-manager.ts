import { 
    getProjects, 
    findProjectById, 
    checkProjectExists, 
    insertProject, 
    deleteProjectById, 
    clearAllProjects 
} from "./file-manager";

export const handleShowProject = (id?: string) => {
    if (id) {
        const project = findProjectById(id);
        if (!project) {
            console.log(`Error: Project '${id}' not found.`);
            // process.exit(1);
            return;
        }
        console.log(`\nDetails for: ${project.name} [${id}]`);
        console.log("------------------------------------------");
        console.log(JSON.stringify(project.data, null, 2));
    } else {
        const projects = getProjects();
        if (projects.length === 0) {
            console.log("No projects found. Use 'add' to register one.");
            return;
        }
        console.log(`\nTaskify: All Registered Projects (${projects.length})`);
        console.log("==========================================");
        projects.forEach(p => console.log(` • ${p.id.padEnd(15)} | ${p.name}`));
        console.log("==========================================\n");
    }
};

export const handleCreateProject = (id: string, name: string, file: string) => {
    try {
        if (checkProjectExists(id)) {
            console.error(`Error: Project ID '${id}' is already taken.`);
            // process.exit(1);
            return;
        }
        console.log("Initializing New Project...");
        insertProject(id, name, file);
        console.log(`Success: Project '${name}' added to Taskify.`);
    } catch (err: any) {
        console.error(`Failed: ${err.message}`);
        // process.exit(1);
        return;
    }
};

export const handleRemoveProject = (id?: string) => {
    if (id) {
        if (deleteProjectById(id)) {
            console.log(`Project '${id}' removed successfully.`);
        } else {
            console.error(`Error: Could not find project '${id}' to remove.`);
            // process.exit(1);
            return;
        }
    } else {
        clearAllProjects();
        console.log("Storage Cleared: All projects removed.");
    }
};