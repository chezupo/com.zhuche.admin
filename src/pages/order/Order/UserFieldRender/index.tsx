import React from "react";
import {Col, Image, Popover, Row} from "antd";
import DetailRowRender from "@/pages/order/Order/components/DetailRowRender";

type UserFieldRenderPropsType = {
  user: UserItemType
}
const UserFieldRender: React.FC<UserFieldRenderPropsType> = props => {
  const user = props.user
  return (<>
    <Popover placement="top" title='用户详情' content={
      <Row>
        <DetailRowRender label='昵称'>{user.alipayAccount?.nickName}</DetailRowRender>
        <DetailRowRender label='手机'> {user.alipayAccount?.phone} </DetailRowRender>
        <DetailRowRender label='头像'>
          <Image src={user.alipayAccount?.avatar} style={{width: '2rem'}} />
        </DetailRowRender>
      </Row>
    }>
      <a>{props.user.alipayAccount?.nickName}</a>
    </Popover>
  </>)
}

export default UserFieldRender
