import { Image } from "./image.model";

export class Program {
    id?: string;
    projectName?: string;
    programId?: string;
    programName?: string;
    systemWorkId?: string;
    systemWorkName?: string;
    systemWorkDesigner?: string;
    status?: string;
    images?: Image[];
    version?: number;
    date?: Date;
}