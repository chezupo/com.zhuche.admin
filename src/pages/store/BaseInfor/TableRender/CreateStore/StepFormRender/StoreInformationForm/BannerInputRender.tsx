import React, {useContext, useEffect} from "react";
import {InputRenderPropsType} from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/InputRender";
import {Rule} from "antd/es/form";
import {Col, Form} from "antd";
import UploadMultipleImg from "@/components/UploadMultipleImg";
import {FormContext} from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/index";

const BannerInputRender: React.FC<InputRenderPropsType> = (props)=> {
  const form = useContext(FormContext)
  useEffect(() => {
    console.log(form?.setFieldsValue({banners: [
      ]}))
  }, [])

  let  rules: Rule[] = []
  if (props.rules) rules = Array.isArray(props.rules) ? props.rules : [props.rules]

  return (
    <Col span={12}>
      <Form.Item
        label={props.label}
        name={props.name}
        rules={rules}
      >
        <UploadMultipleImg />
      </Form.Item>
    </Col>
  )
}

export default BannerInputRender
