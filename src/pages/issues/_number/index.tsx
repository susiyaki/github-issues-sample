import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import {
  Avatar,
  PointerBox,
  BorderBox,
  Box,
  Flex,
  Heading,
  Text,
  Tooltip,
} from '@primer/components';
import {MarkdownViewer, IssueIcon} from '@components/atoms';
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

  const pastFormat = (date: Date): string => {
    const event = dayjs(date);
    const now = dayjs();

    const diffYears = now.diff(event, 'year');
    if (diffYears >= 1) {
      return diffYears === 1 ? 'last year' : `${diffYears} years ago`;
    }

    const diffMonths = now.diff(event, 'month');
    if (diffMonths >= 1) {
      return diffMonths === 1 ? 'last month' : `${diffMonths} months ago`;
    }

    const diffDays = now.diff(event, 'day');
    if (diffDays >= 1) {
      return diffDays === 1 ? 'yesterday' : `${diffDays} days ago`;
    }

    const diffHours = now.diff(event, 'hour');
    if (diffHours >= 1) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }

    const diffMinutes = now.diff(event, 'minute');
    if (diffMinutes >= 1) {
      return diffMinutes === 1 ? '1 hour ago' : `${diffMinutes} minutes ago`;
    }

    const diffSecounds = now.diff(event, 'second');
    return diffSecounds > 10 ? 'now' : `${diffSecounds} seconds ago`;
  };

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
        <Box>
          {issue.title} <Text opacity={0.6}>#{issue.number}</Text>
        </Box>
        <BorderBox
          paddingBottom="8px"
          marginBottom="16px"
          borderRadius={0}
          borderWidth={0}
          borderBottomWidth={1}
          borderBottomColor="#586069">
          <Flex alignItems="center">
            <IssueIcon type={issue.state} label inverted />
            &nbsp;
            <Text fontSize={14}>
              <Text fontWeight="bold">{issue.user.login}</Text>
              &nbsp;
              <Text>opened this issue </Text>
              <Tooltip
                aria-label={dayjs(issue.created_at).format(
                  'MMM, D, YYYY, h:mm A, Z',
                )}>
                {pastFormat(issue.created_at)}
              </Tooltip>
            </Text>
          </Flex>
        </BorderBox>
      </Heading>
      <Flex>
        <Box marginRight="16px">
          <Avatar
            src={issue.user.avatar_url}
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
            <Text>{issue.user.login}</Text>
          </PointerBox>
          <BorderBox
            borderRadius={1}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth={1}
            borderTopWidth={0}>
            <MarkdownViewer markdonwText={issue.body} />
          </BorderBox>
        </Box>
      </Flex>
    </Box>
  );
};
