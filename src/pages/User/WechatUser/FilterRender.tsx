import React from "react";
import style from './style.module.less';
import {Button, Form, Input} from "antd";
import {usePaginationFilter, useRestPaginationFilter} from "@/util/paginationHook";

const FilterRender: React.FC = () => {
  const [form] = Form.useForm();
  const handleFinish = usePaginationFilter()
  const handleReset = useRestPaginationFilter()

  return (
    <div className={style.main}>
      <Form
        form={form}
        onFinish={handleFinish}
        layout='inline'
      >
        <Form.Item
          name='nickname'
          label='昵称'
          rules={[{required: true, message: '昵称不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>搜索</Button>
        </Form.Item>
      </Form>
    </div>
  )

}

export default FilterRender
