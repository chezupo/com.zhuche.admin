import React, {useState} from "react";
import {Alert, Button, Col, Modal, Row, Spin} from "antd";
import TableRender from "@/pages/Coupon/Coupon/TableRender";
import {createUserCoupon} from "@/api/userCoupon";
import {successMessage} from "@/util/messageUtil";
import {size} from "@/pages/User/components/config";
import Permission from "@/components/Permission";

type CouponModalType = {
  id: number
  nickname?: string
  onSuccess: () => void
}
const CouponModal: React.FC<CouponModalType> = props => {
  const [visible, setVisible] = useState<boolean>(false)
  const [keys, setKeys] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const handleCreateUserCoupon = () => {
    setLoading(true)
    createUserCoupon(props.id, keys).then(() => {
      successMessage()
      setVisible(false)
      props.onSuccess();
    }).finally(() => setLoading(false) )
  }

  return (<>
    <Permission roles={['ROLE_ADMIN']}>
      <Button onClick={() => setVisible(true)}
              size={size}
      >赠送优惠券</Button>
    </Permission>
    <Modal
      title={`赠送${props.nickname || ''}优惠券${ keys.length ? '(' + keys.length + '张)' : ''}`}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={'80%'}
    >
      <Spin spinning={loading}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Alert
              message="请选择赠送给用户的优惠卷"
              type="info"
              closable
            />
          </Col>

          <Col span={24}>
            <TableRender
              isSelectKey
              onChange={setKeys}
            />
          </Col>
          <Col span={24}>
            <Row justify='center' gutter={[12, 0]}>
              <Col>
                <Button onClick={() => setVisible(false)}>取消</Button>
              </Col>
              <Col>
                <Button
                  size={size}
                  type='primary'
                  disabled={!keys.length}
                  onClick={handleCreateUserCoupon}
                >赠送{`${keys.length}张`}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Modal>
  </>)
}

export default CouponModal
