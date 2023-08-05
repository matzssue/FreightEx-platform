import { useFormContext } from 'react-hook-form';

import { TextFieldInput } from '../../common/Inputs/TextFieldInput';

export const CompanyStep = () => {
  const { control } = useFormContext();
  return (
    <>
      <TextFieldInput
        defaultValue={''}
        label={'Company name'}
        control={control}
        name='companyName'
        row={true}
      />
      <TextFieldInput defaultValue={''} label={'VATID'} control={control} name='vatId' row={true} />
    </>
  );
};
