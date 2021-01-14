import React from 'react';
import {Link} from 'react-router-dom';
import {route} from '../../config/route';
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
        <Link key={issue.id} to={route.showIssue(issue.number)}>
          <p>{issue.id}</p>
          <p>{issue.title}</p>
          <div style={{border: '1px solid #000', width: '100%'}} />
        </Link>
      ))}
    </div>
  );
};
