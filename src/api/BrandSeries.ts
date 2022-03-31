import {post} from "@/util/httpClient";

const createBrandSeries = async (brandId: number, requestBody: {name: string}): Promise<BrandSeriesItemType> => {
  return await post<BrandSeriesItemType>(`/brands/${brandId}/series`, requestBody)
}

export {createBrandSeries}
