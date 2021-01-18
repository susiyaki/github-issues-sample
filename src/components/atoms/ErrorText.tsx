import React from 'react';
import {Flex, Text} from '@primer/components';
import {CgGhostCharacter} from 'react-icons/cg';

type Props = {
  isVisible?: boolean;
};

export const ErrorText: React.FC<Props> = ({isVisible = true}) => {
  if (!isVisible) return null;
  return (
    <Flex justifyContent="center" alignItems="center">
      <CgGhostCharacter size={56} />
      <Text>An Error Occured. Please try again.</Text>
    </Flex>
  );
};
