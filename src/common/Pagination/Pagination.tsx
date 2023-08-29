import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { usePaginationContext } from '../../store/contexts/PaginationContext';

type PaginateProps<T> = {
  data: T[];
  setSlicedItems: (loads: T[]) => void;
};

export const Paginate = <T,>({ data, setSlicedItems }: PaginateProps<T>) => {
  const { changePage, currentPage, loadsPerPage } = usePaginationContext();

  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    if (!data) return;
    const indexOfLastPost = currentPage * loadsPerPage;
    const lastPage = Math.ceil(data.length / loadsPerPage);
    const indexOfFirstPost = indexOfLastPost - loadsPerPage;
    const items = data.slice(indexOfFirstPost, indexOfLastPost);
    setLastPage(lastPage);
    setSlicedItems(items);
  }, [data, setSlicedItems, currentPage, loadsPerPage]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={(_, value) => changePage(value)}
        renderItem={(item) => (
          <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
        )}
      />
    </Stack>
  );
};
