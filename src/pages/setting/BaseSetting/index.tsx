import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import FormRender from "@/pages/setting/BaseSetting/FormRender";
import {Col, Row} from "antd";
import style from "@/pages/setting/BaseSetting/style.module.less";

const BaseSetting: React.FC = () => {
  return (<>
    <HeaderPage >
      <>用于配置应用的基本信息</>
    </HeaderPage>
    <ContentContainer>
      <Row justify='center' className={style.main}>
        <Col span={12}>
          <FormRender/>
        </Col>
      </Row>
    </ContentContainer>
  </>)
}

export default BaseSetting
