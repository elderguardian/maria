import { IRepPlanFetchOptions } from "../core/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "../core/RepPlan/IRepPlanEntry";

export interface IMaria {
  fetchRepPlan(options: IRepPlanFetchOptions): Promise<IRepPlanEntry[]>;
}
