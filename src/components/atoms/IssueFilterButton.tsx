import React from 'react';
import {Box, Flex, Link} from '@primer/components';
import {GoIssueOpened, GoCheck, GoThreeBars} from 'react-icons/go';

type Props = {
  type: 'open' | 'closed' | 'all';
  active: 'open' | 'closed' | 'all';
  count?: number;
  onClick: () => void;
};

const ACTIVE_COLOR = '#24292e';
const INACTIVE_COLOR = '#586069';

export const IssueFilterButton: React.FC<Props> = ({
  type,
  active,
  count,
  onClick,
}) => {
  return (
    <Box marginRight="16px">
      <Link
        onClick={onClick}
        backgroundColor="transparent"
        hoverColor={ACTIVE_COLOR}
        color={type === active ? ACTIVE_COLOR : INACTIVE_COLOR}
        style={{cursor: 'pointer'}}>
        <Flex alignItems="center">
          {type === 'open' ? (
            <GoIssueOpened
              color={type === active ? ACTIVE_COLOR : INACTIVE_COLOR}
              size={18}
            />
          ) : type === 'closed' ? (
            <GoCheck
              color={type === active ? ACTIVE_COLOR : INACTIVE_COLOR}
              size={18}
            />
          ) : (
            <GoThreeBars
              color={type === active ? ACTIVE_COLOR : INACTIVE_COLOR}
              size={18}
            />
          )}
          &nbsp;
          {count || '?'} {type.slice(0, 1).toUpperCase()}
          {type.slice(1)}
        </Flex>
      </Link>
    </Box>
  );
};
