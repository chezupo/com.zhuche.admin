import React, {useState} from "react";
import {Button, Modal, Spin} from "antd";
import FormRender, {FormType} from "@/pages/Coupon/Coupon/FormRender";
import {createCoupon} from "@/api/coupon";
import {successMessage} from "@/util/messageUtil";

type AddModalRenderPropsType = {
  onSuccess: () => void
}
const AddModalRender: React.FC<AddModalRenderPropsType> = props => {
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = (newValue: FormType) => {
    setLoading(true)
    createCoupon(newValue).then(() => {
      successMessage()
      props.onSuccess()
      setVisible(false)
    }).finally(() => setLoading(false))
  }
  return (
    <>
      <Spin spinning={loading}>
        <Button style={{width: '100%'}} type='dashed' onClick={() => setVisible(true)} >创建</Button>
        <Modal
          title={'创建优惠卷'}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          width='50%'
        >
          <FormRender
            onFinish={handleFinish}
            onCancel={() => setVisible(false)}
          />
        </Modal>
      </Spin>
    </>
  )
}

export default AddModalRender
