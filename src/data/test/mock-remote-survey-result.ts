import { RemoteLoadSurveyResult } from '@/data/usecases';
import { faker } from '@faker-js/faker';

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.internet.avatar(),
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100)
    }
  ]
});
