import {ApiResponse} from '@types';
import {githubRepositoryEndpoint} from './endpoint';
import {apiClient} from '../apiClient';

export const githubRepositoryApiRequest = {
  getRepository: ({
    queryParams,
  }: {
    queryParams: {
      owner: string;
      repo: string;
    };
  }): Promise<ApiResponse.Github.TemplateRepository> =>
    apiClient
      .get<ApiResponse.Github.TemplateRepository>(
        githubRepositoryEndpoint.getRepository(queryParams),
      )
      .then((res) => res.data),
};
