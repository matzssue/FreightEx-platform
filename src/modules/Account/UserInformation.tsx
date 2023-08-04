import { AiOutlineEdit } from 'react-icons/ai';
import styles from './UserInformation.module.scss';
type UserInformationProps = {
  label: string;
  value: string;
  isButton?: boolean;
  handleChange?: any;
};

export const UserInformation = ({
  label,
  value,
  isButton = true,
  handleChange,
}: UserInformationProps) => {
  return (
    <div className={styles.information}>
      <p>
        {label}: <span>{value}</span>
      </p>
      {isButton && (
        <button id={value} onClick={handleChange}>
          <AiOutlineEdit />
        </button>
      )}
    </div>
  );
};
