import { useUserContext } from '../../store/contexts/UserContext';

import { getCompany } from '../../utils/api/supabase/Company/getCompany';

import styles from './UserAccount.module.scss';
import { useQuery } from '@tanstack/react-query';
import { CloseButton } from '../../common/Buttons/CloseButton';
import { UserInformation } from './UserInformation';

import { EditAccount } from './EditAccount';
import { avatarLink } from '../../constants/avatarLink';

export const UserAccount = () => {
  const { userData } = useUserContext();

  if (!userData) return;
  // const [isOpen, setIsOpen] = useState(false);
  // const [currentOption, setCurrentOption] = useState('');
  const { avatar, name, surname, company_vat_id } = userData;

  const { data: company, isLoading } = useQuery(
    ['companies', company_vat_id],
    async () => await getCompany(company_vat_id),
  );

  if (isLoading || !company) return <div>loading...</div>;
  const { name: companyName, vat_id } = company;
  // const { avatar, name, surname, email } = userData;
  console.log(userData);

  // const { handleSubmit, control } = useForm({defaultValues:});

  const handleChangeInformation = () => {
    console.log('check');
  };

  // const onSubmit = (e) => {};
  return (
    <>
      {/* <Dialog
        aria-describedby={`change-${currentOption}-dialog`}
        draggable={true}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <>
            <DialogTitle>Change password </DialogTitle>
            <form className={styles['password-form']} onSubmit={handleSubmit(onSubmit)}>
              <TextFieldInput
                defaultValue={currentOption}
                name={currentOption}
                label={'New Password'}
                control={control}
              />

              <div className={styles.buttons}>
                <button type='button' onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type='submit'>Confirm</button>
              </div>
            </form>
          </>
        </DialogContent>
      </Dialog> */}
      <section className={styles['container']}>
        <div className={styles['account-container']}>
          <div className={styles.header}>
            <CloseButton closeLink={'/loads'} />
            <h1>Account Settings</h1>
          </div>
          <h2>
            {name} {surname}
          </h2>
          <img
            className={styles.avatar}
            height={'150px'}
            width={'150px'}
            src={`${avatarLink}${avatar}`}
          />
          <EditAccount />

          <div className={styles.informations}>
            <UserInformation label='Name' value={name} />
            <UserInformation label='Surname' value={surname} />
            <UserInformation
              handleChange={handleChangeInformation}
              isButton={false}
              label='Company'
              value={companyName}
            />
            <UserInformation
              handleChange={handleChangeInformation}
              isButton={false}
              label='Company VATID'
              value={vat_id}
            />
          </div>
        </div>
      </section>
    </>
  );
};
