import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Row} from "antd";
import TableRender from "@/pages/order/ViolationPage/TableRender";

const ViolationPage: React.FC = () => {
  return (<>
    <HeaderPage>
      用于管理违章列表
    </HeaderPage>
    <ContentContainer>
      <Row>
        <Col span={24}>
          <TableRender />
        </Col>
      </Row>
    </ContentContainer>
  </>)
}

export default ViolationPage
