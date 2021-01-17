import axios from 'axios';
import {
  GetIssueQueryParams,
  GetIssuesQueryParams,
  githubIssueEndpoint,
} from '@hooks/api/issue/endpoint';
import {ApiResponse} from '@types';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

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
