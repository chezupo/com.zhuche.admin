import {get, patch} from "@/util/httpClient";

export type ConfigurationType = {
  imgPrefix: string
  appName: string
  logo: string
  amapKey: string
}

export const getConfiguration = async (): Promise<ConfigurationType> => await get<ConfigurationType>("/configuration")

export type UpdateConfigurationType =  Omit<ConfigurationType, 'imgPrefix'>
export const updateConfiguration = async (data: UpdateConfigurationType): Promise<ConfigurationType> =>
  await patch<ConfigurationType>("/configuration", data)
