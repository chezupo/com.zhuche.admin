import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import style from './style.module.less'
import GuidItemRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/GuidItemRender'
import SubscriptionService from '@wuchuheng/rxjs'
import { GuidType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender'
import { GuidItemType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender'

const isPickupGuidSubscription = new SubscriptionService<string>('')
const isReturnGuidSubscription = new SubscriptionService<string>('')
type GuidRenderPropsType = {
  data: GuidType
  onChange: (newGuids: GuidType) => void
  areYouOk: SubscriptionService<string>
  onOk: () => void
}
const GuidRender: React.FC<GuidRenderPropsType> = (props) => {
  const [isReturnGuidOk, setIsReturnOk] = useState<boolean>(false)
  const [isPickupGuidOk, setIsPickupGuidOk] = useState<boolean>(false)
  const handleInit = () => {
    setIsReturnOk(false)
    setIsReturnOk(false)
    const handler = props.areYouOk.subscription(() => {
      isReturnGuidSubscription.next("Are you ok?")
      isPickupGuidSubscription.next("Are you ok?")
    })
    return () => {
      props.areYouOk.unSubscription(handler)
    }
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.data])

  useEffect(() => {
    isPickupGuidOk && isReturnGuidOk && props.onOk()
  }, [isReturnGuidOk, isPickupGuidOk])

  const handleChangePickupGuide = (pickupGuids: GuidItemType[]) => {
    const index = pickupGuids.findIndex(el => el.imgKey.length === 0 || el.title.length === 0)
    index !== -1 && setIsPickupGuidOk(false)
    props.onChange({...props.data, pickupGuids})
  }
  const handleChangeReturnGuides = (returnGuids: GuidItemType[]) => {
    const index = returnGuids.findIndex(el => el.imgKey.length === 0 || el.title.length === 0)
    index !== -1 && setIsReturnOk(false)
    props.onChange({...props.data, returnGuids})
  }

  return (
    <Row className={style.main} gutter={[24, 0]}>
      <Col span={12}>
        <GuidItemRender
          title="取车指引"
          onChange={handleChangePickupGuide}
          data={props.data.pickupGuids}
          onOk={() => {setIsPickupGuidOk(true)}}
          subscription={isPickupGuidSubscription}
        />
      </Col>
      <Col span={12}>
        <GuidItemRender
          title="还车指引"
          onChange={handleChangeReturnGuides}
          data={props.data.returnGuids}
          onOk={() => {setIsReturnOk(true)} }
          subscription={isReturnGuidSubscription}
        />
      </Col>
    </Row>
  )
}

export default GuidRender
