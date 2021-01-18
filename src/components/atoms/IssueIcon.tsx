import {Flex, Label, Text} from '@primer/components';
import React from 'react';
import {GoIssueOpened, GoIssueClosed} from 'react-icons/go';

type Props = {
  type: 'open' | 'closed';
  label?: boolean;
  inverted?: boolean; // only with label
};

const OPEN_COLOR = '#28a745';
const CLOSED_COLOR = '#cb2431';
const INVERTED_COLOR = '#ffffff';

export const IssueIcon: React.FC<Props> = ({label, type, inverted}) => {
  if (label) {
    return type === 'open' ? (
      <Label
        bg={inverted ? OPEN_COLOR : INVERTED_COLOR}
        paddingTop="5px"
        paddingBottom="5px"
        paddingLeft="12px"
        paddingRight="12px">
        <Flex alignItems="center">
          <GoIssueOpened
            size={16}
            color={inverted ? INVERTED_COLOR : OPEN_COLOR}
          />
          &nbsp;
          <Text fontSize="14px" color={inverted ? INVERTED_COLOR : OPEN_COLOR}>
            Open
          </Text>
        </Flex>
      </Label>
    ) : (
      <Label
        bg={inverted ? CLOSED_COLOR : INVERTED_COLOR}
        paddingTop="5px"
        paddingBottom="5px"
        paddingLeft="12px"
        paddingRight="12px">
        <Flex alignItems="center">
          <GoIssueClosed
            size={16}
            color={inverted ? INVERTED_COLOR : CLOSED_COLOR}
          />
          &nbsp;
          <Text
            fontSize="14px"
            color={inverted ? INVERTED_COLOR : CLOSED_COLOR}>
            Closed
          </Text>
        </Flex>
      </Label>
    );
  } else {
    return type === 'open' ? (
      <GoIssueOpened color="#22863a" />
    ) : (
      <GoIssueClosed color="#cb2431" />
    );
  }
};

