import { Program } from "./program.model";

export class ProgramSpec {
    id?: string;
    latest?: number;
    programs?: Program[];
    accId?: string;
}