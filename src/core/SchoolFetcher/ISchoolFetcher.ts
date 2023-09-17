import { ISchool } from "./ISchool";

export interface ISchoolFetcher {
  fetchSchoolOrNull(name: string): Promise<ISchool | null>;
}
