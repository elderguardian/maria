import { ISchoolFetcher } from "./ISchoolFetcher";
import { ISchool } from "./ISchool";

export class SchoolFetcher implements ISchoolFetcher {
  async fetchSchoolOrNull(query: string): Promise<ISchool | null> {
    const schoolListUrl =
      "https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist";

    const rawSchoolDistricts = await fetch(schoolListUrl);
    const schoolDistricts = await rawSchoolDistricts.json();

    for (const schoolDistrict of schoolDistricts) {
      for (const school of schoolDistrict.Schulen) {
        if (school.Name == query) {
          return {
            id: school.Id,
            name: school.Name,
            region: school.Ort,
          };
        }
      }
    }

    return null;
  }
}
