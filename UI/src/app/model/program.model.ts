import { Sheet } from "./sheet.model";

export class Program {
    id?: string;
    projectName?: string;
    programId?: string;
    programName?: string;
    systemWorkId?: string;
    systemWorkName?: string;
    systemWorkDesigner?: string;
    status?: string;
    sheet?: Sheet;
    version?: number;
    date?: Date;
}