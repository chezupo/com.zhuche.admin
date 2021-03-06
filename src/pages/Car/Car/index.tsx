import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from "./style.module.less";
import {Col, Row} from "antd";
import TableRender from "@/pages/Car/Car/TableRender";
import FilterRender from "@/pages/Car/Car/FilterRender";

const Car: React.FC = () => {
  return (
    <>
      <HeaderPage>
        <>用于对本地门店的汽车进行管理,如上架下架等</>
      </HeaderPage>

      <ContentContainer>
        <Row gutter={[12, 24]}>
          <Col span={24}>
            <FilterRender />
          </Col>
          <Col span={24}>
            <div className={style.main}>
              <TableRender />
            </div>
          </Col>
        </Row>
      </ContentContainer>
    </>
  )
}

export default Car
