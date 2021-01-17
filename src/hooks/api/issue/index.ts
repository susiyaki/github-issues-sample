import {useQuery, UseQueryResult} from 'react-query';
import {githubIssueApiRequest} from '@hooks/api/issue/client';
import {
  GetIssuesQueryParams,
  GetIssueQueryParams,
} from '@hooks/api/issue/endpoint';
import {ApiResponse} from '@types';

type UseIssueApi = {
  getIssues: (args: {
    queryParams: GetIssuesQueryParams;
  }) => UseQueryResult<ApiResponse.Github.Issue[], Error>;

  getIssue: (args: {
    queryParams: GetIssueQueryParams;
  }) => UseQueryResult<ApiResponse.Github.Issue, Error>;
};

export const useIssueApi = (): UseIssueApi => {
  return {
    getIssues: ({queryParams}) =>
      useQuery<ApiResponse.Github.Issue[], Error>({
        queryKey: [
          'issues',
          queryParams.owner,
          queryParams.owner,
          queryParams.offset,
          queryParams.limit,
        ],
        queryFn: () => githubIssueApiRequest.getIssues({queryParams}),
        staleTime: 20000, // TODO
        keepPreviousData: true,
      }),

    getIssue: ({queryParams}) =>
      useQuery<ApiResponse.Github.Issue, Error>({
        queryKey: [
          'issue',
          queryParams.owner,
          queryParams.repo,
          queryParams.issueNumStr,
        ],
        queryFn: () => githubIssueApiRequest.getIssue({queryParams}),
      }),
  };
};
