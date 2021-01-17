import MockAdapter from 'axios-mock-adapter';
import {apiClient} from '../apiClient';
import {githubSearchApiRequest} from './request';
import {githubSearchEndpoint} from './endpoint';

const apiMock = new MockAdapter(apiClient);
const owner = 'owner';
const repo = 'repo';

describe('【API】githubSearchApiRequest', () => {
  afterEach(() => {
    apiMock.reset();
  });
  afterAll(() => {
    apiMock.restore();
  });

  describe('searchIssues', () => {
    test('リクエストを送ると指定したレスポンスが返る', async () => {
      const mockResponse = 'searchIssues mock response';
      apiMock
        .onGet(
          githubSearchEndpoint.searchIssues({
            repo: `${owner}/${repo}`,
            state: 'open',
          }),
        )
        .reply(200, mockResponse);

      const response = await githubSearchApiRequest.searchIssues({
        queryParams: {repo: `${owner}/${repo}`, state: 'open'},
      });

      expect(response).toStrictEqual(mockResponse);
    });
  });
});
