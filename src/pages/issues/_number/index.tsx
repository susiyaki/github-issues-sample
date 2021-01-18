import React from 'react';
import {useLocation, useRouteMatch} from 'react-router-dom';
import {useGithubIssuesApi} from '@hooks';
import {parseQueryString} from '@lib/parseQueryString';

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
  let {owner, repo} = parseQueryString<{owner: string; repo: string}>(search);

  // NOTE: repository一覧とか作ったらいい感じに飛ぶ
  owner = owner && repo ? owner : DEFAULT_OWNER;
  repo = owner && repo ? repo : DEFAULT_REPO;

  const {data: issue, status} = getIssue({
    queryParams: {
      owner,
      repo,
      issueNumStr,
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
      <p>issue番号: {issue?.number}</p>
      <p>タイトル: {issue?.title}</p>
      <p>本文: {issue?.body}</p>
    </div>
  );
};
