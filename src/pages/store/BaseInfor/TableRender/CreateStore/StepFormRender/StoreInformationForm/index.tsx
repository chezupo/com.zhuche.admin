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
import SubscriptionService from '@wuchuheng/rxjs'
import {RuleObject} from "antd/lib/form";

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
      throw new Error("??????????????????")
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
            label="?????????"
            name='name'
            placeholder='?????????????????????XX??????'
            rules={{required: true, message: '??????????????????'}}
          />
          <InputRender
            label="??????"
            name='mark'
            placeholder='??????????????????????????????'
          />
          <InputRender
            label="????????????"
            name='servicePhone'
            placeholder='???????????? ?????????????????????'
            number
            rules={[{required: true, message: '????????????????????????'}]}
          />
          <BannerInputRender
            form={form}
            label="?????????"
            name='banners'
            rules={{required: true, message: '?????????????????????'}}
          />
          <SwitchRender label='??????' name='isAirport' rules={{required: true, message: '??????????????????'}}/>
          <SwitchRender label='?????????' name='isStation' rules={{required: true, message: '?????????????????????'}}/>
          <SwitchRender label='???????????????' name='isSelfService' rules={{required: true, message: '????????????????????????'}}/>
          <TimeRange formContext={form} />
          <MapRender
            rules={[{required: true, message: '??????????????????'}, {validator: mapValidator}]}
          />
        </Row>
      </Form>
    </FormContext.Provider>
  );

}

export default StoreInformationForm

