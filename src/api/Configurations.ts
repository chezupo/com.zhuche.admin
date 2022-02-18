import {get} from "@/util/httpClient";

export type ConfigurationType = {
  imgPrefix: string
}
export const getConfiguration = async (): Promise<ConfigurationType> => await get<ConfigurationType>("/configuration")
