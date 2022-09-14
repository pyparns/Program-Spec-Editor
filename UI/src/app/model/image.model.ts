import { Action } from "./action.model";
import { Component } from "./component.model";

export interface Image {
    imageName: string;
    imageDescription: string;
    components: Component[];
    actions: Action[];
}