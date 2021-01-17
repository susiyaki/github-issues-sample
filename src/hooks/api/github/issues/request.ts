import {ApiResponse} from '@types';
import {
  GetIssueQueryParams,
  GetIssuesQueryParams,
  githubIssueEndpoint,
} from './endpoint';
import {apiClient} from '../apiClient';

export const githubIssueApiRequest = {
  getIssues: ({
    queryParams,
  }: {
    queryParams: GetIssuesQueryParams;
  }): Promise<ApiResponse.Github.Issue[]> =>
    apiClient
      .get<ApiResponse.Github.Issue[]>(
        githubIssueEndpoint.getIssues(queryParams),
      )
      .then((res) => res.data),

  getIssue: ({
    queryParams,
  }: {
    queryParams: GetIssueQueryParams;
  }): Promise<ApiResponse.Github.Issue> =>
    apiClient
      .get<ApiResponse.Github.Issue>(githubIssueEndpoint.getIssue(queryParams))
      .then((res) => res.data),
};
