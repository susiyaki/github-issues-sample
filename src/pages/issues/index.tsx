import React from 'react';
import {useIssueApi} from '../../hooks/api/issue';

type Props = Record<string, unknown>;

export const Issues: React.FC<Props> = () => {
  const {getIssues} = useIssueApi();

  const {data: issues, status} = getIssues({offset: 0, limit: 10});

  if (status === 'loading') {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }
  return (
    <div>
      {issues?.map((issue) => (
        <div key={issue.id}>
          <p>{issue.id}</p>
          <p>{issue.title}</p>
          <div style={{border: '1px solid #000', width: '100%'}} />
        </div>
      ))}
    </div>
  );
};
