import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {BiBookBookmark} from 'react-icons/bi';
import {OverlayIndicator} from '@components/atoms';
import {Pagination} from '@components/molecules';
import {IssueList} from '@components/organisms';
import {useGithubIssuesApi, useGithubSearchApi} from '@hooks';
import {ApiResponse} from '@types';
import {Box, Flex, Heading} from '@primer/components';
import {parseQueryString} from '@lib/parseQueryString';
import {route} from '@config/route';

type Props = Record<string, unknown>;

const PER_PAGE = 10;
const DEFAULT_OWNER = 'facebook';
const DEFAULT_REPO = 'react';

export const Issues: React.FC<Props> = () => {
  const {getIssues} = useGithubIssuesApi();
  const {searchIssues} = useGithubSearchApi();
  const [issues, setIssuus] = useState<ApiResponse.Github.Issue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<{state: 'all' | 'open' | 'closed'}>({
    state: 'open',
  });
  const {search} = useLocation();
  const {push} = useHistory();
  const {owner, repo} = parseQueryString<{owner: string; repo: string}>(search);

  // NOTE: repository一覧とか作ったらいい感じに飛ぶ
  useEffect(() => {
    if (owner && repo) return;
    push({
      pathname: route.issues,
      search: `?owner=${DEFAULT_OWNER}&repo=${DEFAULT_REPO}`,
    });
  }, [owner, repo]);

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
    setPage(1);
    setFilter((prev) => ({...prev, state}));
  }, []);

  const handlePageChange = useCallback(
    (e, page) => {
      e.preventDefault();
      setPage(page);
    },
    [page],
  );

  const handleClickIssueListItem = useCallback(
    (issue: ApiResponse.Github.Issue) => {
      push({
        pathname: route.showIssue(issue.number),
        search: `?owner=${owner}&repo=${repo}`,
      });
    },
    [owner, repo],
  );

  if (issues.length === 0 && status === 'loading') {
    return <OverlayIndicator isVisible={true} />;
  }

  return (
    <Box marginLeft="10%" marginRight="10%" paddingTop="16px">
      <Heading fontSize={20} marginBottom="16px">
        <Flex alignItems="center">
          <BiBookBookmark />
          &nbsp;
          {owner}/{repo}
        </Flex>
      </Heading>
      <IssueList
        issues={issues}
        filter={filter}
        openIssuesCount={openIssues?.total_count}
        closedIssuesCount={closedIssues?.total_count}
        handleChangeFilter={handleChangeFilter}
        handleClickIssueListItem={handleClickIssueListItem}
      />
      <Pagination
        currentPage={page}
        perPage={PER_PAGE}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};
