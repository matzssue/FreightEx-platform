import { SyntheticEvent } from 'react';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { useAppSelector } from '../../store/hooks';
export const ConfirmStep = () => {
  const { user, company } = useAppSelector((state) => state.register);
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };
  const { name, surname, imgUrl, email } = user;
  const { companyName, vatId } = company;
  return (
    <AuthFormWrapper hideLogo={true} onSubmit={onSubmit}>
      <div>
        <h2>User</h2>
        <p>
          Fullname:{' '}
          <span>
            {name} {surname}
          </span>
        </p>
        <p>
          Image: <img width={10} height={10} src={imgUrl} alt='User Image' />
        </p>
        <p>Email: {email}</p>
      </div>
      <div>
        <h2>Company</h2>
        <p>
          Name: <span>{companyName}</span>
        </p>
        <p>
          Vat ID: <span>{vatId}</span>
        </p>
      </div>

      <button type='submit'>Register</button>
    </AuthFormWrapper>
  );
};
