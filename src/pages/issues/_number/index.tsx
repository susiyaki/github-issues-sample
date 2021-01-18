import React, {useEffect} from 'react';
import {Box, Flex, Heading} from '@primer/components';
import {OverlayIndicator, ErrorText} from '@components/atoms';
import {IssueDetailBody, IssueDetailHeader} from '@components/organisms';
import {BiBookBookmark} from 'react-icons/bi';
import {useLocation, useRouteMatch, useHistory} from 'react-router-dom';
import {useGithubIssuesApi} from '@hooks';
import {parseQueryString} from '@lib/parseQueryString';
import {route} from '@config/route';

type Props = Record<string, unknown>;
const DEFAULT_OWNER = 'facebook';
const DEFAULT_REPO = 'react';

export const Issue: React.FC<Props> = () => {
  const {getIssue} = useGithubIssuesApi();
  const {
    params: {number: issueNumStr},
  } = useRouteMatch<{
    number: string;
  }>();
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

  const {data: issue, isLoading, isError} = getIssue({
    queryParams: {
      owner,
      repo,
      issueNumStr,
    },
  });

  if (isLoading) {
    return <OverlayIndicator />;
  }

  if (!issue || isError) {
    return <ErrorText />;
  }

  return (
    <Box marginLeft="10%" marginRight="10%" paddingTop="16px" marginBottom="5%">
      <Heading fontSize={20} marginBottom="16px">
        <Flex alignItems="center">
          <BiBookBookmark />
          &nbsp;
          {owner}/{repo}
        </Flex>
      </Heading>
      <IssueDetailHeader issue={issue} />
      <IssueDetailBody issue={issue} />
    </Box>
  );
};
