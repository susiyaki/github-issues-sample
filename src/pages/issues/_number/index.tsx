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

  // NOTE: 直アクセスしてきてownerかrepoがないとき一覧にとばす
  useEffect(() => {
    if (owner && repo) return;

    push(route.issues);
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

  // NOTE: エラーが起きたらエラー表示後前の一覧に飛ばす
  if (!issue || isError) {
    setTimeout(() => {
      push({
        pathname: route.issues,
        search: `?owner=${owner}&repo=${repo}`,
      });
    }, 1000);
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
