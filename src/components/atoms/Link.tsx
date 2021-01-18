import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link as PrimerLink} from '@primer/components';
import {ResponsiveValue} from 'styled-system';
import {
  FontWeightProperty,
  ColorProperty,
} from 'styled-system/node_modules/csstype';

type Props = ({to?: string} | {onClick?: () => void}) & {
  to?: string;
  onClick?: () => void;
  content: string;
  color?: ResponsiveValue<ColorProperty>;
  fontWeight?: ResponsiveValue<FontWeightProperty>;
};

export const Link: React.FC<Props> = ({
  to,
  onClick,
  content,
  color,
  fontWeight,
}) => {
  if (to) {
    return (
      <RouterLink to={to}>
        <PrimerLink
          color={color || '#000'}
          hoverColor="#0366d6"
          underline={false}
          fontWeight={fontWeight}>
          {content}
        </PrimerLink>
      </RouterLink>
    );
  }
  return (
    <PrimerLink
      onClick={onClick}
      color={color || '#000'}
      hoverColor="#0366d6"
      underline={false}
      fontWeight={fontWeight}
      style={{cursor: 'pointer'}}>
      {content}
    </PrimerLink>
  );
};
