import { IRepPlanFetcher } from "./IRepPlanFetcher";
import { IRepPlanFetchOptions } from "./IRepPlanFetchOptions";
import { IRepPlanEntry } from "./IRepPlanEntry";
import { IFullAuth } from "../../core/Authenticator/IFullAuth";

export class RepPlanFetcher implements IRepPlanFetcher {
  async fetch(
    fullAuth: IFullAuth,
    fetchOptions: IRepPlanFetchOptions = {}
  ): Promise<IRepPlanEntry[]> {
    const planDate = fetchOptions.date ?? new Date();
    const planDateString = planDate.toLocaleDateString("en-CH");
    const repPlanUrl = `https://start.schulportal.hessen.de/vertretungsplan.php?ganzerPlan=true&tag=${planDateString}`;

    const formData = new URLSearchParams();
    formData.append("tag", planDateString);
    formData.append("ganzerPlan", "true");

    const rawPlanResponse = await fetch(repPlanUrl, {
      method: "POST",
      headers: {
        Host: "start.schulportal.hessen.de",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie:
          `sph-login-upstream=4;schulportal_lastschool=${fullAuth.authOptions.school.id}; ` +
          `i=${fullAuth.authOptions.school.id}; ` +
          `sid=${fullAuth.sessionId}`,
      },
      body: formData,
    });

    const rawPlan = await rawPlanResponse.json();
    let parsedPlan: IRepPlanEntry[] = [];

    for (const rawEntry of rawPlan) {
      parsedPlan.push({
        type: rawEntry.Art,
        date: new Date(rawEntry.Tag.split(".").reverse().join("-")),
        teachers: {
          regular: {
            name: rawEntry.Lehrer,
            abbreviation: rawEntry.Lehrerkuerzel,
          },
          rep: {
            name: rawEntry.Vertreter,
            abbreviation: rawEntry.Vertreterkuerzel,
          },
        },
        lesson: parseInt(rawEntry.Stunde),
        classes: [rawEntry.Klasse, rawEntry.Klasse_alt].filter(
          (e) => e != null && e != ""
        ),
        subjects: [rawEntry.Fach, rawEntry.Fach_alt].filter(
          (e) => e != null && e != ""
        ),
        rooms: [rawEntry.Raum, rawEntry.Raum_alt].filter(
          (e) => e != null && e != ""
        ),
        notices: [rawEntry.Hinweis, rawEntry.Hinweis2].filter(
          (e) => e != null && e != ""
        ),
        learnGroup: rawEntry.Lerngruppe,
        talkedOutEntry: rawEntry._sprechend,
      });
    }

    return parsedPlan;
  }
}
