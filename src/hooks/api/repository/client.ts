import axios from 'axios';
import {githubRepositoryEndpoint} from '@hooks/api/repository/endpoint';
import {ApiResponse} from '@types';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

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
