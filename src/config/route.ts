export const route = {
  issues: '/issues',
  showIssue: (issueNumStr: string | number): string => `/issues/${issueNumStr}`,
};
