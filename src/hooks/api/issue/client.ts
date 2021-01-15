import axios from 'axios';
import {githubIssueEndpoint} from './endpoint';
import {Github} from '../../../@types/github';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

export const githubIssueApiRequest = {
  getIssues: ({
    queryParams,
  }: {
    queryParams: {
      owner: string;
      repo: string;
      offset: number;
      limit: number;
    };
  }): Promise<Github.Issue[]> =>
    apiClient
      .get<Github.Issue[]>(githubIssueEndpoint.getIssues(queryParams))
      .then((res) => res.data),

  getIssue: ({
    queryParams,
  }: {
    queryParams: {
      owner: string;
      repo: string;
      issueNumStr: string;
    };
  }): Promise<Github.Issue> =>
    apiClient
      .get<Github.Issue>(githubIssueEndpoint.getIssue(queryParams))
      .then((res) => res.data),
};
