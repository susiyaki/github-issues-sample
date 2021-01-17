import {useQuery, UseQueryResult, QueryObserverOptions} from 'react-query';
import {ApiResponse} from '@types';
import {githubSearchApiRequest} from './request';
import {SearchIssuesQueryParams} from './endpoint';

type UseGithubSearchApi = {
  searchIssues: (args: {
    queryParams: SearchIssuesQueryParams;
    options?: QueryObserverOptions<ApiResponse.Github.SearchResult, Error>;
  }) => UseQueryResult<ApiResponse.Github.SearchResult, Error>;
};

export const useGithubSearchApi = (): UseGithubSearchApi => {
  return {
    searchIssues: ({queryParams, options}) =>
      useQuery({
        queryKey: ['search', queryParams.repo, queryParams.state],
        queryFn: () => githubSearchApiRequest.searchIssues({queryParams}),
        ...options,
      }),
  };
};
