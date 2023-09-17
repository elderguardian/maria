import { ISchool } from "./ISchool";
import { ISchoolFetchOptions } from "./ISchoolFetchOptions";

export interface ISchoolFetcher {
  fetchSchoolOrNull(options: ISchoolFetchOptions): Promise<ISchool | null>;
}
