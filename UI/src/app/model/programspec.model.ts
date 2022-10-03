import { Program } from "./program.model";

export class ProgramSpec {
    id?: string;
    latest?: string;
    programs?: Program[];
    accId?: string;
}