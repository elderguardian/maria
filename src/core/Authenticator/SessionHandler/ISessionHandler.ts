import { IAuthOptions } from "../IAuthOptions";

export interface ISessionHandler {
  getSessionId(authOptions: IAuthOptions): Promise<string>;
}
