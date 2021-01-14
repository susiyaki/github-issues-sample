import axios from 'axios';
import {useQuery} from 'react-query';
import {Issue} from '../../@types/github';

export const useIssueApi = () => {
  const apiClient = axios.create({
    baseURL: 'https://api.github.com',
  });

  return {
    getIssues: ({offset, limit}: {offset: number; limit: number}) =>
      useQuery<Issue[], Error>({
        queryKey: ['issues', offset, limit],
        queryFn: () =>
          apiClient
            .get<Issue[]>(
              `repos/facebook/react/issues?page=${offset}&per_page=${limit}`,
            )
            .then((res) => res.data),
        staleTime: 20000, // TODO
      }),

    showIssue: ({issueNumStr}: {issueNumStr: string}) =>
      useQuery<Issue, Error>({
        queryKey: ['issue', issueNumStr],
        queryFn: () =>
          apiClient
            .get<Issue>(`repos/facebook/react/issues/${issueNumStr}`)
            .then((res) => res.data),
      }),
  };
};
