import styles from './OrdersColumns.module.scss';

export interface OrdersColumnsProps {
  columns: string[];
  gridColumns: string;
}

export const OrdersColumns = ({ columns, gridColumns }: OrdersColumnsProps) => {
  const columnListStyle = {
    gridTemplateColumns: gridColumns,
  };

  return (
    <ul className={styles['orders-columns__list']} style={columnListStyle}>
      {columns.map((column, i) => {
        return <li key={i}>{column}</li>;
      })}
    </ul>
  );
};
