import React from 'react';
import {colorService} from '@lib';
import {Label as PrimerLabel} from '@primer/components';
import {ResponsiveValue} from 'styled-system';
import {BackgroundColorProperty} from 'styled-system/node_modules/csstype';

type Props = {
  backgroundColor?: ResponsiveValue<BackgroundColorProperty>;
  content: string;
};

export const Label: React.FC<Props> = ({backgroundColor, content}) => {
  // NOTE: 背景色の輝度に合わせて文字色を黒or白で出力
  const getLabelColor = (hex: string) => {
    const rgb = colorService.hex2rgb(hex);
    const luminance = colorService.getLuminance(rgb);
    if (luminance > 120) {
      return '#000';
    } else {
      return '#FFF';
    }
  };

  return (
    <PrimerLabel
      bg={backgroundColor && `#${backgroundColor}`}
      color={backgroundColor && getLabelColor(backgroundColor as string)}>
      {content}
    </PrimerLabel>
  );
};
