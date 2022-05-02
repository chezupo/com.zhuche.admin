import React from "react";
import HeaderPage from "@/components/HeaderPage";
import TableRender from "@/pages/finance/TransactionPage/TableRender";
import {Col, Row} from "antd";
import ContentContainer from "@/components/ContentContainer";

const TransactionPage: React.FC = () => {
  return (<>
    <HeaderPage>
      管理用户的付费账单
    </HeaderPage>
    <ContentContainer >
      <Row>
        <Col span={24}>
          <TableRender />
        </Col>
      </Row>
    </ContentContainer>
  </>)
}

export default TransactionPage
