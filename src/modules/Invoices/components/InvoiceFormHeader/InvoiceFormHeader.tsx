import styles from './InvoiceFormHeader.module.scss';

type InvoiceFormHeaderProps = {
  onClose: () => void;
  title: string;
};

export const InvoiceFormHeader = ({ onClose, title }: InvoiceFormHeaderProps) => (
  <header className={styles['invoice-form__header']}>
    <h2>{title}</h2>
    <button type='button' onClick={onClose} className={styles['close-button']}>
      X
    </button>
  </header>
);
