import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {route} from '../../config/route';
import {useIssueApi} from '../../hooks/api/issue';
import {useRepositoryApi} from '../../hooks/api/repository';

type Props = Record<string, unknown>;

const PER_PAGE = 10;
// TODO
const owner = 'facebook';
const repo = 'react';

export const Issues: React.FC<Props> = () => {
  const {getRepository} = useRepositoryApi();
  const {getIssues} = useIssueApi();
  const [page, setPage] = useState<number>(0);

  const {data: repository} = getRepository({
    queryParams: {
      owner,
      repo,
    },
  });

  const {data: issues, status} = getIssues({
    queryParams: {
      owner,
      repo,
      offset: page * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  if (status === 'loading') {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div>
      {issues?.map((issue) => (
        <Link key={issue.id} to={route.showIssue(issue.number)}>
          <p>{issue.id}</p>
          <p>{issue.title}</p>
          <div style={{border: '1px solid #000', width: '100%'}} />
        </Link>
      ))}
      <div style={{display: 'flex'}}>
        <p onClick={() => setPage((v) => v - 1)}>prev</p>
        <p onClick={() => setPage((v) => v + 1)}>next</p>
      </div>
    </div>
  );
};
