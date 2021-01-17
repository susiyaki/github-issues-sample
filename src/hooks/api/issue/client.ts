import axios from 'axios';
import {
  GetIssueQueryParams,
  GetIssuesQueryParams,
  githubIssueEndpoint,
} from './endpoint';
import {GithubIssue} from '@types/github';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

export const githubIssueApiRequest = {
  getIssues: ({
    queryParams,
  }: {
    queryParams: GetIssuesQueryParams;
  }): Promise<GithubIssue[]> =>
    apiClient
      .get<GithubIssue[]>(githubIssueEndpoint.getIssues(queryParams))
      .then((res) => res.data),

  getIssue: ({
    queryParams,
  }: {
    queryParams: GetIssueQueryParams;
  }): Promise<GithubIssue> =>
    apiClient
      .get<GithubIssue>(githubIssueEndpoint.getIssue(queryParams))
      .then((res) => res.data),
};
