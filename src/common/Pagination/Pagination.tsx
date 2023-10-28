import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

import { usePaginationContext } from '../../store/contexts/PaginationContext';

export const Paginate = ({ lastPage }: { lastPage: number }) => {
  const { changePage, currentPage } = usePaginationContext();

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
