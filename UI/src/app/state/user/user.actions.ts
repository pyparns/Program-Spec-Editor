import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const appLoaded = createAction("[App] App Loaded");

export const addUser = createAction(
    "[Add User] Register",
    props<{ User: User }>()
  );