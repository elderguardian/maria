import { ISchoolFetcher } from "./ISchoolFetcher";
import { ISchool } from "./ISchool";
import { ISchoolFetchOptions } from "./ISchoolFetchOptions";

export class SchoolFetcher implements ISchoolFetcher {
  async fetchSchoolOrNull(
    options: ISchoolFetchOptions
  ): Promise<ISchool | null> {
    const schoolListUrl =
      "https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist";

    const rawSchoolDistricts = await fetch(schoolListUrl);
    const schoolDistricts = await rawSchoolDistricts.json();

    for (const schoolDistrict of schoolDistricts) {
      for (const school of schoolDistrict.Schulen) {
        if (school.Name != options.name || school.Ort != options.city) {
          continue;
        }

        return {
          id: school.Id,
          name: school.Name,
          region: school.Ort,
        };
      }
    }

    return null;
  }
}
