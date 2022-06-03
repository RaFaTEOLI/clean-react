import { SurveyModel } from '@/domain/models';

export interface LoadSurveyList {
  all(): Promise<SurveyModel[]>;
}
