import React, { useState } from 'react'
import StepFormRender, { GuidType } from '@/pages/store/BaseInfor/TableRender/EditorRender/StepForm'
import { CreateStoreType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import { useAppDispatch } from '@/store/hooks'
import { updateThunk } from '@/store/modules/stores'
import { Spin } from 'antd'

type EditorRenderPropsType = {
  data: StoreItemType
  onCancel: () => void
  onSuccess: () => void
}
const EditorRender: React.FC<EditorRenderPropsType> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch  = useAppDispatch()
  const handleChange = (createStore:CreateStoreType, guid: GuidType) => {
    setLoading(true)
    dispatch(updateThunk(
      props.data.id,
      {
        banners: createStore.banners,
        areaCode: createStore.address.areaCode,
        address: createStore.address.address,
        lng: createStore.address.lng,
        lat: createStore.address.lat,
        starAt: createStore.businessHours[0],
        endAt: createStore.businessHours[1],
        name: createStore.name,
        mark: createStore.mark,
        servicePhone: createStore.servicePhone,
        isStation: createStore.isAirport,
        isAirport: createStore.isStation,
        isSelfService: createStore.isSelfService,
        pickupGuids: guid.pickupGuids,
        returnGuids: guid.returnGuids
      }
    )).then(() => {
      setLoading(false)
      props.onSuccess()
    }).catch(e => {
      setLoading(false)
    })
  }
  return (
    <Spin spinning={loading} >
      <StepFormRender
        onChange={handleChange}
        storeData={props.data}
      />
    </Spin>
  )
}

export default EditorRender
