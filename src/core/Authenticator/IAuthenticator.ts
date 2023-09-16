import { IAuthOptions } from "./IAuthOptions";

export interface IAuthenticator {
  getSessionId(authOptions: IAuthOptions): Promise<string>;
}
