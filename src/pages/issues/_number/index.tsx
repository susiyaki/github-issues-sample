import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useGithubIssuesApi} from '@hooks';

type Props = Record<string, unknown> &
  RouteComponentProps<{owner: string; repo: string; number: string}>;
const DEFAULT_OWNER = 'facebook';
const DEFAULT_REPO = 'react';

export const Issue: React.FC<Props> = (props) => {
  const {getIssue} = useGithubIssuesApi();
  const {number: issueNumStr} = props.match.params;
  let {owner, repo} = props.match.params;

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
