import {GithubIssueEndpoint} from './endpoint.d';

export type {GithubIssueEndpoint};

export const githubIssueEndpoint = {
  getIssues: ({
    owner: orgs,
    repo,
    offset,
    limit,
  }: GithubIssueEndpoint.GetIssues): string =>
    `repos/${orgs}/${repo}/issues?page=${offset}&per_page=${limit}`,

  getIssue: ({
    owner: orgs,
    repo,
    issueNumStr,
  }: GithubIssueEndpoint.GetIssue): string =>
    `repos/${orgs}/${repo}/issues/${issueNumStr}`,
};
