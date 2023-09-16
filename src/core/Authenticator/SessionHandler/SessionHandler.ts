import { ISessionHandler } from "./ISessionHandler";
import { IAuthOptions } from "../IAuthOptions";
import { Authenticator } from "../Authenticator";

export class SessionHandler implements ISessionHandler {
  private readonly MAX_SESSION_AGE = 6000000;

  private readonly lastSessionIdCreation: number;
  private sessionId: string | null;

  constructor() {
    this.lastSessionIdCreation = this.MAX_SESSION_AGE + 1;
    this.sessionId = null;
  }

  async getSessionId(authOptions: IAuthOptions): Promise<string> {
    const sessionNotExpired = Date.now() - this.lastSessionIdCreation > 6000000;

    if (sessionNotExpired && this.sessionId) {
      return this.sessionId;
    }

    const authenticator = new Authenticator();
    const newSessionId = await authenticator.getSessionId(authOptions);

    this.sessionId = newSessionId;
    return newSessionId;
  }
}
