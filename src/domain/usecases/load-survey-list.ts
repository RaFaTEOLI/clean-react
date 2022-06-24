export interface LoadSurveyList {
  all(): Promise<LoadSurveyList.Model[]>;
}

export namespace LoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: Date;
    didAnswer: boolean;
  };
}
