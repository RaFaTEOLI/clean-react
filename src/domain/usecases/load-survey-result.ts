import { SurveyResultModel } from '@/domain/models';
export interface LoadSurveyResult {
  show(): Promise<LoadSurveyResult.Model>;
}

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel;
}
