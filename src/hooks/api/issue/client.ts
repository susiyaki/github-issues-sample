import axios from 'axios';
import {githubIssueEndpoint} from './endpoint';
import {Issue} from '../../../@types/github';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

export const githubIssueApiRequest = {
  getIssues: ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<Issue[]> =>
    apiClient
      .get<Issue[]>(githubIssueEndpoint.getIssues({offset, limit}))
      .then((res) => res.data),

  getIssue: ({issueNumStr}: {issueNumStr: string}): Promise<Issue> =>
    apiClient
      .get<Issue>(githubIssueEndpoint.getIssue({issueNumStr}))
      .then((res) => res.data),
};
