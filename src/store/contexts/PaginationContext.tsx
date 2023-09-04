import { createContext, useState } from 'react';

import { getSafeContext } from '../../utils/helpers/getSateContext';

import { loadsPerPageWithMenu } from '../../modules/Loads/constants/loadsPerPage';

type PaginationContextProps = {
  changePage: (value: number) => void;
  currentPage: number;
  itemsPerPage: number;
  changeItemsPerPage: (value: number) => void;
};

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(loadsPerPageWithMenu);

  const changePage = (value: number) => {
    setCurrentPage(value);
  };
  const changeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
  };

  const valueContext = {
    changePage,
    currentPage,
    itemsPerPage,
    changeItemsPerPage,
  };

  return <PaginationContext.Provider value={valueContext}>{children}</PaginationContext.Provider>;
};

export const usePaginationContext = getSafeContext(PaginationContext, 'Pagination Context');
