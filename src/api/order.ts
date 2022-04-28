import {get} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

export type OrderPageType = PageType<OrderItemType>

/**
 * 获取订单分页
 */
const getOrders = async (): Promise< OrderPageType> => {
  return await get<OrderPageType>(`/orders`, getPageQuery() )
}

export {getOrders}
