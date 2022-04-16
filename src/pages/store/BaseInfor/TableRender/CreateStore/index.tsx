import React, {useState} from "react";
import {Button, Modal, Spin} from 'antd'
import style from "./style.module.less";
import {AiOutlinePlus} from "react-icons/ai";
import StepFormRender, {
  GuidType,
  StoreAccountType
} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender'
import {CreateStoreType} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import {useAppDispatch} from '@/store/hooks'
import {createStoreThunk} from '@/store/modules/stores'
import {successMessage} from '@/util/messageUtil'
import SubscriptionService from '@wuchuheng/rxjs'
import Permission from "@/components/Permission";

export const resetSubscription = new SubscriptionService<boolean>(true)
const CreateStore: React.FC = () => {
  const [visitable, setVisitable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleChange = (storeAccount: StoreAccountType, createStore:CreateStoreType, guid: GuidType) => {
    setLoading(true)
    dispatch(createStoreThunk({
      ...storeAccount,
      areaCode: createStore.address.areaCode,
      ...createStore,
      lng: createStore.address.lng,
      lat: createStore.address.lat,
      starAt: createStore.businessHours[0],
      endAt: createStore.businessHours[1],
      address: createStore.address.address,
      pickupGuids: guid.pickupGuids.map(({title,imgKey}) => ({imgKey: imgKey, title})),
      returnGuids: guid.returnGuids.map(({title,imgKey}) => ({imgKey: imgKey, title})),
    })).then(() => {
      successMessage("添加门店成功🎉🎉")
      resetSubscription.next(true)
      setVisitable(false)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Permission roles={['ROLE_ADMIN']}>
        <Button type='primary' onClick={() => setVisitable(true)} >
          <div className={style.buttonContentWrapper}>
            <AiOutlinePlus className={style.createButton}/>
            <div>创建门店 </div>
          </div>
        </Button>
      </Permission>

      <Modal
        width={1500}
        title="创建门店"
        visible={visitable}
        footer={null}
        onCancel={() => setVisitable(false)}
      >
        <Spin spinning={loading}>
          <StepFormRender onChange={handleChange} />
        </Spin>
      </Modal>
    </>
  )
}

export default CreateStore
