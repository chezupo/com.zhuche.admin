import {get, patch} from "@/util/httpClient";
import {ConfigurationType} from "@/api/Configurations";

export type UpdateAgreementQueryType = {
  orderAgreement: string
  insuranceAgreement: string
}
export type UpdateAgreementByIdQueryType = {
  title: string
  content: string
}
const updateAgreement = async (query: UpdateAgreementQueryType): Promise<ConfigurationType> => {
  return await patch<ConfigurationType>(`/configuration/orderAgreements`, query);
}

const getCheckoutAgreements = async (): Promise<AgreementItemType[]>  => {
  return await get<AgreementItemType[]>('/agreements/checkoutOrderAgreements')
}

const updateAgreementById =  async (id: number, query: UpdateAgreementByIdQueryType): Promise<AgreementItemType> => {
  return await patch<AgreementItemType>(`/agreements/${id}`, query)
}

export {updateAgreement, getCheckoutAgreements, updateAgreementById}
