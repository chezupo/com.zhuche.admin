const orderStatusMapChinese: Record<OrderStatusType, string> = {
  CREDITING :  '信用授权中',
  PAYING :  '待支付',
  CAR_PICKUP_IN_PROGRESS :  '待取车',
  USING :  '使用中',
  OVERTIME :  '用车超时',
  RETURNING :  '还车中',
  FINISHED :  '已完成',
  RENEWED :  '已续约',
  CANCELED: '已取消'
}

export {orderStatusMapChinese}
