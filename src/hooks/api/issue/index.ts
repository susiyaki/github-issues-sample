import {useQuery, UseQueryResult} from 'react-query';
import {githubIssueApiRequest} from './client';
import {Issue} from '../../../@types/github';

type UseIssueApi = {
  getIssues: (args: {
    offset: number;
    limit: number;
  }) => UseQueryResult<Issue[], Error>;

  getIssue: (args: {issueNumStr: string}) => UseQueryResult<Issue, Error>;
};

export const useIssueApi = (): UseIssueApi => {
  return {
    getIssues: (args: {offset: number; limit: number}) =>
      useQuery<Issue[], Error>({
        queryKey: ['issues', args.offset, args.limit],
        queryFn: () => githubIssueApiRequest.getIssues(args),
        staleTime: 20000, // TODO
      }),

    getIssue: (args: {issueNumStr: string}) =>
      useQuery<Issue, Error>({
        queryKey: ['issue', args.issueNumStr],
        queryFn: () => githubIssueApiRequest.getIssue(args),
      }),
  };
};
