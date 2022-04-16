import React from "react";
import {Tag} from "antd";

const BooleanTag: React.FC<{isOk: boolean}> = ({isOk}) => {
  return (
    <>
      {isOk && <Tag color='green'>是</Tag>}
      {!isOk && <Tag color='red'>否</Tag>}
    </>
  )
}

export default BooleanTag
