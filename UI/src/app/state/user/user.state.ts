import { User } from "../../model/user.model";

export interface UserState {
  isAuthenticated: boolean;
  User: User;
}

export const initialState: UserState = {
  isAuthenticated: false,
  User: new User(),
};