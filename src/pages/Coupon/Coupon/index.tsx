import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from './style.module.less';
import TableRender from "@/pages/Coupon/Coupon/TableRender";

const Coupon: React.FC = () => {
  return (<>
    <HeaderPage>用于管理各种优惠卷管理的创建，删除和修改</HeaderPage>
    <ContentContainer classname={style.main}>
      <TableRender />
    </ContentContainer>
  </>)
}

export default Coupon
