import { ISchool } from "../SchoolFetcher/ISchool";

export interface IAuthOptions {
  username: string;
  password: string;
  school: ISchool;
}
