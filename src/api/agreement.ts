import {patch} from "@/util/httpClient";
import {ConfigurationType} from "@/api/Configurations";

export type UpdateAgreementQueryType = {
  orderAgreement: string
  insuranceAgreement: string
}
const updateAgreement = async (query: UpdateAgreementQueryType): Promise<ConfigurationType> => {
  return await patch<ConfigurationType>(`/configuration/orderAgreements`, query);
}

export {updateAgreement}
