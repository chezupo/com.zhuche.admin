import React, {useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Tabs} from "antd";
import style from './style.module.less';
import OrderAgreement from "@/pages/setting/Agreement/OrderAgreement";
import CheckOutOrderAgreement from "@/pages/setting/Agreement/CheckOutOrderAgreement";
import LoginAgreement from "@/pages/setting/Agreement/LoginAgreement";

const Agreement: React.FC = () => {

  const [actionTab, setActiveTab] = useState<string>('2')
  const handleChange = (index: string) => {
    setActiveTab(index)
  }

  return (<>
    <HeaderPage >
      <>用于管理平台上对用户公开的协议</>
    </HeaderPage>
    <ContentContainer classname={style.main}>
      <Tabs defaultActiveKey={actionTab} onChange={handleChange}>
        <Tabs.TabPane tab="下单协议" key="1">
          <OrderAgreement />
        </Tabs.TabPane>
        <Tabs.TabPane tab="下单规则" key="2">
          <CheckOutOrderAgreement />
        </Tabs.TabPane>
        <Tabs.TabPane tab="登录界面相关协议" key="3">
          <LoginAgreement />
        </Tabs.TabPane>
      </Tabs>
    </ContentContainer>
  </>)
}

export default Agreement

