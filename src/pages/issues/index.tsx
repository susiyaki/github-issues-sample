import React, {useCallback, useMemo, useState} from 'react';
import {Pagination} from '@components/molecules';
import {IssueList} from '@components/organisms';
import {useGithubIssuesApi, useGithubSearchApi} from '@hooks';
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

  const totalCount = useMemo(() => {
    if (!openIssues || !closedIssues) return 1;

    if (filter.state === 'open') {
      return openIssues.total_count;
    } else if (filter.state === 'closed') {
      return closedIssues.total_count;
    } else {
      return openIssues.total_count + closedIssues.total_count;
    }
  }, [openIssues, closedIssues, filter.state]);

  const handleChangeFilter = useCallback(({state}) => {
    setFilter((prev) => ({...prev, state}));
  }, []);

  const handlePageChange = useCallback(
    (e, page) => {
      e.preventDefault();
      setPage(page);
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
  console.log(issues);

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
      <IssueList issues={issues} />
      <Pagination
        currentPage={page}
        perPage={PER_PAGE}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
