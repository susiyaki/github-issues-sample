import {QueryObserverOptions, useQuery, UseQueryResult} from 'react-query';
import {ApiResponse} from '@types';
import {githubIssueApiRequest} from './request';
import {GetIssuesQueryParams, GetIssueQueryParams} from './endpoint';

type UseIssuesApi = {
  getIssues: (args: {
    queryParams: GetIssuesQueryParams;
    options?: QueryObserverOptions<ApiResponse.Github.Issue[], Error>;
  }) => UseQueryResult<ApiResponse.Github.Issue[], Error>;

  getIssue: (args: {
    queryParams: GetIssueQueryParams;
    options?: QueryObserverOptions<ApiResponse.Github.Issue, Error>;
  }) => UseQueryResult<ApiResponse.Github.Issue, Error>;
};

export const useGithubIssuesApi = (): UseIssuesApi => {
  return {
    getIssues: ({queryParams, options}) =>
      useQuery({
        queryKey: [
          'issues',
          queryParams.owner,
          queryParams.owner,
          queryParams.offset,
          queryParams.limit,
        ],
        queryFn: () => githubIssueApiRequest.getIssues({queryParams}),
        ...options,
      }),

    getIssue: ({queryParams, options}) =>
      useQuery({
        queryKey: [
          'issue',
          queryParams.owner,
          queryParams.repo,
          queryParams.issueNumStr,
        ],
        queryFn: () => githubIssueApiRequest.getIssue({queryParams}),
        ...options,
      }),
  };
};
