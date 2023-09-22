import supabase from '../../../../config/supabase';

export const getAllCompanies = async () => {
  const { data: companiesData, error } = await supabase.from('companies').select('*');
  if (error) throw new Error();

  return companiesData;
};
