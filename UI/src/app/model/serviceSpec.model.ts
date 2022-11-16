export class ServiceTable {
    id?: string;
    service?: string;
    method?: string;
    action?: string;
    detail?: DetailServiceTable;
}

export class DetailServiceTable {
    title?: string;
    methodName?: string;
    inputParameter?: string;
    exampleResponse?: string;
    description?: string;
}

export class ServiceComponent {
    title?: string;
    host?: string;
    port?: string;
    contextRoot?: string;
    erDiagram?: File;
    classDiagram?: File;
    services?: ServiceTable[];
}