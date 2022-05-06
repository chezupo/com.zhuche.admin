import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Row} from "antd";
import TableRender from "@/pages/store/StoreCommentPage/TableRender";

const StoreCommentPage: React.FC = () => {
  return (<>
    <HeaderPage>
      用于管理门店评论
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

export default StoreCommentPage
