import React, {useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Tabs} from "antd";
import style from './style.module.less';
import OrderAgreement from "@/pages/setting/Agreement/OrderAgreement";

const Agreement: React.FC = () => {

  const [actionTab, setActiveTab] = useState<string>('1')
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
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </ContentContainer>
  </>)
}

export default Agreement

