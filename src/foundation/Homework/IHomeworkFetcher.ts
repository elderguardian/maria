import { IHomeworkFetchOptions } from "./IHomeworkFetchOptions";
import { IHomeworkEntry } from "./IHomeworkEntry";
import { IFullAuth } from "../../core/Authenticator/IFullAuth";

export interface IHomeworkFetcher {
  fetch(
    fullAuth: IFullAuth,
    fetchOptions: IHomeworkFetchOptions
  ): Promise<IHomeworkEntry[]>;
}
