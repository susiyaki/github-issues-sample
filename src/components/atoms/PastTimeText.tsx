import React from 'react';
import dayjs from 'dayjs';
import {Tooltip} from '@primer/components';
import {pastTimeFormat} from '@lib/pastTimeFormat';

type Props = {
  date: Date;
};

export const PastTimeText: React.FC<Props> = ({date}) => {
  return (
    <Tooltip aria-label={dayjs(date).format('MMM, D, YYYY, h:mm A, Z')}>
      {pastTimeFormat(date)}
    </Tooltip>
  );
};
