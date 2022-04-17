import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import {usePaginationFilter, useRestPaginationFilter} from "@/util/paginationHook";
import {useLocation} from "react-router-dom";
import {query2Obj} from "@wuchuhengtools/helper";

const FilterRender:React.FC = () => {
  const handleFinish = usePaginationFilter()
  const handleReset = useRestPaginationFilter()
  const [form]  = Form.useForm();
  const [preSearch, setPreSearch] = useState<string>('')
  const {search} = useLocation();
  useEffect(() => {
    if (search !== preSearch) {
      const obj = query2Obj(search);
      for (const key in obj) {
        obj[key] = decodeURI(obj[key])
      }
      form.setFieldsValue(obj)
      setPreSearch(search)
    }

  }, [search])

  return (<>
    <Form
      layout='inline'
      form={form}
      onFinish={handleFinish}
    >
      <Form.Item
        label='ID'
        name='userId'
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='标题'
        name='title'
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='昵称'
        name='nickName'
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button onClick={() => {
          form.resetFields();
          handleReset();
        }}>重置</Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' type='primary'>确认</Button>
      </Form.Item>
    </Form>
  </>)
}

export default FilterRender
