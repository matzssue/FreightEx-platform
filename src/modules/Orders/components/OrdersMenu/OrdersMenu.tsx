import { NavLink } from 'react-router-dom';

import styles from './OrdersMenu.module.scss';

export const OrdersMenu = () => (
  <>
    <div className={styles['orders-menu__container']}>
      <header>
        <h1>ORDERS</h1>
      </header>
      <ul id='select-orders'>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? styles.active : ''
            }
            to='/orders/published'
          >
            Published
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? styles.active : ''
            }
            to='/orders/received'
          >
            Received
          </NavLink>
        </li>
      </ul>
    </div>
  </>
);
