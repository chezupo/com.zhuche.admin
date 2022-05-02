import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Row} from "antd";
import TableRender from "@/pages/finance/WithdrawPage/TableRender";

const WithdrawPage: React.FC = () => {
  return (<>
    <HeaderPage>
      专门处理用户提交的提现申请
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

export default WithdrawPage
