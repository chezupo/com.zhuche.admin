import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from './style.module.less';
import TableRender from "@/pages/Coupon/UserCoupon/TableRender";
import {Col, Row} from "antd";
import FilterRender from "@/pages/Coupon/UserCoupon/FilterRender";

const UserCoupon: React.FC = () => {
  return (<>
    <HeaderPage>
      管理用户的优惠卷
    </HeaderPage>
    <ContentContainer>
      <Row gutter={[0, 12]}>
        <Col span={24} className={style.main}>
          <FilterRender />
        </Col>
        <Col span={24} className={style.main}>
          <TableRender />
        </Col>
      </Row>
    </ContentContainer>
  </>)
}

export default UserCoupon
