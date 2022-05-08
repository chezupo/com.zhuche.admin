import React from "react";
import {Col, Row} from "antd";
import TableRender, {TableRenderPropsType} from "@/pages/Dashboard/ShortcutEntranceRender/TableRender";
import LogRender, {LogRenderPropsType} from "@/pages/Dashboard/ShortcutEntranceRender/LogRender";
import {useNavigate} from "react-router-dom";

type ShortcutEntranceRenderPropsType = TableRenderPropsType & LogRenderPropsType
const ShortcutEntranceRender: React.FC<ShortcutEntranceRenderPropsType> = props => {
  const navigater = useNavigate();
  return (<>
    <Row>
      <Col span={18}>
        <h4><a onClick={() => navigater('/orders/orders')}>本周新增的用户/订单</a></h4>
        <TableRender tableData={props.tableData} />
      </Col>
      <Col span={6}>
        <h4><a onClick={() => navigater('/setting/logs')}>操作日志</a></h4>
        <LogRender logData={props.logData} />
      </Col>
    </Row>
  </>)
}

export default ShortcutEntranceRender
