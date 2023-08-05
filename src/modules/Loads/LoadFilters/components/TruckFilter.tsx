import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { FilterCard } from './FilterCard';
import styles from './TruckFilter.module.scss';
import { DeepMap } from 'react-hook-form';
import { LoadsFiltersValues } from '../../../../utils/schemas/loadsFilters';

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
      <fieldset className={styles['truck-inputs']}>
        <legend>Weight(t)</legend>
        <div className={styles.inputs}>
          {/* <label htmlFor='minWeight'></label> */}
          <input placeholder='min' {...register('minWeight')} step='any' type='number' />
          {errors.minWeight && <p role='alert'>{errors.minWeight?.message}</p>}
        </div>
        -
        <div className={styles.inputs}>
          {/* <label htmlFor='maxWeight'>Max</label> */}
          <input placeholder='max' {...register('maxWeight')} type='number' />
          {errors.maxWeight && <p role='alert'>{errors.maxWeight?.message}</p>}
        </div>
      </fieldset>
      <fieldset className={styles['truck-inputs']}>
        <legend>Length(m)</legend>
        <div className={styles.inputs}>
          {/* <label htmlFor='minLength'>Min</label> */}
          <input placeholder='max' {...register('minLength')} type='number' />
          {errors.minLength && <p role='alert'>{errors.minLength?.message}</p>}
        </div>
        -
        <div className={styles.inputs}>
          {/* <label htmlFor='maxLength'>Max</label> */}
          <input placeholder='max' {...register('maxLength')} type='number' />
          {errors.maxLength && <p role='alert'>{errors.maxLength?.message}</p>}
        </div>
      </fieldset>
    </FilterCard>
  );
};
