import {useQuery, UseQueryResult} from 'react-query';
import {githubIssueApiRequest} from '@hooks/api/issue/client';
import {
  GetIssuesQueryParams,
  GetIssueQueryParams,
} from '@hooks/api/issue/endpoint';
import {GithubIssue} from '@types/github';

type UseIssueApi = {
  getIssues: (args: {
    queryParams: GetIssuesQueryParams;
  }) => UseQueryResult<GithubIssue[], Error>;

  getIssue: (args: {
    queryParams: GetIssueQueryParams;
  }) => UseQueryResult<GithubIssue, Error>;
};

export const useIssueApi = (): UseIssueApi => {
  return {
    getIssues: ({queryParams}) =>
      useQuery<GithubIssue[], Error>({
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
      useQuery<GithubIssue, Error>({
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
