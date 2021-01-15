import axios from 'axios';
import {githubIssueEndpoint, GithubIssueEndpoint} from './endpoint';
import {Github} from '../../../@types/github';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

export const githubIssueApiRequest = {
  getIssues: ({
    queryParams,
  }: {
    queryParams: GithubIssueEndpoint.GetIssues;
  }): Promise<Github.Issue[]> =>
    apiClient
      .get<Github.Issue[]>(githubIssueEndpoint.getIssues(queryParams))
      .then((res) => res.data),

  getIssue: ({
    queryParams,
  }: {
    queryParams: GithubIssueEndpoint.GetIssue;
  }): Promise<Github.Issue> =>
    apiClient
      .get<Github.Issue>(githubIssueEndpoint.getIssue(queryParams))
      .then((res) => res.data),
};
