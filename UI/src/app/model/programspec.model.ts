import { Image } from "./image.model";

export interface ProgramSpec {
    projectName: string;
    programId: string;
    programName: string;
    systemWorkId: string;
    systemWorkName: string;
    systemWorkDesigner: string;
    status: string;
    images: Image[];
}