import React from "react";
import {Col, Row} from "antd";
import style from "./style.module.less"
import CreateStore from "@/pages/store/BaseInfor/TableRender/CreateStore";
import TablePageRender from '@/pages/store/BaseInfor/TableRender/TablePageRender'

const TableRender:React.FC = () => {
  return (
    <Row gutter={[0, 12]} className={style.main}>
      <Col span={12}>
        门店基本信息列表
      </Col>
      <Col span={12} className={style.createWrapper}>
        <CreateStore />
      </Col>
      <Col span={24}> <TablePageRender/> </Col>
    </Row>
  )
}

export default TableRender
