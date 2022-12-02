import React from "react";
import {Button, Form, Input} from "antd";
import style from './style.module.less'
import {usePaginationFilter, useReloadPagination, useRestPaginationFilter} from "@/util/paginationHook";
import {getOrderThunk} from "@/store/modules/order";
import {useAppDispatch} from "@/store/hooks";

type FormType = {
  name: string
}
const FilterRender: React.FC = () => {
  const [form] = Form.useForm()
  const querySearch  = usePaginationFilter()
  const  resetQuery= useRestPaginationFilter()
  const dispatch = useAppDispatch()
  const [, forceReload] = useReloadPagination(() => {
    dispatch(getOrderThunk()).then(() => {
      console.log("loading order.")
    })
  });
  const handleFinished = (v: FormType) => {
    querySearch(v)
  }
  const handleReset = () => {
    form.resetFields()
    resetQuery()
  }

  return (
    <div className={style.main}>
      <Form
        form={form}
        onFinish={handleFinished}
        layout='inline'
      >
        <Form.Item
          label='订单号'
          name='tradeNo'
        >
          <Input />
        </Form.Item>
        <Form.Item >
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
        <Form.Item >
          <Button onClick={() => forceReload()}>刷新</Button>
        </Form.Item>
        <Form.Item >
          <Button type={'primary'} htmlType='submit'>搜索</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default FilterRender
