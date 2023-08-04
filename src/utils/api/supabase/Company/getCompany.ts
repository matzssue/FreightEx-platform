import supabase from '../../../../config/supabase';

export const getCompany = async (id: string) => {
  console.log(id);
  const { data: companyData, error } = await supabase
    .from('companies')
    .select('*')
    .eq('vat_id', id)
    // .returns<GetLoadsData[]>()
    .single();
  if (error) throw new Error();
  console.log(companyData);
  //   const loads = {
  //     id: loadData.id,
  //     loadingAddress: loadData.loading_address_id,
  //     unloadingAddress: loadData.unloading_address_id,
  //     loadingDate: loadData.loading_date,
  //     unloadingDate: loadData.unloading_date,
  //     vehicleTypes: loadData.vehicle_types,
  //     cargoLength: loadData.length,
  //     cargoWeight: loadData.weight,
  //     term: loadData.term,
  //     price: loadData.price,
  //     currency: loadData.currency,
  //   };
  return companyData;
};
