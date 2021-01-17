import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link as PrimerLink} from '@primer/components';
import {ResponsiveValue} from 'styled-system';
import {
  FontWeightProperty,
  ColorProperty,
} from 'styled-system/node_modules/csstype';

type Props = {
  to: string;
  content: string;
  color?: ResponsiveValue<ColorProperty>;
  fontWeight?: ResponsiveValue<FontWeightProperty>;
};

export const Link: React.FC<Props> = ({to, content, color, fontWeight}) => {
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
};
