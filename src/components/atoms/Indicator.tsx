import React from 'react';
import ReactLoading from 'react-loading';

import {CgGhostCharacter} from 'react-icons/cg';

type Props = {
  isVisible?: boolean;
};

export const OverlayIndicator: React.FC<Props> = ({isVisible = true}) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        bottom: '0px',
        top: '0px',
        left: '0px',
        position: 'absolute',
      }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-10px',
          marginTop: '-10px',
        }}>
        <CgGhostCharacter size={20} />
        <ReactLoading type="spin" height={20} width={20} color="#000" />
      </div>
    </div>
  );
};
