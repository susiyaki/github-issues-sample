import React, {useMemo, useRef, useState} from 'react';
import {TextInput, Text} from '@primer/components';

type Props = {
  value: string;
  name: string;
  placeholder?: string;
  mode?: 'standalone' | 'dependent';
  onChange?: (e: React.ChangeEvent) => void;
  onEnter?: () => void;
  onBlur?: (event: {target: {name: string; value: string}}) => void;
};

export const ToggleInput: React.FC<Props> = ({
  name,
  value,
  mode = 'dependent',
  placeholder,
  onChange,
  onBlur,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [v, setV] = useState<string>(value);
  const ref = useRef<HTMLInputElement>(null);

  const isInput = useMemo(() => {
    if (open) return true;
    if (mode === 'dependent') {
      return typeof value === 'string' && value.length === 0;
    } else {
      return typeof value === 'string' && v.length === 0;
    }
  }, [mode, open, v, value]);

  return isInput ? (
    <TextInput
      ref={ref}
      onBlur={() => {
        setOpen(false);
        if (onBlur) {
          if (v.length !== 0) {
            onBlur({target: {name, value: v}});
          } else {
            setV(value);
            onBlur({target: {name, value: value}});
          }
        }
      }}
      name={name}
      value={mode === 'dependent' ? value : v}
      placeholder={placeholder}
      onChange={(e) => {
        !open && setOpen(true);
        if (mode === 'dependent') {
          onChange && onChange(e);
        } else {
          setV(e.target.value);
        }
      }}
      onKeyPress={(e) => e.key === 'Enter' && ref.current?.blur()}
      autoFocus
    />
  ) : (
    <Text onClick={() => setOpen(true)}>{value}</Text>
  );
};
