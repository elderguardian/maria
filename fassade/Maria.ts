import { IMaria } from "./IMaria";
import { IRepPlanFetchOptions } from "../core/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "../core/RepPlan/IRepPlanEntry";
import { IMariaOptions } from "./IMariaOptions";
import { ISessionHandler } from "../core/Authenticator/SessionHandler/ISessionHandler";
import { SessionHandler } from "../core/Authenticator/SessionHandler/SessionHandler";
import { IRepPlanFetcher } from "../core/RepPlan/IRepPlanFetcher";
import { RepPlanFetcher } from "../core/RepPlan/RepPlanFetcher";

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
