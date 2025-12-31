import { addProject, getProjectById, getProjects, isExists } from "./file-manager";

const showProjectById = (id: string) => {
    const data = getProjectById(id)
    if (!data) {
        console.log("Project Not Found")
        process.exit(1);
    }
    console.log(`Project ${id} Details`)
    console.log("-----------------------------")
    console.log(data);
}

const showProjects = () => {
    const data = getProjects()
    if (data.projects.length <= 0) {
        console.log("Projects Not Found")
        process.exit(1);
    }
    console.log(`All Projects`)
    console.log("=============================")
    data.projects.forEach((item) => {
        console.log(item)
        console.log("-----------------------------")
    })
}

const createProject = (id: string, name: string, file: string) => {
    console.log("Initializing New Project...");
    addProject(id, name, file);
    console.log('Project added successfully');
}

const isProjectExists = (id: string) => {
    if (isExists(id)) {
        console.log("You Already Initialized It!");
        process.exit(1);
    }
}

const isProjectFound = (id: string) => {
    if (id && !isExists(id)) {
        console.log("Project Not Found!");
        process.exit(1);
    }
}

export { showProjectById, showProjects, createProject, isProjectExists }