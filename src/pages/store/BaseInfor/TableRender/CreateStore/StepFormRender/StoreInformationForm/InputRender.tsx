import {Rule} from "antd/es/form";
import React from "react";
import {Col, Form, Input} from "antd";
import {CreateStoreType} from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/index";

export type InputRenderPropsType = {
  label: string
  name: keyof CreateStoreType
  rules?:Rule | Rule[]
  placeholder?: string
  number?: boolean
}
const InputRender: React.FC<InputRenderPropsType> = (props) => {
  let  rules: Rule[] = []
  if (props.rules) rules = Array.isArray(props.rules) ? props.rules : [props.rules]

  return (
    <Col span={12}>
      <Form.Item
        name={props.name}
        label={props.label}
        rules={rules}
      >
        <Input 
        type={props.number ? 'number' : 'text'}
        {...(props.placeholder ?  {
          placeholder: props.placeholder
        } : {}  )} 
        />
      </Form.Item>
    </Col>
  )

}

export default InputRender
