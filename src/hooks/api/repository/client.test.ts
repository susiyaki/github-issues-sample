import MockAdapter from 'axios-mock-adapter';
import {apiClient, githubRepositoryApiRequest} from './client';
import {githubRepositoryEndpoint} from './endpoint';

const githubRepositoryApiMock = new MockAdapter(apiClient);
const owner = 'owner';
const repo = 'repo';

describe('【API】githubRepositoryApiRequest', () => {
  afterEach(() => {
    githubRepositoryApiMock.reset();
  });
  afterAll(() => {
    githubRepositoryApiMock.restore();
  });

  describe('getRepository', () => {
    const mockData = {id: 0, name: 'mock repo', owner: 'test'};

    test('サーバのレスポンスが取得できる', async () => {
      githubRepositoryApiMock
        .onGet(githubRepositoryEndpoint.getRepository({owner, repo}))
        .reply(200, mockData);

      const response = await githubRepositoryApiRequest.getRepository({
        queryParams: {owner, repo},
      });

      expect(response).toStrictEqual(mockData);
    });
  });
});
