import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {BiBookBookmark} from 'react-icons/bi';
import {ErrorText, OverlayIndicator, ToggleInput} from '@components/atoms';
import {Pagination} from '@components/molecules';
import {IssueList} from '@components/organisms';
import {useGithubIssuesApi, useGithubSearchApi} from '@hooks';
import {ApiResponse} from '@types';
import {Box, Flex, PointerBox, Heading, Text} from '@primer/components';
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

  // NOTE: 初回レンダリング時にownerかrepoがなかったらデフォルトを表示
  useEffect(() => {
    if (owner && repo) return;

    push({
      pathname: route.issues,
      search: `?owner=${DEFAULT_OWNER}&repo=${DEFAULT_REPO}`,
    });
  }, []);

  const {data: openIssues} = searchIssues({
    queryParams: {
      repo: `${owner}/${repo}`,
      state: 'open',
    },

    options: {refetchOnMount: false, retry: 0},
  });
  const {data: closedIssues} = searchIssues({
    queryParams: {
      repo: `${owner}/${repo}`,
      state: 'closed',
    },
    options: {refetchOnMount: false, retry: 0},
  });
  const {isLoading, isError} = getIssues({
    queryParams: {
      owner: owner,
      repo: repo,
      page,
      perPage: PER_PAGE,
      state: filter.state,
    },
    options: {
      onSuccess: (res) => setIssuus(res),
      retry: 0,
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

  const handleChangeQueryString = useCallback(
    (e) => {
      push({
        pathname: route.issues,
        search: `?owner=${
          e.target.name === 'owner' ? e.target.value : owner
        }&repo=${e.target.name === 'repo' ? e.target.value : repo}`,
      });
    },
    [owner, repo],
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

  return (
    <Box marginLeft="10%" marginRight="10%" paddingTop="16px" marginBottom="5%">
      <Heading fontSize={20} marginBottom="16px">
        <Flex alignItems="center">
          <Box marginRight="16px">
            <BiBookBookmark />
            &nbsp;
            <ToggleInput
              name="owner"
              mode="standalone"
              value={owner}
              placeholder="Owner"
              onBlur={handleChangeQueryString}
            />
            <Text>/</Text>
            <ToggleInput
              name="repo"
              mode="standalone"
              value={repo}
              placeholder="repository"
              onBlur={handleChangeQueryString}
            />
          </Box>
          <Box>
            <PointerBox caret="left">
              <Text
                fontSize={12}
                paddingTop="8px"
                paddingBottom="8px"
                paddingLeft="16px"
                paddingRight="16px">
                You can change owner and repository.
              </Text>
            </PointerBox>
          </Box>
        </Flex>
      </Heading>
      {isError ? (
        <ErrorText />
      ) : issues.length === 0 && isLoading ? (
        <OverlayIndicator />
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};
