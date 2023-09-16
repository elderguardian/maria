import { IRepPlanFetchOptions } from "./foundation/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "./foundation/RepPlan/IRepPlanEntry";

export interface IMaria {
  fetchRepPlan(options: IRepPlanFetchOptions): Promise<IRepPlanEntry[]>;
}
