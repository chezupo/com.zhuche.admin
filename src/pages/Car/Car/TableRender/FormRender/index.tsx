import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, InputNumber, Row, Select} from "antd";
import TagsRender from "@/pages/Car/Car/TableRender/FormRender/TagsRender";
import ConfigRender from "@/pages/Car/Car/TableRender/FormRender/ConfigRender";
import SeriesRender from "@/pages/Car/Car/TableRender/FormRender/SeriesRender";
import SwitchRender from "@/pages/Car/Car/TableRender/FormRender/SwitchRender";
import FormUpload from "@/components/FormUpload";
import {fetchCarCategory} from "@/api/carCategory";
import carCategoryReducer from "@/store/modules/carCatetory";
import CarStyleSelectRender from "@/pages/Car/Car/TableRender/FormRender/CarStyleSelectRender";

type FormRenderPropsType = {
  onFinish: (newData: Omit<CarItemType, 'id'>) => void
  isReset?: boolean
  data?: CarItemType
}

const FormRender: React.FC<FormRenderPropsType> = props => {
  const [form] = Form.useForm<CarItemType>();
  useEffect(() => {
    form.resetFields()
  }, [props.isReset])
  const handleFinish = (newData: CarItemType): void => {
    props.onFinish(newData)
  }
  const handleInit = () => {
    const initData = props.data || {isSelfHelp: false, isOnline: true}
    form.setFieldsValue(initData)
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.data])

  return (
    <Form
      labelCol={{span: 7}}
      form={form}
      onFinish={handleFinish}
    >
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <Form.Item
            name='name'
            rules={[{required: true, message: '名称不能为空'}]}
            label='名称'
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            labelCol={{span: 12}}
            name='isSelfHelp'
            label='自助'
            rules={[{required: true, message: '自助不能为空'}]}
          >
            <SwitchRender checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            labelCol={{span: 12}}
            name='isOnline'
            label='上/下架'
            rules={[{required: true, message: '上/下架助不能为空'}]}
          >
            <SwitchRender checkedChildren="上架" unCheckedChildren="下架" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='排量'
            name='displacement'
            rules={[{required: true, message: '排量不能为空'}]}
          >
            <InputNumber min={0.1} style={{width: '100%'}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='挂档方式'
            name='shift'
            rules={[{required: true, message: '挂档方式不能为空'}]}
          >
            <Select>
              <Select.Option value={'AUTO'}>自动</Select.Option>
              <Select.Option value={'MANUAL'}>手动</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='油量(L)'
            name='gasVolume'
            rules={[{required: true, message: '油量不能为空'}]}
          >
            <InputNumber min={0.1} style={{width: '100%'}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='座位数'
            name='seats'
            rules={[{required: true, message: '座位不能为空'}]}
          >
            <InputNumber min={1} style={{width: '100%'}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='cover'
            label='封面'
            rules={[{required: true, message: '封面不能为空'}]}
          >
            <FormUpload accept='.jpg,.jpeg,.png' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='type'
            label='车型'
            rules={[{required: true, message: '车型不能为空'}]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='车牌号'
            name='number'
            rules={[{required: true, message: '车牌号不能为空'}]}
          >
            <Input placeholder='如:浙A XXXX' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='brandSeries'
            label='车系'
            rules={[{required: true, message: '车系不能为空'}]}
          >
            <SeriesRender data={props.data}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='powerType'
            label='动力类型 '
            rules={[{required: true, message:'动力类型不能为空'}]}
          >
            <Select>
              <Select.Option value={'GAS'}>油</Select.Option>
              <Select.Option value={'ELECTRIC_GAS'}>混合</Select.Option>
              <Select.Option value={'ELECTRIC'}>纯电</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='engineType'
            label='发动机类型'
            rules={[{required: true, message:'发动机类型不能为空'}]}
          >
            <Select>
              <Select.Option value={'NATURALLY_ASPIRATED'}>自然吸气</Select.Option>
              <Select.Option value={'SUPERCHARGED'}>增压</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='tags'
            label='标签'
            rules={[{required: true, message:'标签不能为空'}]}
          >
            <TagsRender />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='rent'
            label='租金(天)'
            rules={[{required: true, message:'价格不能为空'}]}
          >
            <InputNumber min={0.01} style={{width: '100%'}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='configs'
            label='汽车配置'
          >
            <ConfigRender data={props.data} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='deposit'
            label='押金'
            rules={[{required: true, message:'押金不能为空'}]}
          >
            <InputNumber style={{width: '100%'}} min={0} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='handlingFee'
            label='手续费'
            rules={[{required: true, message:'手续费不能为空'}]}
          >
            <InputNumber style={{width: '100%'}} min={0} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='insuranceFee'
            label='驾无忧(天)'
            rules={[{required: true, message:'驾无忧不能为空'}]}
          >
            <InputNumber style={{width: '100%'}} min={0} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='carCategory'
            label='类型'
            rules={[{required: true, message:'类型不能为空'}]}
          >
            <CarStyleSelectRender />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row justify='center' gutter={[24, 0]}>
          <Col>
            <Button>取消</Button>
          </Col>
            <Col>
              <Form.Item>
                <Button type='primary' htmlType='submit'>确认</Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default FormRender
