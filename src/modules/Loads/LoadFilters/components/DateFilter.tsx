import { FilterCard } from './FilterCard';
import { DateInput } from '../../../../common/Inputs/DateInput';
import styles from './DateFilter.module.scss';
export const DateFilter = ({ control }) => {
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
            name='startLoadingDate'
            label=''
          />
          <span>Max</span>
          <DateInput
            fontSize='15px'
            size='small'
            control={control}
            name='endLoadingDate'
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
              name='startUnloadingDate'
              label=''
            />
            <span>Max</span>
            <DateInput
              fontSize='15px'
              size='small'
              control={control}
              name='endUnloadingDate'
              label=''
            />
          </fieldset>
        </div>
      </div>
    </FilterCard>
  );
};
