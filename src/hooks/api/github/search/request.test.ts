import MockAdapter from 'axios-mock-adapter';
import {apiClient} from '../apiClient';
import {githubSearchApiRequest} from './request';
import {githubSearchEndpoint} from './endpoint';

const apiMock = new MockAdapter(apiClient);
const owner = 'owner';
const repo = 'repo';

// TODO
describe('【API】githubSearchApiRequest', () => {
  afterEach(() => {
    apiMock.reset();
  });
  afterAll(() => {
    apiMock.restore();
  });

  describe('searchIssues', () => {
    const mockData = [
      {id: 1, repo: `${owner}/${repo}`, isOpen: true, type: 'issue'},
      {id: 2, repo: `mock/data`, isOpen: true, type: 'issue'},
      {id: 3, repo: `${owner}/${repo}`, isOpen: false, type: 'pr'},
      {id: 4, repo: `${owner}/${repo}`, isOpen: false, type: 'issue'},
      {id: 4, repo: `${owner}/${repo}`, isOpen: true, type: 'pr'},
    ];

    test.skip('指定したrepositoryのissueを取得できる', () => {});
  });
});
