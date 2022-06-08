import { SurveyModel } from '../models';
import faker from '@faker-js/faker';

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.internet.avatar()
      },
      {
        answer: faker.random.words(5)
      }
    ],
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent()
  }
];
