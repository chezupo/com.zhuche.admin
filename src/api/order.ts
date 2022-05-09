import {get, post, put} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

export type OrderPageType = PageType<OrderItemType>

export type CreateViolationQueryType = Omit<ViolationItemType, 'id'>

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

/**
 * 创建违章记录
 * @param orderId
 * @param query
 */
const createViolation = async (orderId: number, query: CreateViolationQueryType) => {
  return await post<ViolationItemType>(`/orders/${orderId}/violation`, query)
}

/**
 * 解冻订单
 * @param orderId
 * @param query
 */
const unfreezeOrder = async (orderId: number) => {
  return await put<ViolationItemType>(`/orders/${orderId}/status/unfreeze`)
}

export {
  getOrders,
  confirmPickUpCar,
  confirmFinished,
  createViolation,
  unfreezeOrder
}
