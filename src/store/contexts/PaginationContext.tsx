import { createContext, useState } from 'react';

import { getSafeContext } from '../../utils/helpers/getSateContext';

import { loadsPerPageWithMenu } from '../../constants/loadsPerPage';

type PaginationContextProps = {
  changePage: (value: number) => void;
  currentPage: number;
  loadsPerPage: number;
  changeLoadsPerPage: (value: number) => void;
};

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadsPerPage, setLoadsPerPage] = useState(loadsPerPageWithMenu);

  const changePage = (value: number) => {
    console.log(currentPage);
    setCurrentPage(value);
  };
  const changeLoadsPerPage = (value: number) => {
    setLoadsPerPage(value);
  };

  const valueContext = {
    changePage,
    currentPage,
    loadsPerPage,
    changeLoadsPerPage,
  };

  return <PaginationContext.Provider value={valueContext}>{children}</PaginationContext.Provider>;
};

export const usePaginationContext = getSafeContext(PaginationContext, 'Pagination Context');
