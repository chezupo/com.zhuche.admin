import React, {useState} from "react";
import {Button, Col, Form, Image, Input, Modal, Popconfirm, Row} from "antd";
import {isAdmin} from "@/util/AuthUtil";
import {useAppSelector} from "@/store/hooks";
import UploadMultipleImg from "@/components/UploadMultipleImg";
import FormRender from "@/pages/order/Order/ActionFieldRender/FormRender";

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
  let isAccessViolate = false;
  if (props.order.status === 'FINISHED') {
    if (isAdmin()) {
      isAccessViolate = true;
    } else {
      isAccessViolate = props.order.endStore.id === me.store!.id
    }
  }
  const [violateOrder, setViolateOrder] = useState<OrderItemType | undefined>()

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
      {
         isAccessViolate && (
          <Col>
            <Button
              type='primary'
              danger
              onClick={() => setViolateOrder(props.order)}
            >添加违章</Button>
          </Col>
        )
      }
    </Row>
    <Modal
      title={'添加违章'}
      visible={!!violateOrder}
      footer={null}
    >
      {violateOrder && ( <FormRender
        order={violateOrder}
        onCanceled={() => setViolateOrder(undefined)}
        onSucceeded={() => setViolateOrder(undefined)}
      /> )}
    </Modal>
  </>)
}

export default ActionFieldRender
