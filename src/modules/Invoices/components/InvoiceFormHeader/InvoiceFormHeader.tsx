import styles from './InvoiceFormHeader.module.scss';

type InvoiceFormHeaderProps = {
  title: string;
  onClose: () => void;
};

export const InvoiceFormHeader = ({ onClose, title }: InvoiceFormHeaderProps) => {
  return (
    <header className={styles['invoice-form__header']}>
      <h2>{title}</h2>
      <button type='button' onClick={onClose} className={styles['close-button']}>
        X
      </button>
    </header>
  );
};
