import React from "react";
import {Col} from "antd";


type DetailRowRenderPropsType = {
  label: string
  children: React.ReactChildren | React.ReactNode
}
const DetailRowRender: React.FC<DetailRowRenderPropsType> = props => {
  return (<>
    <Col span={6}>{props.label}</Col>
    <Col span={18}>
      {props.children}
    </Col>
  </>)
}

export default DetailRowRender
