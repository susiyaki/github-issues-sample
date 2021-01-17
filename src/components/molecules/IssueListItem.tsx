import React from 'react';
import {Box, Flex, Text} from '@primer/components';
import {Link, IssueIcon} from '@components/atoms';
import {LabelGroup} from '@components/molecules';
import {ApiResponse} from '@types';
import {route} from '@config/route';

type Props = {
  issue: ApiResponse.Github.Issue;
};

export const IssueListItem: React.FC<Props> = ({issue}) => {
  return (
    // TODO: change opacity when hover item
    <Box>
      <Flex>
        <Box paddingTop="8px" paddingLeft="16px">
          <IssueIcon state={issue.state} />
        </Box>
        <Box padding="8px">
          <Box>
            <Link
              to={route.showIssue(issue.number)}
              content={issue.title}
              fontWeight={600}
            />
            &nbsp;
            <LabelGroup labels={issue.labels} />
          </Box>
          <Box marginTop="4px">
            <Text color="#586069" fontSize="14px">
              #{issue.number} opened on {issue.created_at} by {issue.user.login}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
