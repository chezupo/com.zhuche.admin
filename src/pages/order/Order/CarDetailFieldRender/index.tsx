import React from "react";
import {Popover, Row} from "antd";
import DetailRowRender from "@/pages/order/Order/components/DetailRowRender";


type CarDetailFieldRenderPropsType = {
  car: CarItemType
}
const CarDetailFieldRender: React.FC<CarDetailFieldRenderPropsType> = props => {
  const car = props.car
  return (<>

    <Popover placement="top" title='汽车详情' content={
      <Row>
        <DetailRowRender label='名称'>{car.name}</DetailRowRender>
        <DetailRowRender label='归属门店'> {car.store.name}</DetailRowRender>
        <DetailRowRender label='门店电话'> {car.store.servicePhone}</DetailRowRender>
        <DetailRowRender label='门店地址'> {car.store.address}</DetailRowRender>
      </Row>
    }>
      <a>查看详情</a>
    </Popover>


  </>)
}

export default CarDetailFieldRender
