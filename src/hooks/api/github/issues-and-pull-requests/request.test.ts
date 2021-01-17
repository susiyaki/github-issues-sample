import MockAdapter from 'axios-mock-adapter';
import {apiClient} from '../apiClient';
import {githubIssuesAndPullRequestsApiRequest} from './request';
import {githubIssuesAndPullRequestsEndpoint} from './endpoint';

const githubRepositoryApiMock = new MockAdapter(apiClient);
const owner = 'owner';
const repo = 'repo';

//TODO
describe.skip('【API】githubRepositoryApiRequest', () => {
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
        .onGet(githubIssuesAndPullRequestsEndpoint.search({owner, repo}))
        .reply(200, mockData);

      const response = await githubIssuesAndPullRequestsApiRequest.search({
        queryParams: {owner, repo},
      });

      expect(response).toStrictEqual(mockData);
    });
  });
});
