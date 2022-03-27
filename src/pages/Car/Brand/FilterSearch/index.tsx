import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import style from './style.module.less'
import Permission from "@/components/Permission";
import {RoleType} from "@/store/modules/me";

export type DataType = {
  storeName: string
  name: string
}
type FilterSearchPropsType = {
  onChange: (value: DataType) => void
  onReset: () => void
}
const FilterSearch: React.FC<FilterSearchPropsType> = props => {
  const [form] = Form.useForm<DataType>()
  const handleFinish = (res: DataType) => {
    props.onChange({
      name: res.name || '',
      storeName: res.storeName || ''
    })
  }
  const handleReset = () => {
    form.resetFields()
    props.onReset()
  }

  return (<>
    <div className={style.main}>
    <Form
      form={form}
          onFinish={handleFinish}
    >
      <Row gutter={[12, 0]}>
        <Permission roles={[RoleType.ROLE_ADMIN]}>
          <Col span={8}>
            <Form.Item name='storeName' label='门店名' className={style.item}>
              <Input />
            </Form.Item>
          </Col>
        </Permission>
        <Col span={8}>
          <Form.Item name='name' label='品牌名' className={style.item}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Row gutter={[12, 0]}>
            <Col >
              <Form.Item className={style.item}>
                <Button onClick={() => handleReset()}>重置</Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className={style.item}> <Button htmlType='submit' type='primary'>搜索</Button> </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
    </div>
  </>)
}

export default FilterSearch
