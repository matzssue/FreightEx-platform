import styles from './FiltersDetails.module.scss';

export const FilterDetails = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>Weight: from 1T to 6T</li>
        <li>Length: from 1ldm to 7ldm</li>
        <li>Type:pallets</li>
      </ul>
    </div>
  );
};
