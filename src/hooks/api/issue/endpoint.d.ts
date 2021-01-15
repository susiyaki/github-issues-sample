export namespace GithubIssueEndpoint {
  export type GetIssues = {
    owner: string;
    repo: string;
    offset: number;
    limit: number;
  };
  export type GetIssue = {
    owner: string;
    repo: string;
    issueNumStr: string;
  };
}
