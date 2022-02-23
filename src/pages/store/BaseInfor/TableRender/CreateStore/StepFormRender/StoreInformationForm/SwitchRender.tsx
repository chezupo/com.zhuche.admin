import {Col, Form, Switch} from "antd";
import React from "react";
import {InputRenderPropsType} from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/InputRender";
import {Rule} from "antd/es/form";
type SwitchElPropsType = {
  value?: boolean
  onChange?: (isCheck: boolean) => void
}
const SwitchEl: React.FC<SwitchElPropsType> = (props) => {
  return (
    <Switch
      checkedChildren="是"
      unCheckedChildren="否"
      checked={!!props.value}
      onChange={(isCheck) => {props.onChange && props.onChange(isCheck)}}
    />
  )
}

const SwitchRender: React.FC<InputRenderPropsType> = (props) => {
  let  rules: Rule[] = []
  if (props.rules) rules = Array.isArray(props.rules) ? props.rules : [props.rules]

  return (
    <Col span={4}>
      <Form.Item
        labelCol={{span: 12}}
        name={props.name}
        label={props.label}
        rules={rules}
      >
        <SwitchEl />
      </Form.Item>
    </Col>
  )
}

export default SwitchRender;
