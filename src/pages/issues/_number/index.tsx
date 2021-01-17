import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useGithubIssuesApi} from '@hooks';

type Props = Record<string, unknown> & RouteComponentProps<{number: string}>;

// TODO
const owner = 'facebook';
const repo = 'react';

export const Issue: React.FC<Props> = (props) => {
  const {getIssue} = useGithubIssuesApi();
  const issueNumStr = props.match.params.number;
  const {data: issue, status} = getIssue({
    queryParams: {owner, repo, issueNumStr},
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
