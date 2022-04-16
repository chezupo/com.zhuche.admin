import React, {useState} from "react";
import {Modal, Spin} from "antd";
import FormRender, {FormType} from "./FormRender";
import {createCoupon, updateCoupon} from "@/api/coupon";
import {successMessage} from "@/util/messageUtil";

type EditRenderPropsType = {
  data?: CouponItemType
  onSuccess: (newValue: CouponItemType) => void
  onCancel: () => void
}

const EditRender: React.FC<EditRenderPropsType> = props => {
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = (newValue: FormType) => {
    setLoading(true)
    updateCoupon(props.data!.id, newValue).then(res => {
      successMessage()
      props.onSuccess(res)
    }).finally(() => setLoading(false))
  }
  return (<>
    <Modal
      title='编辑优惠券'
      visible={!!props.data}
      onCancel={() => props.onCancel()}
      width='50%'
      footer={null}
    >
      <Spin spinning={loading}>
        {
          props.data && <FormRender
            onFinish={handleFinish}
            onCancel={props.onCancel}
            data={props.data}
          />
        }
      </Spin>
    </Modal>
  </>)
}

export default EditRender
