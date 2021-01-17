import MockAdapter from 'axios-mock-adapter';
import {apiClient} from '../apiClient';
import {githubIssueApiRequest} from './request';
import {githubIssueEndpoint} from './endpoint';

const apiMock = new MockAdapter(apiClient);
const owner = 'owner';
const repo = 'repo';

describe('【API】githubIssueApiRequest', () => {
  afterEach(() => {
    apiMock.reset();
  });
  afterAll(() => {
    apiMock.restore();
  });

  describe('getIssues', () => {
    test('リクエストを送ると指定したレスポンスが返る', async () => {
      const page = 1;
      const perPage = 2;

      const mockResponse = 'getIssues mock response';
      apiMock
        .onGet(githubIssueEndpoint.getIssues({owner, repo, page, perPage}))
        .reply(200, mockResponse);

      const response = await githubIssueApiRequest.getIssues({
        queryParams: {
          owner,
          repo,
          page,
          perPage,
        },
      });

      expect(response).toStrictEqual(mockResponse);
    });
  });

  describe('getIssue', () => {
    test('リクエストを送ると指定したレスポンスが返る', async () => {
      const number = 3;

      const mockResponse = 'getIssue mock response';
      apiMock
        .onGet(
          githubIssueEndpoint.getIssue({
            owner,
            repo,
            issueNumStr: number.toString(),
          }),
        )
        .reply(200, mockResponse);

      const response = await githubIssueApiRequest.getIssue({
        queryParams: {
          owner,
          repo,
          issueNumStr: number.toString(),
        },
      });

      expect(response).toStrictEqual(mockResponse);
    });
  });
});
