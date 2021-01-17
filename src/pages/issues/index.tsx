import React, {useCallback, useMemo, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';
import {useGithubIssuesApi, useGithubSearchApi} from '@hooks';
import {route} from '@config/route';
import {ApiResponse} from '@types';

type Props = Record<string, unknown>;

const PER_PAGE = 10;
// TODO
const owner = 'facebook';
const repo = 'react';

export const Issues: React.FC<Props> = () => {
  const {getIssues} = useGithubIssuesApi();
  const {searchIssues} = useGithubSearchApi();
  const [issues, setIssuus] = useState<ApiResponse.Github.Issue[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<{state: 'all' | 'open' | 'closed'}>({
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
  const {status} = getIssues({
    queryParams: {
      owner,
      repo,
      page,
      perPage: PER_PAGE,
      state: filter.state,
    },
    options: {
      onSuccess: (res) => setIssuus(res),
    },
  });

  const totalPageCount = useMemo(() => {
    if (!openIssues || !closedIssues) return 0;

    if (filter.state === 'open') {
      return openIssues.total_count / PER_PAGE;
    } else if (filter.state === 'closed') {
      return closedIssues.total_count / PER_PAGE;
    } else {
      return openIssues.total_count + closedIssues.total_count / PER_PAGE;
    }
  }, [openIssues, closedIssues, filter.state]);

  const handleChangeFilter = useCallback(({state}) => {
    setFilter((prev) => ({...prev, state}));
  }, []);

  const handlePageChange = useCallback(
    ({selected}) => {
      setPage(selected + 1);
    },
    [page],
  );

  if (!issues && status === 'loading') {
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
      <p onClick={() => handleChangeFilter({state: 'open'})}>
        open: {openIssues ? openIssues.total_count : '?'}
      </p>
      <p onClick={() => handleChangeFilter({state: 'closed'})}>
        closed: {closedIssues ? closedIssues.total_count : '?'}
      </p>
      <p onClick={() => handleChangeFilter({state: 'all'})}>
        reset state filter
      </p>
      {issues.map((issue) => (
        <Link key={issue.id} to={route.showIssue(issue.number)}>
          <p>{issue.id}</p>
          <p>{issue.title}</p>
          <p>{issue.state}</p>
          <div style={{border: '1px solid #000', width: '100%'}} />
        </Link>
      ))}
      <ReactPaginate
        pageCount={totalPageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
