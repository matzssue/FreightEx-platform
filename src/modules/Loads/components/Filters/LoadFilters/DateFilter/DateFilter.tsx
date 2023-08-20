import { FilterCard } from '../FilterCard/FilterCard';
import { DateInput } from '../../../../../../common/Inputs/DateInput/DateInput';
import styles from './DateFilter.module.scss';
import { Control, FieldValues, Path } from 'react-hook-form';

type DateFilterProps<T extends FieldValues> = {
  control: Control<T>;
};

const commonProps = {
  fontSize: '15px',
  size: 'small' as const,
  sx: { boxShadow: '3px 3px 0px 0px rgba(148, 148, 148, 0.267)' },
};

export const DateFilter = <T extends FieldValues>({ control }: DateFilterProps<T>) => {
  return (
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
};
