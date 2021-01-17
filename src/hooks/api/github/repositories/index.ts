import {useQuery, UseQueryResult} from 'react-query';
import {ApiResponse} from '@types';
import {githubRepositoryApiRequest} from './request';
import {GetRepositoryQueryParams} from './endpoint';

type UseRepositoriesApi = {
  getRepository: (args: {
    queryParams: GetRepositoryQueryParams;
  }) => UseQueryResult<ApiResponse.Github.TemplateRepository, Error>;
};

export const useRepositoriesApi = (): UseRepositoriesApi => {
  return {
    getRepository: (args: {queryParams: {owner: string; repo: string}}) =>
      useQuery<ApiResponse.Github.TemplateRepository, Error>({
        queryKey: ['issue', args.queryParams.owner, args.queryParams.repo],
        queryFn: () => githubRepositoryApiRequest.getRepository(args),
      }),
  };
};
