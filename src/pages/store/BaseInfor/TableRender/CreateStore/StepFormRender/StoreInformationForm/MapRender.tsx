import React from 'react'
import MapSearchComplete from '@/components/MapSearchComplete'
import { Col, Form } from 'antd'
import { Rule } from 'antd/es/form'

type MapRenderPropsType = {
    rules?:Rule | Rule[]
}
const MapRender: React.FC<MapRenderPropsType> = (props) => {
  let  rules: Rule[] = []
  if (props.rules) rules = Array.isArray(props.rules) ? props.rules : [props.rules]
  return (
    <Col span={24}>
      <Form.Item
        labelCol={{span: 2}}
        label="地址"
        name='address'
        rules={rules}
      >
        <MapSearchComplete />
      </Form.Item>
    </Col>
  )
}


export default MapRender
