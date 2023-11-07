import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEdit } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserContext } from 'src/store/contexts/UserContext';
import { updateUserField } from 'src/utils/api/supabase/User/updateUserField';
import {
  ChangeNameFormValue,
  changeNameSchema,
  ChangeSurnameFormValue,
  changeSurnameSchema,
} from 'src/utils/schemas/authSchema';

import styles from './UserInformation.module.scss';

type FormData = {
  name: string;
  surname: string;
};

type UserInformationProps = {
  isChangeable?: boolean;
  label: string;
  type?: 'name' | 'surname';
  value: string;
};

export const UserInformation = ({
  type,
  label,
  value,
  isChangeable = true,
}: UserInformationProps) => {
  const [open, setOpen] = useState(false);

  const { changeUserInformations, userData } = useUserContext();

  const schema = type === 'name' ? changeNameSchema : changeSurnameSchema;

  const defaultValues: FormData = {
    name: userData?.name || '',
    surname: userData?.surname || '',
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    //@ts-ignore
    resolver: yupResolver<ChangeNameFormValue | ChangeSurnameFormValue>(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    if (type === 'name') {
      changeUserInformations(updateUserField, 'name', data.name);
      setValue('name', data.name);
    }

    if (type === 'surname') {
      changeUserInformations(updateUserField, 'surname', data.surname);
      setValue('surname', data.surname);
    }

    setOpen(false);
  };

  return (
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
          <button type='button' className={styles['submit-button']} onClick={() => setOpen(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};
