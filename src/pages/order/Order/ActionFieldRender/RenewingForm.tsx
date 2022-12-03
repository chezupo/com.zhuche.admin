/**
 *  This file is part of emailNotes.
 *
 * @Description Say something for this file.
 * @Author      wuchuheng<root@wuchuheng.com>
 * @Time        2022/12/2 22:41
 */
import React from "react";
import {FormInstance} from "antd/lib/form/hooks/useForm";
import {Form, InputNumber} from "antd";
import {sizeValidator} from "@/pages/promotion/PosterPage/TableRender/components/FormRender";

const RenewingForm: React.FC<{form: FormInstance}> = ({form}) => {
  return (
    <Form form={form} initialValues={{days: 1}}>
      <Form.Item
        name='days'
        label='天数'
        rules={[{required: true, message: '天数不能为空'}, {validator: sizeValidator}]}
      >
        <InputNumber />
      </Form.Item>
    </Form>

  )
}

export default RenewingForm
