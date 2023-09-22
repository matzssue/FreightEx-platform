import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { FilterCard } from '../FilterCard/FilterCard';
import { DeepMap } from 'react-hook-form';
import { LoadsFiltersValues } from '../../../../../../utils/schemas/loadsFilters';
import { Fieldset } from 'src/common/Fieldset/Fieldset';
import { FilterInput } from '../FilterInput/FilterInput';
import styles from './TruckFilter.module.scss';
export type FieldErrors<TFieldValues extends FieldValues = FieldValues> = DeepMap<
  TFieldValues,
  FieldError
>;
export const TruckFilter = ({
  register,
  errors,
}: {
  register: UseFormRegister<LoadsFiltersValues>;
  errors: FieldErrors;
}) => {
  return (
    <FilterCard filterName={'Truck'}>
      <Fieldset>
        <FilterInput labelId='min-load-weight' label={'Min weight'}>
          <input
            id='min-load-weight'
            className={styles.input}
            placeholder='min'
            {...register('minWeight')}
            step='any'
            type='number'
          />
          {errors.minWeight && <p role='alert'>{errors.minWeight?.message}</p>}
        </FilterInput>
        <FilterInput labelId='max-load-weight' label={'Max weight'}>
          <input
            id='max-load-weight'
            className={styles.input}
            placeholder='max'
            {...register('maxWeight')}
            type='number'
          />
          {errors.maxWeight && <p role='alert'>{errors.maxWeight?.message}</p>}
        </FilterInput>
      </Fieldset>
      <Fieldset>
        <FilterInput labelId='min-load-length' label={'Min length'}>
          <input
            id='min-load-length'
            className={styles.input}
            placeholder='max'
            {...register('minLength')}
            type='number'
          />
          {errors.minLength && <p role='alert'>{errors.minLength?.message}</p>}
        </FilterInput>
        <FilterInput labelId='max-load-length' label={'Max length'}>
          <input
            id='max-load-length'
            className={styles.input}
            placeholder='max'
            {...register('maxLength')}
            type='number'
          />
          {errors.maxLength && <p role='alert'>{errors.maxLength?.message}</p>}
        </FilterInput>
      </Fieldset>
    </FilterCard>
  );
};
