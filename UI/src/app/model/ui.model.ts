import { Action } from "./action.model";
import { Component } from "./component.model";

export class Ui {
    imageName?: string;
    imageDescription?: string;
    components?: Component[];
    actions?: Action[];
}