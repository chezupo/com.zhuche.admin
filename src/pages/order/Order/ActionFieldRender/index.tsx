import React, {useState} from "react";
import {Alert, Button, Col, Form, FormInstance, Image, Input, Modal, Popconfirm, Row} from "antd";
import {isAdmin} from "@/util/AuthUtil";
import {useAppSelector} from "@/store/hooks";
import UploadMultipleImg from "@/components/UploadMultipleImg";
import FormRender from "@/pages/order/Order/ActionFieldRender/FormRender";
import RenewingForm from "@/pages/order/Order/ActionFieldRender/RenewingForm";
import renewingForm from "@/pages/order/Order/ActionFieldRender/RenewingForm";

type RenewingFormValueType = {days: number}
type RenewFormType = FormInstance<RenewingFormValueType>
type ActionFieldRenderPropsType = {
  order: OrderItemType
  onCarPickup: () => void
  onFinishedOrder: (value: OrderItemType) => void
  onSuccessViolation: () => void
  onUnfreeze: () => void
  onRenewing: (form: RenewFormType) => Promise<boolean>
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
  if (props.order.status === 'FINISHED' ) {
    if (isAdmin()) {
      isAccessViolate =  true
    } else {
      isAccessViolate = props.order.endStore.id === me.store!.id
    }
  }
  const [violateOrder, setViolateOrder] = useState<OrderItemType | undefined>()
  let isAccessFreeze = false
  if (props.order.status === 'FINISHED' && props.order.unfreezeAmount > 0) {
    if (isAdmin()) {
      isAccessFreeze =  true
    } else {
      isAccessFreeze = props.order.endStore.id === me.store!.id
    }
  }
  const [renewingForm] = Form.useForm<RenewingFormValueType>();

  return (<>
    <Row gutter={[12, 12]}>
      {
        props.order.status === 'CAR_PICKUP_IN_PROGRESS' && isAllowPickUpCar && (
          <Col>
            <Button
              type='primary'
              onClick={props.onCarPickup}
            >确认取车</Button>
          </Col>
        )
      }
      {
        [ 'USING', 'OVERTIME'].findIndex(e => e === props.order.status) !== -1 && isAllowFinishedOrder && (
          <Col>
            <Popconfirm
              title= {props.order.status == 'USING' ? '用户还在用车中，您是否要强制还车' : '是否要确认车子已经到达门店?'}
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
        [ 'USING', 'OVERTIME'].findIndex(e => e === props.order.status) !== -1 && (
          <Col>
            <Popconfirm
              title= {<RenewingForm  form={renewingForm}/>}
              onConfirm={() => props.onFinishedOrder(props.order)}
              okButtonProps={{onClick: () => props.onRenewing(renewingForm)}}
              okText='确定'
              cancelText='取消'
            >
              <Button type='primary' >续租</Button>
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
      {
        isAccessFreeze && (
          <Col>
            <Popconfirm
              title='您是否要解冻该订单的保证金'
              onConfirm={() => props.onUnfreeze()}
              okText='确定'
              cancelText='取消'
            >
              <Button
                type='primary'
                danger
              >解冻保证金</Button>
            </Popconfirm>
          </Col>
        )
      }
    </Row>
    <Modal
      title={'添加违章'}
      visible={!!violateOrder}
      onCancel={() => setViolateOrder(undefined)}
      footer={null}
    >
      {violateOrder && ( <FormRender
        order={violateOrder}
        onCanceled={() => setViolateOrder(undefined)}
        onSucceeded={() => {
          setViolateOrder(undefined);
          props.onSuccessViolation()
        }}
      /> )}
    </Modal>
  </>)
}

export type {
  RenewingFormValueType,
  RenewFormType
}
export default ActionFieldRender
