import { FilterCard } from './FilterCard';
import styles from './TruckFilter.module.scss';

export const TruckFilter = ({ register, errors }) => {
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
          <input placeholder='max' {...register('maxWeight')} type='text' />
          {errors.maxWeight && <p role='alert'>{errors.maxWeight?.message}</p>}
        </div>
      </fieldset>
      <fieldset className={styles['truck-inputs']}>
        <legend>Length(m)</legend>
        <div className={styles.inputs}>
          {/* <label htmlFor='minLength'>Min</label> */}
          <input placeholder='max' {...register('minLength')} type='text' />
          {errors.minLength && <p role='alert'>{errors.minLength?.message}</p>}
        </div>
        -
        <div className={styles.inputs}>
          {/* <label htmlFor='maxLength'>Max</label> */}
          <input placeholder='max' {...register('maxLength')} type='text' />
          {errors.maxLength && <p role='alert'>{errors.maxLength?.message}</p>}
        </div>
      </fieldset>
    </FilterCard>
  );
};
