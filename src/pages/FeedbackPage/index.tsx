import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Row} from "antd";
import TableRender from "@/pages/FeedbackPage/TableRender";

const FeedbackPage: React.FC = () => {
  return (<>
    <HeaderPage>
      用于管理用户的反馈
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

export default FeedbackPage
