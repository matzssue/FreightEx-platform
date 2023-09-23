import { LoadingSpinner } from '../../../../common/LoadingSpinner/LoadingSpinner';
import styles from './JoyrideLoader.module.scss';
export const JoyrideLoader = () => {
  return (
    <div className={styles['joyride-background']}>
      <div className={styles['joyride-loader']}>
        <LoadingSpinner />
        <p>Loading guide... please wait</p>
      </div>
    </div>
  );
};
