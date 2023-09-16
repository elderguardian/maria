import { IRepPlanFetchOptions } from "./IRepPlanFetchOptions";
import { IRepPlanEntry } from "./IRepPlanEntry";
import { IFullAuth } from "../Authenticator/IFullAuth";

export interface IRepPlanFetcher {
  fetch(
    fullAuth: IFullAuth,
    fetchOptions: IRepPlanFetchOptions
  ): Promise<IRepPlanEntry[]>;
}
