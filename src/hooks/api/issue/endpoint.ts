export const githubIssueEndpoint = {
  getIssues: ({offset, limit}: {offset: number; limit: number}): string =>
    `repos/facebook/react/issues?page=${offset}&per_page=${limit}`,

  getIssue: ({issueNumStr}: {issueNumStr: string}): string =>
    `repos/facebook/react/issues/${issueNumStr}`,
};
