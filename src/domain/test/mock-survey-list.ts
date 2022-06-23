import { SurveyModel } from '../models';
import { LoadSurveyList } from '@/domain/usecases';
import faker from '@faker-js/faker';

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url()
    },
    {
      answer: faker.random.words(5)
    }
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
});

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async all(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}

export const mockSurveyListModel = (): SurveyModel[] => [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];
