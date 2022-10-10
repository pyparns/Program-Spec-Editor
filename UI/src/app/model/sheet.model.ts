import { Service } from "./service.model";
import { Ui } from "./ui.model";

export class Sheet {
    host?: string;
    port?: string;
    contextRoot?: string;
    erDiagram?: string;
    classDiagram?: string;
    services?: Service[];
    ui?: Ui[];
}