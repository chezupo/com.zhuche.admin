import React from "react";
import {Col, Row} from "antd";
import Permission from "@/components/Permission";
import {RoleType} from "@/store/modules/me";
import CreateModal from "@/pages/Car/Car/TableRender/CreateModal";

const TableRender: React.FC = () => {
  return (<>
    <Row>
      <Permission roles={[RoleType.ROLE_BUSINESS]} >
        <Col span={24}>
          <CreateModal />
        </Col>
      </Permission>
      <Col span={24}>
        table
      </Col>
    </Row>
  </>)
}

export default TableRender
