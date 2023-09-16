import { IMaria } from "./IMaria";
import { ISessionHandler } from "./core/Authenticator/SessionHandler/ISessionHandler";
import { IRepPlanFetcher } from "./foundation/RepPlan/IRepPlanFetcher";
import { SessionHandler } from "./core/Authenticator/SessionHandler/SessionHandler";
import { IRepPlanFetchOptions } from "./foundation/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "./foundation/RepPlan/IRepPlanEntry";
import { RepPlanFetcher } from "./foundation/RepPlan/RepPlanFetcher";
import { IMariaOptions } from "./IMariaOptions";

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
    const sessionId = await this.sessionHandler.getSessionId(
      this.options.authOptions
    );

    if (!this.repPlanFetcher) {
      this.repPlanFetcher = new RepPlanFetcher();
    }

    return this.repPlanFetcher.fetch(
      { authOptions: this.options.authOptions, sessionId },
      options
    );
  }
}
