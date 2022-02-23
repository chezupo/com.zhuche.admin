import React from "react";
import {Col, Row} from "antd";
import style from "./style.module.less"
import CreateStore from "@/pages/store/BaseInfor/TableRender/CreateStore";

const StoreTable: React.FC = () => {
  return  (<>table</>)

}

const TableRender:React.FC = () => {
  return (
    <Row gutter={[0, 12]} className={style.main}>
      <Col span={12}>
        门店基本信息列表
      </Col>
      <Col span={12} className={style.createWrapper}>
        <CreateStore />
      </Col>
      <Col span={24}> <StoreTable /> </Col>
    </Row>
  )
}

export default TableRender
