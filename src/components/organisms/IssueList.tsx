import React from 'react';
import {BorderBox} from '@primer/components';
import {
  IssueListItem,
  IssueListHeader,
  IssueListHeaderProps,
} from '@components/molecules';
import {ApiResponse} from '@types';

type Props = {
  issues: ApiResponse.Github.Issue[];
} & IssueListHeaderProps;

export const IssueList: React.FC<Props> = ({
  issues,
  filter,
  openIssuesCount,
  closedIssuesCount,
  handleChangeFilter,
}) => {
  return (
    <BorderBox>
      <IssueListHeader
        filter={filter}
        openIssuesCount={openIssuesCount}
        closedIssuesCount={closedIssuesCount}
        handleChangeFilter={handleChangeFilter}
      />
      {issues.map((issue, index) => (
        <BorderBox
          key={issue.id}
          borderRadius={0}
          borderWidth={0}
          borderBottom={1}
          borderBottomWidth={issues.length - 1 === index ? 0 : 1}>
          <IssueListItem issue={issue} />
        </BorderBox>
      ))}
    </BorderBox>
  );
};
