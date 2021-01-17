import {useQuery, UseQueryResult} from 'react-query';
import {githubRepositoryApiRequest} from '@hooks/api/repository/client';
import {GetRepositoryQueryParams} from '@hooks/api/repository/endpoint';
import {ApiResponse} from '@types';

type UseRepositoryApi = {
  getRepository: (args: {
    queryParams: GetRepositoryQueryParams;
  }) => UseQueryResult<ApiResponse.Github.TemplateRepository, Error>;
};

export const useRepositoryApi = (): UseRepositoryApi => {
  return {
    getRepository: (args: {queryParams: {owner: string; repo: string}}) =>
      useQuery<ApiResponse.Github.TemplateRepository, Error>({
        queryKey: ['issue', args.queryParams.owner, args.queryParams.repo],
        queryFn: () => githubRepositoryApiRequest.getRepository(args),
      }),
  };
};
