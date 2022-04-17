import React from "react";
import {Tag} from "antd";

type BooleanTagPropsType = {
  isOk: boolean
  okText?: string
  cancelText?: string
}
const BooleanTag: React.FC<BooleanTagPropsType> = ({isOk, okText, cancelText}) => {
  return (
    <>
      {isOk && <Tag color='green'>{okText || '是'}</Tag>}
      {!isOk && <Tag color='red'>{cancelText || '否'}</Tag>}
    </>
  )
}

export default BooleanTag
