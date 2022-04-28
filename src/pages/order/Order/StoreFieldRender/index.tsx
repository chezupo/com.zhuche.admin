import React from "react";
import {Col, Popover, Row} from "antd";
import DetailRowRender from "@/pages/order/Order/components/DetailRowRender";

type StoreFieldRenderPropsType = {
  data: StoreItemType
}
const StoreFieldRender: React.FC<StoreFieldRenderPropsType> = props => {
  const store = props.data
  return (
    <Popover placement="top" title='门店详情' content={
        <Row>
          <DetailRowRender label='店名'>{store.name}</DetailRowRender>
          <DetailRowRender label='电话'>{store.servicePhone}</DetailRowRender>
          <DetailRowRender label='地址'>{store.address}</DetailRowRender>
        </Row>
    }>
      <a>{props.data.name}</a>
    </Popover>
    )
}

export default StoreFieldRender
