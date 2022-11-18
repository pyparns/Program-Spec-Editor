export class ComponentTable {
    id?: string;
    label?: string;
    attribute?: string;
    property?: string;
    event?: string;
}

export class ActionTable {
    id?: string;
    action?: string;
    description?: string;
}

export class ComponentPage {
    id?: string;
    image?: File;
    name?: string;
    componentTable?: ComponentTable[];
    actionTable?: ActionTable[];
}

export class UiComponent {
    title?: string;
    componentPage?: ComponentPage[];
}