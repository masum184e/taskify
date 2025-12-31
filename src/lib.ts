import { ServiceAccountContent } from "./types/project";

const isValidServiceAccount = (data: any): data is ServiceAccountContent => {
    const requiredKeys: (keyof ServiceAccountContent)[] = [
        "project_id",
        "private_key",
        "client_email",
        "type"
    ];
    return requiredKeys.every(key => key in data);
};

export { isValidServiceAccount }