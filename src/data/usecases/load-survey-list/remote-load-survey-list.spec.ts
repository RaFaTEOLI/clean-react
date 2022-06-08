import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import faker from '@faker-js/faker';

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const httpGetHttpClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyList(url, httpGetHttpClientSpy);
    await sut.loadAll();
    expect(httpGetHttpClientSpy.url).toBe(url);
  });
});
