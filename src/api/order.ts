import { deleteRequest, get, post, put } from '@/util/httpClient';
import { getPageQuery } from '@/util/paginationUtil';
import {
  RenewFormType,
  RenewingFormValueType,
} from '@/pages/order/Order/ActionFieldRender';

export type OrderPageType = PageType<OrderItemType>;

export type ConfirmPickerCarType = {
  contract: string;
};

export type CreateViolationQueryType = Omit<ViolationItemType, 'id'>;

/**
 * 获取订单分页
 */
const getOrders = async (): Promise<OrderPageType> => {
  return await get<OrderPageType>(`/orders`, getPageQuery());
};

/**
 * 确认取车
 * @param id
 */
const confirmPickUpCar = async (id: number, data: ConfirmPickerCarType) =>
  await put<OrderItemType>(`/orders/${id}/status/using`, data);

/**
 * 确认还车
 * @param id
 */
const confirmFinished = async (id: number) =>
  await put<OrderItemType>(`/orders/${id}/status/finished`);

/**
 * 创建违章记录
 * @param orderId
 * @param query
 */
const createViolation = async (
  orderId: number,
  query: CreateViolationQueryType
) => {
  return await post<ViolationItemType>(`/orders/${orderId}/violation`, query);
};

/**
 * 解冻订单
 * @param orderId
 * @param query
 */
const unfreezeOrder = async (orderId: number) => {
  return await put<ViolationItemType>(`/orders/${orderId}/status/unfreeze`);
};

/**
 * 续租订单
 * @param orderId
 * @param query
 */
const renewingOrder = async (orderId: number, data: RenewingFormValueType) => {
  return await put<ViolationItemType>(
    `/orders/${orderId}/status/renewing`,
    data
  );
};

/**
 * 删除订单
 * @param id
 */
const deleteOrder = async (id: number) =>
  await deleteRequest<void>(`/orders/${id}`);

export {
  getOrders,
  confirmPickUpCar,
  confirmFinished,
  createViolation,
  unfreezeOrder,
  renewingOrder,
  deleteOrder,
};
