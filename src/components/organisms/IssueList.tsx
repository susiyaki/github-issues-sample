import React from 'react';
import {BorderBox} from '@primer/components';
import {IssueListItem} from '@components/organisms';
import {ApiResponse} from '@types';

type Props = {
  issues: ApiResponse.Github.Issue[];
};

export const IssueList: React.FC<Props> = ({issues}) => {
  return (
    <BorderBox>
      {issues.map((issue) => (
        <BorderBox
          key={issue.id}
          borderRadius={0}
          borderWidth={0}
          borderBottom={1}>
          <IssueListItem issue={issue} />
        </BorderBox>
      ))}
    </BorderBox>
  );
};
