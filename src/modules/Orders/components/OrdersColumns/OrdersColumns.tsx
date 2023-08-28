import styles from './OrdersColumns.module.scss';

export const OrdersColumns = ({ columns }: { columns: string[] }) => {
  return (
    <thead>
      <tr className={styles['orders-columns__list']}>
        {columns.map((column, i) => {
          return <th key={i}>{column}</th>;
        })}
      </tr>
    </thead>
  );
};
