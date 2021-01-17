import React from 'react';
import {LabelGroup as PrimerLabelGroup} from '@primer/components';
import {Label} from '@components/atoms';
import {ApiResponse} from '@types';

type Props = {
  labels: ApiResponse.Github.Label[];
};

export const LabelGroup: React.FC<Props> = ({labels}) => {
  if (labels.length === 0) return null;

  return (
    <PrimerLabelGroup>
      {labels.map((label) => (
        <Label
          key={label.id}
          backgroundColor={label.color}
          content={label.name}
        />
      ))}
    </PrimerLabelGroup>
  );
};
