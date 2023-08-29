import supabase from '../../../../config/supabase';

export const getCompany = async (id: string) => {
  console.log(id);
  const { data: companyData, error } = await supabase
    .from('companies')
    .select('*')
    .eq('vat_id', id)
    .single();
  if (error) throw new Error();
  console.log(companyData);

  return companyData;
};
