import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'antd'
import { RuleObject } from 'rc-field-form/lib/interface'
import InputRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/InputRender'
import SwitchRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/SwitchRender'
import MapRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/MapRender'
import { CreateStoreType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import BannerInputRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/BannerInputRender'
import TimeRange from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/TimeRange'
import { useAppDispatch } from '@/store/hooks'
import { updateThunk } from '@/store/modules/stores'

type EditorRenderPropsType = {
  data: StoreItemType
  onSuccess: () => void
  onCancel: () => void
}
const EditorRender: React.FC<EditorRenderPropsType> = (props) => {
  const [form] = Form.useForm<CreateStoreType>();
  const mapValidator = async (rule: RuleObject, value: AddressType): Promise<void> => {
    if (value.lat === 0 || value.lng === 0) {
      throw new Error("地址不能为空")
    }
  }
  const convertToCreatData = (data: StoreItemType): CreateStoreType => {
    return {
      banners: data.banners.map(el => el.imgKey),
      name: data.name,
      mark: data.mark,
      address: {
        province: data.province.name,
        name: data.address,
        city: data.city.name,
        area: data.area.name,
        provinceCode: data.province.code,
        cityCode: data.city.code,
        areaCode: data.area.code,
        address: data.address,
        lng: data.lng,
        lat: data.lat,
      },
      servicePhone: data.servicePhone,
      businessHours: [data.starAt, data.endAt],
      isEnable: data.isEnable,
      isStation: data.isStation,
      isAirport: data.isAirport,
      isSelfService: data.isSelfService
    }
  }
  useEffect(() => {
    props.data && form.setFieldsValue( convertToCreatData( props.data ) )
  }, [props.data])
  const dispatch = useAppDispatch()
  const handleFinish = (data: CreateStoreType) => {
    dispatch(updateThunk(props.data.id, {
      banners: data.banners,
      areaCode: data.address.areaCode,
      address: data.address.address,
      lng: data.address.lng,
      lat: data.address.lat,
      starAt: data.businessHours[0],
      endAt: data.businessHours[1],
      name: data.name,
      mark: data.mark,
      servicePhone: data.servicePhone,
      isStation: data.isStation,
      isAirport: data.isAirport,
      isSelfService: data.isSelfService
    })).then(() => {
      props.onSuccess()
    })
  }

  return (
    <Form
      labelCol={{span: 4}}
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      initialValues={ convertToCreatData(props.data) }
      onFinish={handleFinish}
    >
      <Row gutter={24}>
        <InputRender
          label="门店名"
          name='name'
          placeholder='请输入店名如：XX机场'
          rules={{required: true, message: '门店名不能空'}}
        />
        <InputRender
          label="备注"
          name='mark'
          placeholder='请输备注如：站内取还'
        />
        <InputRender
          label="电话电话"
          name='servicePhone'
          placeholder='请输入： 门店的客服电话'
          number
          rules={[{required: true, message: '客服电话不能为空'}]}
        />
        <BannerInputRender
          label="门头图"
          name='banners'
          rules={{required: true, message: '门头图不能为空'}}
        />
        <SwitchRender label='机场' name='isAirport' rules={{required: true, message: '机场不能为空'}}/>
        <SwitchRender label='高铁站' name='isStation' rules={{required: true, message: '高铁站不能为空'}}/>
        <SwitchRender label='含自助车型' name='isSelfService' rules={{required: true, message: '自助车型不能为空'}}/>
        <TimeRange
          formContext={form}
        />
        <MapRender
          rules={[{required: true, message: '地址不能为空'}, {validator: mapValidator}]}
        />
        <Col span={24}>
          <Row gutter={[24, 0]} justify='center'>
            <Col><Button onClick={props.onCancel}>取消</Button></Col>
            <Col><Button type='primary' htmlType='submit' >保存</Button></Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default EditorRender
