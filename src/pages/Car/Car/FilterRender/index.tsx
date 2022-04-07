import React, {useEffect} from "react";
import moment from 'moment';
import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import style from "./style.module.less"
import NumberRangeRender from "@/pages/Car/Car/FilterRender/NumberRangeRender";
import {useLocation, useNavigate} from "react-router-dom";
import {objectToQueryStr, queryStrToObject} from "@/util/helper";
import { RuleObject } from "antd/lib/form";

type NewValueType = {
  name?: string
  price?: [number, number]
  deposit?: [number, number]
  timeRange?: [ moment.Moment, moment.Moment ]
}
const { RangePicker } = DatePicker;
const rangeValidator = async (rule: RuleObject, value: [number, number]): Promise<void> => {
  if ( value?.[0] > value?.[1]) {
    throw new Error("开始值不能大于结束值")
  }
}
const FilterRender: React.FC = () => {
  const [form] = Form.useForm()
  const {search, pathname} = useLocation()
  const initHandle = () => {
    const searchObj = queryStrToObject(search)
    if (searchObj.timeRange) {
      const [start, end] = (searchObj.timeRange + '').split("-")
      console.log(start, end)
      const starTime =  moment(start, 'YYYY/MM/DD HH:mm')
      const endTime =  moment(end, 'YYYY/MM/DD/HH:mm')
      form.setFieldsValue({ timeRange: [starTime, endTime] })
    }
    if (searchObj.deposit) {
      const [start, end] = (searchObj.deposit + '').split('-')
      form.setFieldsValue({deposit: [parseInt(start), parseInt(end)]})
    }
    if (searchObj.price) {
      const [start, end] = (searchObj.price+ '').split('-')
      form.setFieldsValue({price: [parseInt(start), parseInt(end)]})
    }
    searchObj.name && form.setFieldsValue({name: searchObj.name})
  }
  useEffect(() => initHandle(), [])
  useEffect(() => initHandle(), [search])
  const navigator = useNavigate()
  const handleFinish = (newValue: NewValueType) => {
    const queryObj: Record<string, string> = {}
    if (newValue.name) queryObj.name = newValue.name
    if (newValue.price) queryObj.price = `${newValue.price[0]}-${newValue.price[1]}`
    if (newValue.deposit) queryObj.deposit = `${newValue.deposit[0]}-${newValue.deposit[1]}`
    if (newValue.timeRange) {
      const start = newValue.timeRange[0].format("YYYY/MM/DD HH:mm")
      const end = newValue.timeRange[1].format("YYYY/MM/DD HH:mm")
      queryObj.timeRange = `${start}-${end}`
    }
    navigator(pathname + objectToQueryStr(queryObj))
  }
  const handleReset = ()=> {
    form.resetFields()
    handleFinish({})
  }

  return (<>
    <div className={style.main}>
      <Form
        layout='inline'
        form={form}
        onFinish={handleFinish}
      >
        <Row justify='center' gutter={[12, 0]} >
          <Col>
            <Form.Item
              name='name'
              label='名称'
              className={style.formItem}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name='price'
              label='价格'
              className={[style.formItem, style.price].join(' ')}
              rules={[{validator: rangeValidator}]}
            >
              <NumberRangeRender />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name='deposit'
              label='押金'
              className={[style.formItem, style.price].join(' ')}
              rules={[{validator: rangeValidator}]}
            >
              <NumberRangeRender />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name='timeRange'
              label='创建时间'
              className={[style.formItem, style.price].join(' ')}
            >
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Row gutter={[12, 0]}>
              <Col>
              <Button onClick={() => handleReset()}>重置</Button>
              </Col>
              <Col>
                <Button type='primary' htmlType='submit'>查找</Button>
              </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </>)
}

export default FilterRender
