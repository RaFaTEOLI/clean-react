import { LoadSurveyList } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async all(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}
