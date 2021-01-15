import {useQuery, UseQueryResult} from 'react-query';
import {githubRepositoryApiRequest} from './client';
import {Github} from '../../../@types/github';

type UseRepositoryApi = {
  getRepository: (args: {
    queryParams: {
      owner: string;
      repo: string;
    };
  }) => UseQueryResult<Github.TemplateRepository, Error>;
};

export const useRepositoryApi = (): UseRepositoryApi => {
  return {
    getRepository: (args: {queryParams: {owner: string; repo: string}}) =>
      useQuery<Github.TemplateRepository, Error>({
        queryKey: ['issue', args.queryParams.owner, args.queryParams.repo],
        queryFn: () => githubRepositoryApiRequest.getRepository(args),
      }),
  };
};
