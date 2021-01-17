import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useGithubIssuesApi, useGithubSearchApi} from '@hooks';
import {route} from '@config/route';

type Props = Record<string, unknown>;

const PER_PAGE = 10;
// TODO
const owner = 'facebook';
const repo = 'react';

export const Issues: React.FC<Props> = () => {
  const {getIssues} = useGithubIssuesApi();
  const {searchIssues} = useGithubSearchApi();
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<{state: 'open' | 'closed'}>({
    state: 'open',
  });

  const {data: openIssues} = searchIssues({
    queryParams: {
      repo: `${owner}/${repo}`,
      state: 'open',
    },
    options: {refetchOnMount: false},
  });
  const {data: closedIssues} = searchIssues({
    queryParams: {
      repo: `${owner}/${repo}`,
      state: 'closed',
    },
    options: {refetchOnMount: false},
  });

  const {data: issues, status} = getIssues({
    queryParams: {
      owner,
      repo,
      offset: page * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  const listData = useMemo(() => {
    return issues || [];
  }, [issues, filter]);

  if (status === 'loading') {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (!issues) {
    return (
      <div>
        <p>faild to fetch data</p>
      </div>
    );
  }

  return (
    <div>
      <p>open: {openIssues ? openIssues.total_count : '?'}</p>
      <p>closed: {closedIssues ? closedIssues.total_count : '?'}</p>
      <div>
        {listData.map((d) => (
          <Link key={d.id} to={route.showIssue(d.number)}>
            <p>{d.id}</p>
            <p>{d.title}</p>
            <div style={{border: '1px solid #000', width: '100%'}} />
          </Link>
        ))}
        <div style={{display: 'flex'}}>
          <p onClick={() => console.log('prev')}>prev</p>
          <p onClick={() => console.log('next')}>next</p>
        </div>
      </div>
    </div>
  );
};
