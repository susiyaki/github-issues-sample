import axios from 'axios';
import {githubRepositoryEndpoint} from './endpoint';
import {Github} from '../../../@types/github';

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
  }): Promise<Github.TemplateRepository> =>
    apiClient
      .get<Github.TemplateRepository>(
        githubRepositoryEndpoint.getRepository(queryParams),
      )
      .then((res) => res.data),
};
