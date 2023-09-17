import { IMaria } from "./IMaria";
import { ISessionHandler } from "./core/Authenticator/SessionHandler/ISessionHandler";
import { IRepPlanFetcher } from "./foundation/RepPlan/IRepPlanFetcher";
import { SessionHandler } from "./core/Authenticator/SessionHandler/SessionHandler";
import { IRepPlanFetchOptions } from "./foundation/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "./foundation/RepPlan/IRepPlanEntry";
import { RepPlanFetcher } from "./foundation/RepPlan/RepPlanFetcher";
import { IMariaOptions } from "./IMariaOptions";
import { SchoolFetcher } from "./core/SchoolFetcher/SchoolFetcher";

export class Maria implements IMaria {
  private sessionHandler: ISessionHandler;
  private repPlanFetcher: IRepPlanFetcher | null;
  private options: IMariaOptions;

  constructor(options: IMariaOptions) {
    this.options = options;
    this.sessionHandler = new SessionHandler();
    this.repPlanFetcher = null;
  }

  async fetchRepPlan(options: IRepPlanFetchOptions): Promise<IRepPlanEntry[]> {
    const school = await new SchoolFetcher().fetchSchoolOrNull(
      this.options.auth.school
    );

    if (!school) {
      throw new Error("Could not find a school with that name.");
    }

    const authOptions = {
      username: this.options.auth.username,
      password: this.options.auth.password,
      school,
    };

    const sessionId = await this.sessionHandler.getSessionId(authOptions);

    if (!this.repPlanFetcher) {
      this.repPlanFetcher = new RepPlanFetcher();
    }

    return this.repPlanFetcher.fetch({ authOptions, sessionId }, options);
  }
}
