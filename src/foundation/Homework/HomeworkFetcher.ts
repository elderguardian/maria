import { IHomeworkFetcher } from "./IHomeworkFetcher";
import { IHomeworkFetchOptions } from "./IHomeworkFetchOptions";
import { IHomeworkEntry } from "./IHomeworkEntry";
import { IFullAuth } from "../../core/Authenticator/IFullAuth";
import parse from "node-html-parser";

export class HomeworkFetcher implements IHomeworkFetcher {
  async fetch(
    fullAuth: IFullAuth,
    fetchOptions: IHomeworkFetchOptions = {}
  ): Promise<IHomeworkEntry[]> {
    const homeworkUrl = `https://start.schulportal.hessen.de/meinunterricht.php`;

    const homeworkResponse = await fetch(homeworkUrl, {
      method: "POST",
      headers: {
        Host: "start.schulportal.hessen.de",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie:
          `sph-login-upstream=4;schulportal_lastschool=${fullAuth.authOptions.school.id}; ` +
          `i=${fullAuth.authOptions.school.id}; ` +
          `sid=${fullAuth.sessionId}`,
      },
    });

    const homeworkHtml = await homeworkResponse.text();
    const parsedHtml = parse(homeworkHtml);
    const homeworkTable = parsedHtml.querySelectorAll("#aktuellTable tbody tr");

    const fetchedHomework: IHomeworkEntry[] = [];

    for (const homeworkRow of homeworkTable) {
      const subject = homeworkRow.querySelector(
        "td:nth-child(1) > h3 > a > .name"
      )?.innerText;

      if (!subject) continue;

      const teacher = homeworkRow
        .querySelector("td:nth-child(1) > .teacher button")
        ?.getAttribute("title");

      if (!teacher) continue;

      const content = homeworkRow.querySelector(
        "td:nth-child(2) > .homework > .realHomework"
      )?.innerText;

      if (!content) continue;

      fetchedHomework.push({ teacher, subject, content });
    }

    return fetchedHomework;
  }
}
