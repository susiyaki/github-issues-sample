import React, {useEffect} from 'react';
import {
  Avatar,
  PointerBox,
  BorderBox,
  Box,
  Flex,
  Heading,
  Text,
} from '@primer/components';
import {MarkdownViewer} from '@components/atoms';
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

  const {data: issue, isLoading} = getIssue({
    queryParams: {
      owner,
      repo,
      issueNumStr,
    },
  });

  // TODO
  if (!issue || isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
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
      <Heading fontWeight={300}>
        {issue?.title} <Text opacity={0.6}>#{issue?.number}</Text>
      </Heading>
      <Flex>
        <Box marginRight="16px">
          <Avatar
            src={issue?.user.avatar_url}
            width={40}
            height={40}
            size={40}
          />
        </Box>
        <Box flexGrow={1}>
          <PointerBox
            caret="left"
            paddingTop="8px"
            paddingBottom="8px"
            borderRadius={6}
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            backgroundColor="#f6f8fa"
            paddingLeft="16px"
            paddingRight="16px">
            <Text>{issue?.user.login}</Text>
          </PointerBox>
          <BorderBox
            borderRadius={1}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth={1}
            borderTopWidth={0}>
            <MarkdownViewer markdonwText={issue?.body} />
          </BorderBox>
        </Box>
      </Flex>
    </Box>
  );
};
