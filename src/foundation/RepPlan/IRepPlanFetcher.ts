import { IRepPlanFetchOptions } from "./IRepPlanFetchOptions";
import { IRepPlanEntry } from "./IRepPlanEntry";
import { IFullAuth } from "../../core/Authenticator/IFullAuth";

export interface IRepPlanFetcher {
  fetch(
    fullAuth: IFullAuth,
    fetchOptions: IRepPlanFetchOptions
  ): Promise<IRepPlanEntry[]>;
}
