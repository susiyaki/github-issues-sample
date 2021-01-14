import {useQuery} from 'react-query';
import {githubIssueApiRequest} from './client';
import {Issue} from '../../../@types/github';

export const useIssueApi = () => {
  return {
    getIssues: (args: {offset: number; limit: number}) =>
      useQuery<Issue[], Error>({
        queryKey: ['issues', args.offset, args.limit],
        queryFn: () => githubIssueApiRequest.getIssues(args),
        staleTime: 20000, // TODO
      }),

    showIssue: (args: {issueNumStr: string}) =>
      useQuery<Issue, Error>({
        queryKey: ['issue', args.issueNumStr],
        queryFn: () => githubIssueApiRequest.getIssue(args),
      }),
  };
};
