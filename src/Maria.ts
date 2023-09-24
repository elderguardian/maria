import { IMaria } from "./IMaria";
import { ISessionHandler } from "./core/Authenticator/SessionHandler/ISessionHandler";
import { SessionHandler } from "./core/Authenticator/SessionHandler/SessionHandler";
import { IRepPlanFetchOptions } from "./foundation/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "./foundation/RepPlan/IRepPlanEntry";
import { RepPlanFetcher } from "./foundation/RepPlan/RepPlanFetcher";
import { IMariaOptions } from "./IMariaOptions";
import { SchoolFetcher } from "./core/SchoolFetcher/SchoolFetcher";
import { IHomeworkEntry } from "./foundation/Homework/IHomeworkEntry";
import { HomeworkFetcher } from "./foundation/Homework/HomeworkFetcher";
import { IAuthOptions } from "./core/Authenticator/IAuthOptions";

export class Maria implements IMaria {
  private sessionHandler: ISessionHandler;
  private readonly options: IMariaOptions;

  constructor(options: IMariaOptions) {
    this.sessionHandler = new SessionHandler();
    this.options = options;
  }

  private async parseAuthOptions(
    options: IMariaOptions
  ): Promise<IAuthOptions> {
    const schoolFetcher = new SchoolFetcher();
    const school = await schoolFetcher.fetchSchoolOrNull(options.auth.school);

    if (!school) {
      throw new Error("Could not find a school with that name.");
    }

    return {
      username: options.auth.username,
      password: options.auth.password,
      school,
    };
  }

  async fetchRepPlan(options: IRepPlanFetchOptions): Promise<IRepPlanEntry[]> {
    const authOptions = await this.parseAuthOptions(this.options);
    const sessionId = await this.sessionHandler.getSessionId(authOptions);
    return new RepPlanFetcher().fetch({ authOptions, sessionId }, options);
  }

  async fetchHomework(
    options: IRepPlanFetchOptions
  ): Promise<IHomeworkEntry[]> {
    const authOptions = await this.parseAuthOptions(this.options);
    const sessionId = await this.sessionHandler.getSessionId(authOptions);
    return new HomeworkFetcher().fetch({ authOptions, sessionId }, options);
  }
}
