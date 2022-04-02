import React, {useEffect, useState} from "react";
import {Button, Cascader, Col, Form, Input, InputNumber, Row, Select, Switch} from "antd";
import UploadImg from "@/components/UploadImg";
import {getAllBrands} from "@/api/brand";
import {useAppSelector} from "@/store/hooks";
import TagsRender from "@/pages/Car/Car/TableRender/FormRender/TagsRender";

type OptionType = {
  value: number
  label: string
  children?: OptionType[]
}
type FormRenderPropsType = {
  onFinish: (newData: Omit<CarItemType, 'id'>) => void
  isReset?: boolean
}
type UploadRenderPropsType = {
  value?: string
  onChange?: (value: string) => void
}
const UploadRender: React.FC<UploadRenderPropsType> = props => {
  const {imgPrefix} = useAppSelector(state => state.configuration)
  const [url, setUrl] = useState<string>('')
  const handleInitUrl = () => {
    if (imgPrefix && props.value) {
      setUrl(`${imgPrefix}/${props.value}`)
    }
  }
  useEffect(() => handleInitUrl(), [])
  useEffect(() => handleInitUrl(), [props.value, imgPrefix])

  return (<>
    <UploadImg
      {...(url.length > 0 ? {imageUrl: url} : {})}
      onUploaded={newImg => props.onChange && props.onChange(newImg.key)}
    />
  </>)
}

const FormRender: React.FC<FormRenderPropsType> = props => {
  const [form] = Form.useForm<CarItemType>();
  const [options, setOptions] = useState<OptionType[]>([])
  useEffect(() => {
    form.resetFields()
  }, [props.isReset])
  useEffect(() => {
    getAllBrands().then(res => {
      const newOptions: OptionType[] = res.list
        .filter(el => el.seriesList?.length > 0)
        .map((el): OptionType => {
        let children: OptionType[] = []
        if (el.seriesList?.length > 0) {
         children = el.seriesList.map((el): OptionType => {
              return {
                label: el.name,
                value: el.id
              }
            })
        }
        return {
          label: el.name,
          value: el.id,
          children
        }
      })
      setOptions(newOptions)
    })
  }, [])
  const handleFinish = (newData: CarItemType): void => {
    const seriesId = newData.seriesId as number[]
    newData.seriesId = seriesId[1]
    props.onFinish(newData)
  }

  return (
    <Form
      labelCol={{span: 6}}
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
        <Col span={12}>
          <Form.Item
            name='isSelfHelp'
            label='自助'
            rules={[{required: true, message: '自助不能为空'}]}
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
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
            <UploadRender />
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
            name='seriesId'
            label='车系'
            rules={[{required: true, message: '车系不能为空'}]}
          >
            <Cascader options={options} placeholder="请选择车系" />
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
