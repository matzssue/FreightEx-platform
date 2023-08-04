import { AiOutlineClose } from 'react-icons/ai';
import styles from './LoadHeader.module.scss';

export const LoadHeader = ({ onClick }) => {
  return (
    <header className={styles.header}>
      <p>Add Load</p>
      <button onClick={onClick} className={styles.close}>
        <AiOutlineClose />
      </button>
    </header>
  );
};
