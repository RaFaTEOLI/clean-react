import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AxiosHttpClient implements HttpPostClient<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  }
}
