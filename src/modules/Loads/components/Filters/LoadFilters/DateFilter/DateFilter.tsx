import { FilterCard } from '../FilterCard/FilterCard';
import { DateInput } from '../../../../../../common/Inputs/DateInput/DateInput';
import styles from './DateFilter.module.scss';
import { Control, FieldValues, Path } from 'react-hook-form';

type DateFilterProps<T extends FieldValues> = {
  control: Control<T>;
};

export const DateFilter = <T extends FieldValues>({ control }: DateFilterProps<T>) => {
  return (
    <FilterCard filterName={'Date'}>
      <div className={styles['date-inputs']}>
        <fieldset className={styles['date-fieldset']}>
          <legend>Loading</legend>
          <span>Min</span>
          <DateInput
            fontSize='15px'
            size='small'
            control={control}
            name={'startLoadingDate' as Path<T>}
            label=''
          />
          <span>Max</span>
          <DateInput
            fontSize='15px'
            size='small'
            control={control}
            name={'endLoadingDate' as Path<T>}
            label=''
          />
        </fieldset>

        <div>
          <fieldset className={styles['date-fieldset']}>
            <legend>Unloading</legend>
            <span>Min</span>
            <DateInput
              fontSize='15px'
              size='small'
              control={control}
              name={'startUnloadingDate' as Path<T>}
              label=''
            />
            <span>Max</span>
            <DateInput
              fontSize='15px'
              size='small'
              control={control}
              name={'endUnloadingDate' as Path<T>}
              label=''
            />
          </fieldset>
        </div>
      </div>
    </FilterCard>
  );
};
