import React from 'react';
import {BorderBox, Flex} from '@primer/components';
import {IssueFilterButton} from '@components/atoms';

export type IssueListHeaderProps = {
  filter: {state: 'all' | 'open' | 'closed'};
  openIssuesCount?: number;
  closedIssuesCount?: number;
  handleChangeFilter: (filterParams: {
    state: 'all' | 'open' | 'closed';
  }) => void;
};

export const IssueListHeader: React.FC<IssueListHeaderProps> = ({
  filter,
  openIssuesCount,
  closedIssuesCount,
  handleChangeFilter,
}) => {
  return (
    <BorderBox
      borderRadius={0}
      borderBottomWidth={1}
      borderTopLeftRadius={6}
      borderTopRightRadius={6}
      backgroundColor="#f6f8fa"
      padding="16px"
      margin="-1px -1px 0">
      <Flex>
        <IssueFilterButton
          type="open"
          active={filter.state}
          count={openIssuesCount}
          onClick={() => handleChangeFilter({state: 'open'})}
        />
        <IssueFilterButton
          type="closed"
          active={filter.state}
          count={closedIssuesCount}
          onClick={() => handleChangeFilter({state: 'closed'})}
        />
        <IssueFilterButton
          type="all"
          active={filter.state}
          count={(openIssuesCount || 0) + (closedIssuesCount || 0)}
          onClick={() => handleChangeFilter({state: 'all'})}
        />
      </Flex>
    </BorderBox>
  );
};
