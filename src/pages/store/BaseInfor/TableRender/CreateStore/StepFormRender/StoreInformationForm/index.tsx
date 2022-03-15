import React, { useEffect } from 'react'
import { Form, Row } from 'antd'
import InputRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/InputRender'
import BannerInputRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/BannerInputRender'
import { FormInstance } from 'antd/lib/form/hooks/useForm'
import SwitchRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/SwitchRender'
import MapRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/MapRender'
import TimeRange from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/TimeRange'
import {
  iAmOkSubscription,
  StepIndexType
} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender'
import { RuleObject } from 'rc-field-form/lib/interface'
import SubscriptionService from '@wuchuheng/rxjs'

export type CreateStoreType = {
  banners: string[]
  name: string
  mark: string
  address: AddressType
  servicePhone: string
  businessHours: [ string, string ]
  isEnable: boolean
  isStation: boolean
  isAirport: boolean
  isSelfService: boolean
}

export const FormContext = React.createContext<FormInstance<CreateStoreType> | null >(null)
type StoreInformationFormPropsType = {
  onChange: (data: CreateStoreType) => void
  data: CreateStoreType
  areYouOk: SubscriptionService<string>
  onOk: () => void
}
const StoreInformationForm: React.FC<StoreInformationFormPropsType> = (props) => {
  const [form] = Form.useForm<CreateStoreType>();
  const handleInit = () => {
    form.setFieldsValue(props.data)
    const subscriptionHandler = props.areYouOk.subscription(() => {
      form.validateFields().then(() => {
        props.onChange( form.getFieldsValue(true) )
        props.onOk()
      })
    })
    return () => {
      props.areYouOk.unSubscription(subscriptionHandler)
    }
  }

  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.data])
  const mapValidator = async (rule: RuleObject, value: AddressType): Promise<void> => {
    if (value.lat === 0 || value.lng === 0) {
      throw new Error("地址不能为空")
    }
  }

  return (
    <FormContext.Provider value={form}>
      <Form
        labelCol={{span: 4}}
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={props.data}
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
            form={form}
            label="门头图"
            name='banners'
            rules={{required: true, message: '门头图不能为空'}}
          />
          <SwitchRender label='机场' name='isAirport' rules={{required: true, message: '机场不能为空'}}/>
          <SwitchRender label='高铁站' name='isStation' rules={{required: true, message: '高铁站不能为空'}}/>
          <SwitchRender label='含自助车型' name='isSelfService' rules={{required: true, message: '自助车型不能为空'}}/>
          <TimeRange formContext={form} />
          <MapRender
            rules={[{required: true, message: '地址不能为空'}, {validator: mapValidator}]}
          />
        </Row>
      </Form>
    </FormContext.Provider>
  );

}

export default StoreInformationForm

