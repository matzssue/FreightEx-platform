import { useFormContext } from 'react-hook-form';

import { TextFieldInput } from '../../../../../common/Inputs/TextField/TextFieldInput';

export const CompanyStep = () => {
  const { control } = useFormContext();
  return (
    <>
      <TextFieldInput
        defaultValue={''}
        label={'Company name'}
        control={control}
        name='companyName'
        column={true}
      />
      <TextFieldInput
        defaultValue={''}
        label={'VATID'}
        control={control}
        name='vatId'
        column={true}
      />
    </>
  );
};
