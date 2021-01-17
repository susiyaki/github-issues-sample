import React from 'react';
import {GoIssueOpened, GoIssueClosed} from 'react-icons/go';

type Props = {
  state: 'open' | 'closed' | 'all';
};

export const IssueIcon: React.FC<Props> = ({state}) =>
  state === 'open' ? (
    <GoIssueOpened color="#22863a" />
  ) : (
    <GoIssueClosed color="#cb2431" />
  );
