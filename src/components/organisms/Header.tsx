import React from 'react';
import {Link} from 'react-router-dom';
import {Header as PrimerHeader, Flex, Text} from '@primer/components';
import {CgGhostCharacter} from 'react-icons/cg';
import {route} from '@config/route';

type Props = Record<string, unknown>;

export const Header: React.FC<Props> = () => {
  return (
    <PrimerHeader backgroundColor="#24292e">
      <PrimerHeader.Item>
        <Link to={route.issues}>
          <Flex alignItems="center">
            <CgGhostCharacter color="#ffffff" size={32} />
            &nbsp;
            <Text color="#ffffff" fontSize={16}>
              Github Issues Dummy
            </Text>
          </Flex>
        </Link>
      </PrimerHeader.Item>
    </PrimerHeader>
  );
};
