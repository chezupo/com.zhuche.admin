import {get, put} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

export type OrderPageType = PageType<OrderItemType>

/**
 * 获取订单分页
 */
const getOrders = async (): Promise< OrderPageType> => {
  return await get<OrderPageType>(`/orders`, getPageQuery() )
}

/**
 * 确认取车
 * @param id
 */
const confirmPickUpCar = async (id: number) => await put<OrderItemType>(`/orders/${id}/status/using`)

/**
 * 确认还车
 * @param id
 */
const confirmFinished = async (id: number) => await put<OrderItemType>(`/orders/${id}/status/finished`)

export {getOrders, confirmPickUpCar, confirmFinished}
