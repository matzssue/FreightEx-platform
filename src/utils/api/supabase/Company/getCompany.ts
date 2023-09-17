import supabase from '../../../../config/supabase';

export const getCompany = async (id: string) => {
  const { data: companyData, error } = await supabase
    .from('companies')
    .select('*')
    .eq('vat_id', id)
    .single();
  if (error) throw new Error();

  return companyData;
};
