import { NavLink } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './CloseButton.module.scss';
export const CloseButton = ({ closeLink }: { closeLink: string }) => {
  return (
    <NavLink className={styles['close-button']} to={closeLink}>
      <AiOutlineClose />
    </NavLink>
  );
};
