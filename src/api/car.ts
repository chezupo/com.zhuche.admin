import {get, patch, post} from "@/util/httpClient";

export type CreateQueryType = Omit<CarItemType, 'id'>

export type FetchCarsQueryType = {
  page: number
  size: number
}

const createCar = async (query: CreateQueryType): Promise<CarItemType> => {
  const {brandSeries, configs,  ...other} = query

  return await post<CarItemType>('/cars', {...other, seriesId: brandSeries.id, configIds: configs.map((el): number => el.id )})
}

const updateCar = async (query: CarItemType): Promise<CarItemType> => {
  const {brandSeries, configs,  ...other} = query

  return await patch<CarItemType>(`/cars/${query.id}`, {...other, seriesId: brandSeries.id, configIds: configs.map((el): number => el.id )})
}

const fetchCars = async (query: FetchCarsQueryType): Promise<PageType<CarItemType>> => {
  return await get<PageType<CarItemType>>('/cars', query);
}

export {createCar, fetchCars, updateCar}
