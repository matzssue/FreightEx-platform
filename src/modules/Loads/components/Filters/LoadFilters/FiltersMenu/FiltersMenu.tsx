import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { usePaginationContext } from '../../../../../../store/contexts/PaginationContext';
import { useAppDispatch } from '../../../../../../store/hooks';
import { addFilter, LoadsFilters } from '../../../../../../store/reducers/loadsFiltersSlice';
import {
  loadsFilterSchema,
  LoadsFiltersValues,
} from '../../../../../../utils/schemas/loadsFilters';
import { loadsPerPageWithMenu, loadsPerPageWithoutMenu } from '../../../../constants/loadsPerPage';
import { DateFilter } from '../DateFilter/DateFilter';
import { LocationFilter } from '../LocationFilter/LocationFilter';
import { TruckFilter } from '../TruckFilter/TruckFilter';

import styles from './FiltersMenu.module.scss';

export const FiltersMenu = () => {
  const [showFilersMenu, setShowFiltersMenu] = useState(true);
  const { changeItemsPerPage } = usePaginationContext();
  const dispatch = useAppDispatch();

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
      changeItemsPerPage(loadsPerPageWithoutMenu);
    }
    if (showFilersMenu) {
      changeItemsPerPage(loadsPerPageWithMenu);
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <div
        id='load-filters'
        className={`${styles['filters-container']} ${showFilersMenu ? '' : styles['hidden']}`}
      >
        <TruckFilter errors={errors} register={register} />
        <LocationFilter setValue={setValue} control={control} />
        <DateFilter control={control} />
      </div>
      <div className={styles.buttons}>
        <button
          id='loads'
          onClick={() => setShowFiltersMenu((prevValue) => !prevValue)}
          type='button'
          className={`${styles['show-filters__button']} ${showFilersMenu ? '' : styles.hidden}`}
        >
          {showFilersMenu ? 'Hide filters' : 'Show Filters'}{' '}
          {showFilersMenu ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        </button>

        <button
          type='button'
          className={`${styles['apply-button']} ${showFilersMenu ? '' : styles.hidden}`}
          id='reset-form'
          onClick={() => reset()}
        >
          Reset form
        </button>

        <button
          className={`${styles['apply-button']} ${showFilersMenu ? '' : styles.hidden}`}
          type='submit'
        >
          Apply filters
        </button>
      </div>
    </form>
  );
};
