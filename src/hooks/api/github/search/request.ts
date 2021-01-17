import {ApiResponse} from '@types';
import {githubSearchEndpoint, SearchIssuesQueryParams} from './endpoint';
import {apiClient} from '../apiClient';

export const githubSearchApiRequest = {
  // NOTE: https://docs.github.com/en/rest/reference/search#search-issues-and-pull-requests
  searchIssues: ({
    queryParams,
  }: {
    queryParams: SearchIssuesQueryParams;
  }): Promise<ApiResponse.Github.SearchResult> =>
    apiClient
      .get<ApiResponse.Github.SearchResult>(
        githubSearchEndpoint.searchIssues(queryParams),
      )
      .then((res) => res.data),
};
