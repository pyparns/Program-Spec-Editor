import { Action } from "./action.model";
import { Component } from "./component.model";

export interface Image {
    imageName: string;
    components: Component[];
    actions: Action[];
}