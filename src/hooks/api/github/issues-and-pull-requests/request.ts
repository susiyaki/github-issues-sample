import {ApiResponse} from '@types';
import {
  githubIssuesAndPullRequestsEndpoint,
  SearchIssuesAndPullRequestsQueryParams,
} from './endpoint';
import {apiClient} from '../apiClient';

export const githubIssuesAndPullRequestsApiRequest = {
  // NOTE: https://docs.github.com/en/rest/reference/search#search-issues-and-pull-requests
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
