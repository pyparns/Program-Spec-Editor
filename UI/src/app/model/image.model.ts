import { Action } from "./action.model";
import { Component } from "./component.model";

export class Image {
    imageName?: string;
    imageDescription?: string;
    components?: Component[];
    actions?: Action[];
}