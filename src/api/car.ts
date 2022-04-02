import {post} from "@/util/httpClient";

export type CreateQueryType = Omit<CarItemType, 'id'>

const createCar = async (query: CreateQueryType): Promise<CarItemType> => {
  return await post<CarItemType>('/cars', query)
}

export {createCar}
