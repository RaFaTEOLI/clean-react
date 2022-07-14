export interface LoadSurveyResult {
  show(): Promise<LoadSurveyResult.Model>;
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string;
    date: Date;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswers: boolean;
    }>;
  };
}
