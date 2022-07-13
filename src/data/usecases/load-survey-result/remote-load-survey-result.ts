import { HttpGetClient } from '@/data/protocols/http';

export class RemoteLoadSurveyResult {
  constructor(private readonly url: string, private readonly httpGetClient: HttpGetClient) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async show(): Promise<void> {
    await this.httpGetClient.get({ url: this.url });
  }
}
