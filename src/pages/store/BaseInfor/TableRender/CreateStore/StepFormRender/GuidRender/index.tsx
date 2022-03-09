import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import style from './style.module.less'
import GuidItemRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/GuidItemRender'
import SubscriptionService from '@wuchuheng/rxjs'
import {
  areYouOkSubscription,
  GuidType,
  iAmOkSubscription,
  StepIndexType
} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender'

const isPickupGuidSubscription = new SubscriptionService<string>('')
const isReturnGuidSubscription = new SubscriptionService<string>('')
type GuidRenderPropsType = {
  data: GuidType
  onChange: (newGuids: GuidType) => void
}
const GuidRender: React.FC<GuidRenderPropsType> = (props) => {
  const [isReturnGuidOk, setIsReturnOk] = useState<boolean>(false)
  const [isPickupGuidOk, setIsPickupGuidOk] = useState<boolean>(false)
  useEffect(() => {
    const handler = areYouOkSubscription.subscription(() => {
      isReturnGuidSubscription.next("Are you ok?")
      isPickupGuidSubscription.next("Are you ok?")
    })
    return () => {
      areYouOkSubscription.unSubscription(handler)
    }
  }, [])
  useEffect(() => {
    isPickupGuidOk && isReturnGuidOk && iAmOkSubscription.next(StepIndexType.STEP_3)
  }, [isReturnGuidOk, isPickupGuidOk])

  return (
    <Row className={style.main} gutter={[24, 0]}>
      <Col span={12}>
        <GuidItemRender
          title="取车指引"
          onChange={(pickupGuids) => props.onChange({...props.data, pickupGuids})}
          data={props.data.pickupGuids}
          onOk={setIsPickupGuidOk}
          subscription={isPickupGuidSubscription}
        />
      </Col>
      <Col span={12}>
        <GuidItemRender
          title="还车指引"
          onChange={(returnGuids) => props.onChange({...props.data, returnGuids}) }
          data={props.data.returnGuids}
          onOk={setIsReturnOk}
          subscription={isReturnGuidSubscription}
        />
      </Col>
    </Row>
  )
}

export default GuidRender
