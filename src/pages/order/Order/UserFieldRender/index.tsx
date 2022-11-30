import React from "react";
import {Col, Image, Popover, Row} from "antd";
import DetailRowRender from "@/pages/order/Order/components/DetailRowRender";

type UserFieldRenderPropsType = {
  user: UserItemType
}
const UserFieldRender: React.FC<UserFieldRenderPropsType> = props => {
  const user = props.user
  const nickname = user.alipayAccount?.nickName || user.wechatAccount?.nickName;
  const phone = user.alipayAccount?.phone || user.wechatAccount?.phone;
  const avatar = user.alipayAccount?.avatar || user.wechatAccount?.avatar;

  return (<>
    <Popover placement="top" title='用户详情' content={
      <Row>
        <DetailRowRender label='昵称'>{nickname}</DetailRowRender>
        <DetailRowRender label='手机'> {phone} </DetailRowRender>
        <DetailRowRender label='头像'>
          <Image src={avatar} style={{width: '2rem'}} />
        </DetailRowRender>
      </Row>
    }>
      <a>{nickname}</a>
    </Popover>
  </>)
}

export default UserFieldRender
