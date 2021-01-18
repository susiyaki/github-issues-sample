import React, {useMemo} from 'react';
import {
  Pagination as PrimerPagination,
  PaginationProps,
} from '@primer/components';

type Props = Omit<PaginationProps, 'pageCount'> & {
  perPage: number;
  totalCount: number;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  totalCount,
  ...props
}) => {
  const pageCount = useMemo(() => {
    return Math.ceil(totalCount / perPage);
  }, [perPage, totalCount]);

  if (!pageCount) {
    return null;
  }

  return (
    <PrimerPagination
      {...props}
      pageCount={pageCount}
      marginPageCount={2}
      surroundingPageCount={2}
    />
  );
};
