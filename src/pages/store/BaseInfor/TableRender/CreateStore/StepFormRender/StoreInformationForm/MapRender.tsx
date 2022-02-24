import React from 'react'
import MapSearchComplete from '@/components/MapSearchComplete'
import { Col, Form } from 'antd'

const MapRender: React.FC = () => {
  return (
    <Col span={24}>
      <Form.Item
        labelCol={{span: 2}}
        label="地址"
        name='address'
        rules={[{required: true, message: '地址不能为空'}]}
      >
        <MapSearchComplete />
      </Form.Item>
    </Col>
  )
}


export default MapRender
