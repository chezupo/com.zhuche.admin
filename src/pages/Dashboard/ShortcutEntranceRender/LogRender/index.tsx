import React from "react";
import {Col, Row} from "antd";

export type LogRenderPropsType = {
  logData: LogItemType[]
}
const ColRender: React.FC<{log: LogItemType}>  = ({log}) => {
  return (<>
    <Col span={2}>{log.id}</Col>
    <Col span={13}>{log.title}</Col>
    <Col span={3}>{log.user.username}</Col>
    <Col span={6}>{log.createdAt.substring(0, 10)}</Col>
  </>)
}
const LogRender: React.FC<LogRenderPropsType> = props => {
  console.log(props.logData)
  return (
    <>
      {
          <Row gutter={[0, 16]} >
            {
              props.logData.map(log => ( <ColRender log={log} key={log.id}/> ))
            }
          </Row>
      }
    </>
  )
}

export default LogRender
