import { Control, FieldValues, Path } from 'react-hook-form';
import dayjs from 'dayjs';

import { DateInput } from '../../../../../../common/Inputs/DateInput/DateInput';
import { FilterCard } from '../FilterCard/FilterCard';

import styles from './DateFilter.module.scss';

type DateFilterProps<T extends FieldValues> = {
  control: Control<T>;
};

const today = dayjs();
const minDate = today.subtract(2, 'year');
const maxDate = today.add(1, 'year');
const commonProps = {
  fontSize: '15px',
  size: 'small' as const,
  sx: { boxShadow: '3px 3px 0px 0px rgba(148, 148, 148, 0.267)' },
  props: { minDate, maxDate },
};

export const DateFilter = <T extends FieldValues>({ control }: DateFilterProps<T>) => (
  <FilterCard row={true} filterName={'Date'}>
    <div className={styles['date-inputs']}>
      <fieldset className={styles['date-fieldset']}>
        <label htmlFor='startLoadingDate'>Min loading date</label>
        <DateInput {...commonProps} control={control} name={'startLoadingDate' as Path<T>} />
        <label htmlFor='endLoadingDate'>Max loading date</label>
        <DateInput {...commonProps} control={control} name={'endLoadingDate' as Path<T>} />
      </fieldset>
    </div>
    <div className={styles['date-inputs']}>
      <fieldset className={styles['date-fieldset']}>
        <label htmlFor='startUnloadingDate'>Min unloading date</label>
        <DateInput {...commonProps} control={control} name={'startUnloadingDate' as Path<T>} />
        <label htmlFor='endUnloadingDate'>Max unloading date</label>
        <DateInput {...commonProps} control={control} name={'endUnloadingDate' as Path<T>} />
      </fieldset>
    </div>
  </FilterCard>
);
