import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import styles from './FiltersMenu.module.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { loadsFilterSchema, LoadsFiltersValues } from '../../../../utils/schemas/loadsFilters';
import { useAppDispatch } from '../../../../store/hooks';
import { addFilter, LoadsFilters } from '../../../../store/reducers/loadsFiltersSlice';
import { useAppSelector } from '../../../../store/hooks';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { TruckFilter } from './TruckFilter';
import { LocationFilter } from './LocationFilter';
import { DateFilter } from './DateFilter';
import { usePaginationContext } from '../../../../store/contexts/PaginationContext';
import { loadsPerPageWithMenu, loadsPerPageWithoutMenu } from '../../../../constants/loadsPerPage';

export const FiltersMenu = () => {
  // const [loadingAddress, setLoadingAddress] = useState<Addresses | undefined>(undefined);
  // const [unloadingAddress, setUnloadingAddress] = useState<Addresses | undefined>(undefined);
  const [showFilersMenu, setShowFiltersMenu] = useState(true);
  const { changeLoadsPerPage } = usePaginationContext();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.loadsFilters.filters);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver<LoadsFiltersValues>(loadsFilterSchema),
  });

  useEffect(() => {
    if (!showFilersMenu) {
      changeLoadsPerPage(loadsPerPageWithoutMenu);
    }
    if (showFilersMenu) {
      changeLoadsPerPage(loadsPerPageWithMenu);
    }
  }, [showFilersMenu]);

  const onSubmit = async (data: LoadsFiltersValues) => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    const filter: LoadsFilters = {
      ...data,
      startLoadingDate: data.startLoadingDate ? data.startLoadingDate.toISOString() : null,
      endLoadingDate: data.endLoadingDate ? moment(data.endLoadingDate).format('YYYY-MM-DD') : null,
      startUnloadingDate: data.startUnloadingDate
        ? moment(data.startUnloadingDate).format('YYYY-MM-DD')
        : null,
      endUnloadingDate: data.endUnloadingDate
        ? moment(data.endUnloadingDate).format('YYYY-MM-DD')
        : null,
      id: small_id,
    };

    dispatch(addFilter(filter));
    reset();
    console.log(filters);
  };
  console.log(showFilersMenu);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <div className={`${styles['filters-container']} ${showFilersMenu ? '' : styles['hidden']}`}>
        <TruckFilter errors={errors} register={register} />
        <LocationFilter setValue={setValue} control={control} />
        <DateFilter control={control} />
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => setShowFiltersMenu((prevValue) => !prevValue)}
          type='button'
          className={`${styles['show-filters__button']} ${showFilersMenu ? '' : styles.hidden}`}
        >
          {showFilersMenu ? 'Hide filters' : 'Show Filters'}{' '}
          {showFilersMenu ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        </button>
        <button
          className={`${styles['apply-button']} ${showFilersMenu ? '' : styles.hidden}`}
          type='submit'
        >
          Aplly filters
        </button>
      </div>
    </form>
  );
};
