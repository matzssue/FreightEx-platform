import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { usePaginationContext } from '../../../store/contexts/PaginationContext';
import { Load } from '../../../utils/api/supabase/types';

export const Paginate = ({
  data,
  setSlicedLoads,
}: {
  data: Load[] | undefined;
  setSlicedLoads: (loads: Load[]) => void;
}) => {
  const { changePage, currentPage, loadsPerPage } = usePaginationContext();

  // const [currentPage, setCurrentPage] = useState(1);
  // //   const [loads, setLoads] = useState();
  const [lastPage, setLastPage] = useState(0);
  // const POSTS_PER_PAGE = 8;
  useEffect(() => {
    if (!data) return;
    const indexOfLastPost = currentPage * loadsPerPage;
    const lastPage = Math.ceil(data.length / loadsPerPage);
    setLastPage(lastPage);
    const indexOfFirstPost = indexOfLastPost - loadsPerPage;

    const loads = data.slice(indexOfFirstPost, indexOfLastPost);
    setSlicedLoads(loads);
  }, [data, setSlicedLoads, currentPage, loadsPerPage]);

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
