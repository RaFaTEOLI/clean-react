import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor(private readonly url: string, private readonly httpGetClient: HttpGetClient) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async show(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        break;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
