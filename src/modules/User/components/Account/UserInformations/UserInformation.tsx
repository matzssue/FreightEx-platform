import styles from './UserInformation.module.scss';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ChangeNameFormValue,
  ChangeSurnameFormValue,
  changeNameSchema,
  changeSurnameSchema,
} from '../../../../../utils/schemas/authSchema';
import { useUserContext } from '../../../../../store/contexts/UserContext';

type FormData = {
  name: string;
  surname: string;
};

type UserInformationProps = {
  label: string;
  value: string;
  isChangeable?: boolean;
  type?: 'name' | 'surname';
};

export const UserInformation = ({
  type,
  label,
  value,
  isChangeable = true,
}: UserInformationProps) => {
  const [open, setOpen] = useState(false);
  const { userData, changeUserField } = useUserContext();
  const schema = type === 'name' ? changeNameSchema : changeSurnameSchema;

  const defaultValues: FormData = {
    name: userData?.name || '',
    surname: userData?.surname || '',
  };

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<typeof defaultValues>({
    //@ts-ignore
    resolver: yupResolver<ChangeNameFormValue | ChangeSurnameFormValue>(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    if (type === 'name') {
      changeUserField('name', data.name);
      setValue('name', data.name);
    }
    if (type === 'surname') {
      changeUserField('surname', data.surname);
      setValue('surname', data.surname);
    }
    reset();
    setOpen(false);
  };

  return (
    <>
      <div className={styles.information}>
        <p>
          {label}: <span>{value}</span>
        </p>
        {isChangeable && (
          <button onClick={() => setOpen(true)}>
            <AiOutlineEdit />
          </button>
        )}

        {isChangeable && open && type && (
          <form className={styles['information-form']} onSubmit={handleSubmit(onSubmit)}>
            <label>Enter new {type === 'name' ? 'name' : 'surname'}</label>
            <input {...register(type)} type='text' />
            {errors[type] && <span className={styles.error}>{errors[type]?.message}</span>}
            <button className={styles['submit-button']} type='submit'>
              Save
            </button>
          </form>
        )}
      </div>
    </>
  );
};
