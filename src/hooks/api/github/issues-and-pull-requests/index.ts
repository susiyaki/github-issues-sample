import {useQuery, UseQueryResult} from 'react-query';
import {ApiResponse} from '@types';
import {githubIssuesAndPullRequestsApiRequest} from './request';
import {SearchIssuesAndPullRequestsQueryParams} from './endpoint';

type UseIssuesAndPullRequestApi = {
  search: (args: {
    queryParams: SearchIssuesAndPullRequestsQueryParams;
  }) => UseQueryResult<ApiResponse.Github.SearchResult, Error>;
};

export const useIssuesAndPullRequestApi = (): UseIssuesAndPullRequestApi => {
  return {
    search: ({queryParams}) =>
      useQuery<ApiResponse.Github.SearchResult, Error>({
        queryKey: [
          'search',
          queryParams.repo,
          queryParams.type,
          queryParams.state,
        ],
        queryFn: () =>
          githubIssuesAndPullRequestsApiRequest.search({queryParams}),
      }),
  };
};
