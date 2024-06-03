import { IUser } from "@/types/app";

interface IAuthState {
  isLogin: boolean;
  token: string;
  user: IUser;
}
