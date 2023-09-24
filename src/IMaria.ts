import { IRepPlanFetchOptions } from "./foundation/RepPlan/IRepPlanFetchOptions";
import { IRepPlanEntry } from "./foundation/RepPlan/IRepPlanEntry";
import { IHomeworkEntry } from "./foundation/Homework/IHomeworkEntry";

export interface IMaria {
  fetchRepPlan(options: IRepPlanFetchOptions): Promise<IRepPlanEntry[]>;
  fetchHomework(options: IRepPlanFetchOptions): Promise<IHomeworkEntry[]>;
}
