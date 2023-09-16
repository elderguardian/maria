export interface ITeacher {
  name: string;
  abbreviation?: string;
}

export interface IRepPlanEntry {
  type: string;
  date: Date;
  teachers: {
    regular: ITeacher;
    rep: ITeacher;
  };
  lesson: number;
  classes: string[];
  subjects: string[];
  rooms: string[];
  notices: string[];
  learnGroup: string;
  talkedOutEntry: string;
}
