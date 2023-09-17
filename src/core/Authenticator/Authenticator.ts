import { IAuthenticator } from "./IAuthenticator";
import { IAuthOptions } from "./IAuthOptions";

export class Authenticator implements IAuthenticator {
  private async getFirstAuthResponse(
    authOptions: IAuthOptions
  ): Promise<Response> {
    const authLinkGetUrl = `https://login.schulportal.hessen.de/?i=${authOptions.school.id}&`;

    return await fetch(authLinkGetUrl, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      redirect: "manual",
      body: encodeURI(
        `user2=${authOptions.username}` +
          `&user=${authOptions.school.id}.${authOptions.username}` +
          `&password=${authOptions.password}`
      ),
      method: "POST",
    });
  }

  private async getSecondAuthResponse(
    firstAuthResponse: Response
  ): Promise<Response> {
    const rawCookieHeader = firstAuthResponse.headers.get("set-cookie");

    if (!rawCookieHeader) {
      throw new Error("Missing Cookie Header.");
    }

    const authLink = firstAuthResponse.headers.get("location");

    if (!authLink) {
      throw new Error("Second auth link is missing.");
    }

    return await fetch(authLink, {
      redirect: "manual",
      method: "GET",
      headers: {
        cookie: rawCookieHeader,
      },
    });
  }

  private async getThirdAuthResponse(
    firstAuthResponse: Response,
    secondAuthResponse: Response
  ): Promise<Response> {
    if (!secondAuthResponse.headers.has("location")) {
      throw new Error("Third auth url is missing.");
    }

    const rawCookieHeader = firstAuthResponse.headers.get("set-cookie");

    if (!rawCookieHeader) {
      throw new Error("Missing Cookie Header.");
    }

    const nextUrl = secondAuthResponse.headers.get("location");

    if (!nextUrl) {
      throw new Error("Third auth url is missing.");
    }

    return fetch(nextUrl, {
      method: "GET",
      redirect: "manual",
      headers: {
        cookie: rawCookieHeader,
      },
    });
  }

  async getSessionId(authOptions: IAuthOptions): Promise<string> {
    const firstAuth = await this.getFirstAuthResponse(authOptions);
    const secondAuth = await this.getSecondAuthResponse(firstAuth);
    const thirdAuth = await this.getThirdAuthResponse(firstAuth, secondAuth);

    const rawCookieHeader = thirdAuth.headers.get("set-cookie");

    if (!rawCookieHeader) {
      throw new Error("Failed to get cookie header.");
    }

    return rawCookieHeader
      .split("; ")
      .filter((part) => part.includes("sid"))[0]
      .split(", ")[1]
      .split("=")[1];
  }
}
