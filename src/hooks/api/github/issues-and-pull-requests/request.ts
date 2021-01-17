import {ApiResponse} from '@types';
import {
  githubIssuesAndPullRequestsEndpoint,
  SearchIssuesAndPullRequestsQueryParams,
} from './endpoint';
import {apiClient} from '../apiClient';

export const githubIssuesAndPullRequestsApiRequest = {
  search: ({
    queryParams,
  }: {
    queryParams: SearchIssuesAndPullRequestsQueryParams;
  }): Promise<ApiResponse.Github.SearchResult> =>
    apiClient
      .get<ApiResponse.Github.SearchResult>(
        githubIssuesAndPullRequestsEndpoint.search(queryParams),
      )
      .then((res) => res.data),
};
