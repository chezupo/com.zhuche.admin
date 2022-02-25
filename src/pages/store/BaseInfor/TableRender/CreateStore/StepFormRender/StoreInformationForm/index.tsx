import React, { useState } from 'react'
import { Form, Row } from 'antd'
import InputRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/InputRender'
import BannerInputRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/BannerInputRender'
import { StoreItemType } from '@/store/modules/stores'
import { FormInstance } from 'antd/lib/form/hooks/useForm'
import SwitchRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/SwitchRender'
import MapRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/MapRender'

export type CreateStoreType = Omit<StoreItemType, "id" | "banners"> & { banners: string[]}
const initCreateStore: CreateStoreType = {
  name: 'hello',
  mark: '',
  starAt: '',
  endAt: '',
  address: '',
  servicePhone: '',
  tags: '',
  lat: 0,
  lng: 0,
  isAirport: false,
  isStation: false,
  isSelfService: false,
  isEnable: true,
  banners: []
}

export const FormContext = React.createContext<FormInstance<CreateStoreType> | null >(null)
const StoreInformationForm: React.FC = () => {
  const [form] = Form.useForm<CreateStoreType>();
  const [createStore, setCreateStore] = useState<CreateStoreType>(initCreateStore)
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <FormContext.Provider value={form}>
      <Form
        labelCol={{span: 4}}
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        initialValues={createStore}
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
          <BannerInputRender
            label="门头图"
            name='banners'
            rules={{required: true, message: '门头图不能为空'}}
          />
          <BannerInputRender
            label="还车指引"
            name='banners'
            rules={{required: true, message: '门头图不能为空'}}
          />
          <BannerInputRender
            label="取车指引"
            name='banners'
            rules={{required: true, message: '门头图不能为空'}}
          />
          <SwitchRender label='机场' name='isAirport' rules={{required: true, message: '机场不能为空'}}/>
          <SwitchRender label='高铁站' name='isStation' rules={{required: true, message: '高铁站不能为空'}}/>
          <SwitchRender label='含自助车型' name='isSelfService' rules={{required: true, message: '自助车型不能为空'}}/>
          <MapRender />
        </Row>
      </Form>
    </FormContext.Provider>
  );

}

export default StoreInformationForm

