import React from "react";
import {Button, Col, Popconfirm, Row} from "antd";

type ActionFieldRenderPropsType = {
  order: OrderItemType
  onCarPickup: () => void
}

const ActionFieldRender: React.FC<ActionFieldRenderPropsType> = props => {

  return (<>
    <Row gutter={[12, 12]}>
      {
        props.order.status === 'CAR_PICKUP_IN_PROGRESS' && (
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
    </Row>
  </>)
}

export default ActionFieldRender
