import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Row} from "antd";
import TableRender from "@/pages/promotion/PosterPage/TableRender";

const PosterPage: React.FC = () => {
  return (<>
    <HeaderPage>
      用于管理推广的海报
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

export default PosterPage
