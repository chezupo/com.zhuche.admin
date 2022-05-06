import React from "react";
import {Button, Col, Popconfirm, Row} from "antd";
import {isAdmin} from "@/util/AuthUtil";
import {useAppSelector} from "@/store/hooks";

type ActionFieldRenderPropsType = {
  order: OrderItemType
  onCarPickup: () => void
  onFinishedOrder: (value: OrderItemType) => void
}

const ActionFieldRender: React.FC<ActionFieldRenderPropsType> = props => {
  let isAllowFinishedOrder = false;
  const me = useAppSelector(state => state.me)
  if ( isAdmin() ) {
    isAllowFinishedOrder = true
  } else {
    isAllowFinishedOrder = props.order.endStore.id === me.store!.id
  }
  let isAllowPickUpCar = false
  if (isAdmin()) {
    isAllowPickUpCar = true;
  } else {
    isAllowPickUpCar = props.order.startStore.id === me.store!.id
  }

  return (<>
    <Row gutter={[12, 12]}>
      {
        props.order.status === 'CAR_PICKUP_IN_PROGRESS' && isAllowPickUpCar && (
          <Col>
            <Popconfirm
              title='是否要确认用户已经取到车了?'
              onConfirm={() => props.onCarPickup()}
              okText='确定'
              cancelText='取消'
            >
              <Button type='primary'>确认取车</Button>
            </Popconfirm>
          </Col>
        )
      }
      {
        props.order.status === 'RETURNING' && isAllowFinishedOrder && (
          <Col>
            <Popconfirm
              title='是否要确认车子已经到达门店?'
              onConfirm={() => props.onFinishedOrder(props.order)}
              okText='确定'
              cancelText='取消'
            >
              <Button type='primary' danger>确认还车</Button>
            </Popconfirm>
          </Col>
        )
      }
    </Row>
  </>)
}

export default ActionFieldRender
