import React from 'react';
import {
  Avatar,
  PointerBox,
  BorderBox,
  Box,
  Flex,
  Text,
} from '@primer/components';
import {MarkdownViewer} from '@components/atoms';
import {ApiResponse} from '@types';

type Props = {
  issue: ApiResponse.Github.Issue;
};

export const IssueDetailBody: React.FC<Props> = ({issue}) => {
  return (
    <Flex>
      <Box marginRight="16px">
        <Avatar src={issue.user.avatar_url} width={40} height={40} size={40} />
      </Box>
      <Box flexGrow={1}>
        <PointerBox
          caret="left"
          paddingTop="8px"
          paddingBottom="8px"
          borderRadius={6}
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          backgroundColor="#f6f8fa"
          paddingLeft="16px"
          paddingRight="16px">
          <Text>{issue.user.login}</Text>
        </PointerBox>
        <BorderBox
          borderRadius={1}
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          borderWidth={1}
          borderTopWidth={0}>
          <MarkdownViewer markdonwText={issue.body} />
        </BorderBox>
      </Box>
    </Flex>
  );
};
