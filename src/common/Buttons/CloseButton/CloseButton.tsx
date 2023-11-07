import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import styles from './CloseButton.module.scss';
export const CloseButton = ({ closeLink }: { closeLink: string }) => (
  <NavLink className={styles['close-button']} to={closeLink}>
    <AiOutlineClose />
  </NavLink>
);
