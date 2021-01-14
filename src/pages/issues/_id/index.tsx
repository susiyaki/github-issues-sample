import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useIssueApi} from '../../../hooks/api/issue';

type Props = Record<string, unknown> & RouteComponentProps<{number: string}>;

export const Issue: React.FC<Props> = (props) => {
  const {showIssue} = useIssueApi();
  const issueNumStr = props.match.params.number;
  const {data: issue, status} = showIssue({issueNumStr});

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
