import {GithubRepositoryEndpoint} from './endpoint.d';

export type {GithubRepositoryEndpoint};

export const githubRepositoryEndpoint = {
  getRepository: ({
    owner,
    repo,
  }: GithubRepositoryEndpoint.GetRepository): string =>
    `repos/${owner}/${repo}`,
};
