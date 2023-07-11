import { FilterCard } from './FilterCard';
import { DateInput } from '../../../../common/Inputs/DateInput';
import styles from './DateFilter.module.scss';
export const DateFilter = ({ control }) => {
  return (
    <FilterCard filterName={'Date'}>
      <div className={styles['date-inputs']}>
        <fieldset className={styles['date-fieldset']}>
          <legend>Loading</legend>
          <label htmlFor='loadingDate'>Min</label>
          <DateInput
            fontSize='15px'
            size='small'
            control={control}
            name='startLoadingDate'
            label=''
          />
          <label htmlFor='loadingDate'>Max</label>
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
            <label htmlFor='startUnloadingDate'>Min</label>
            <DateInput
              fontSize='15px'
              size='small'
              control={control}
              name='startUnloadingDate'
              label=''
            />
            <label htmlFor='endUnloadingDate'>Max</label>
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
