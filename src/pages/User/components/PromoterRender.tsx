import React, {useState} from "react";
import {Button, Col, Popconfirm, Spin} from "antd";
import {isPromoter} from "@/util/AuthUtil";
import {getUser, setUserPromoter, unsetUserPromoter} from "@/api/users";
import {successMessage} from "@/util/messageUtil";

type PromoterRenderPropsType = {
  id: number
  roles: RoleType[]
  onChange: (newUser: UserType) => void
}
const PromoterRender: React.FC<PromoterRenderPropsType> = props => {
  const [loading, setLoading] = useState<boolean>(false)
  const isUserPromoter = isPromoter(props.roles)
  const handleOk = () => {
    setLoading(true)
    setUserPromoter(props.id).then(newUser => {
      successMessage()
      props.onChange(newUser)
    }).finally(() => setLoading(false))
  }
  const handleCancel = () => {
    setLoading(true)
    unsetUserPromoter(props.id).then(newUser => {
      successMessage()
      props.onChange(newUser)
    }).finally(() => setLoading(false))
  }

  return (<>
    <Spin spinning={loading}>
      {
        !isUserPromoter && (
          <Col>
            <Popconfirm
              title='您是否要设定该用户为业务员?'
              okText='确定'
              cancelText='取消'
              onConfirm={() => handleOk()}
            >
              <Button type='primary'>设为业务员</Button>
            </Popconfirm>
          </Col>
        )
      }
      {
        isUserPromoter && (
          <Col>
            <Popconfirm
              title='您是否要取消该用户的业务员资格?'
              okText='确定'
              cancelText='取消'
              onConfirm={() => handleCancel()}
            >
              <Button type='primary' danger>取消业务员</Button>
            </Popconfirm>
          </Col>
        )
      }
    </Spin>
  </>)
}

export default PromoterRender
