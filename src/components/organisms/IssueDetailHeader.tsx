import React from 'react';
import {BorderBox, Box, Flex, Heading, Text} from '@primer/components';
import {PastTimeText, IssueIcon} from '@components/atoms';
import {ApiResponse} from '@types';

type Props = {
  issue: ApiResponse.Github.Issue;
};

export const IssueDetailHeader: React.FC<Props> = ({issue}) => {
  return (
    <Box>
      <Heading fontWeight={300}>
        {issue.title} <Text opacity={0.6}>#{issue.number}</Text>
      </Heading>
      <BorderBox
        paddingBottom="8px"
        marginBottom="16px"
        borderRadius={0}
        borderWidth={0}
        borderBottomWidth={1}
        borderBottomColor="#586069">
        <Flex alignItems="center">
          <IssueIcon type={issue.state} label inverted />
          &nbsp;
          <Text fontSize={14}>
            <Text fontWeight="bold">{issue.user.login}</Text>
            &nbsp;
            <Text>opened this issue </Text>
            <PastTimeText date={issue.created_at} />
          </Text>
        </Flex>
      </BorderBox>
    </Box>
  );
};
