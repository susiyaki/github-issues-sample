import {useQuery, UseQueryResult} from 'react-query';
import {githubIssueApiRequest} from './client';
import {GithubIssueEndpoint} from './endpoint';
import {Github} from '../../../@types/github';

type UseIssueApi = {
  getIssues: (args: {
    queryParams: GithubIssueEndpoint.GetIssues;
  }) => UseQueryResult<Github.Issue[], Error>;

  getIssue: (args: {
    queryParams: GithubIssueEndpoint.GetIssue;
  }) => UseQueryResult<Github.Issue, Error>;
};

export const useIssueApi = (): UseIssueApi => {
  return {
    getIssues: (args: {
      queryParams: {
        owner: string;
        repo: string;
        offset: number;
        limit: number;
      };
    }) =>
      useQuery<Github.Issue[], Error>({
        queryKey: ['issues', args.queryParams.offset, args.queryParams.limit],
        queryFn: () => githubIssueApiRequest.getIssues(args),
        staleTime: 20000, // TODO
        keepPreviousData: true,
      }),

    getIssue: (args: {
      queryParams: {
        owner: string;
        repo: string;
        issueNumStr: string;
      };
    }) =>
      useQuery<Github.Issue, Error>({
        queryKey: ['issue', args.queryParams.issueNumStr],
        queryFn: () => githubIssueApiRequest.getIssue(args),
      }),
  };
};
