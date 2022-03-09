import TableRender, { GuidItemType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender'
import React, { useState } from 'react'
import { Col, Row } from 'antd'
import style from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/style.module.less'
import { useAppSelector } from '@/store/hooks'
import SubscriptionService from '@wuchuheng/rxjs'

type GuidRenderPropsType = {
  data: GuidItemType[];
  onChange: (newData: GuidItemType[]) => void;
  onOk: (ok: boolean) => void
  subscription: SubscriptionService<string>
  title: string;
}
const GuidItemRender: React.FC<GuidRenderPropsType> = (props) => {
  const imgPrefix = useAppSelector(state => state.configuration.imgPrefix)
  const [currentReturnPickerId, setCurrentReturnPickerId] = useState<number>(props.data.length)
  const handleCreateReturnPicker = (): void => {
    const newId = currentReturnPickerId + 1
    props.onChange([...props.data, {
      id:  newId, imgPrefix, key: "", title: ""
    }])
    setCurrentReturnPickerId(newId)
  }

  return (
    <Row>
      <Col span={24} className={style.title}>
        <h2>{props.title}</h2>
      </Col>
      <Col span={24}>
        <TableRender
          data={props.data}
          onChange={props.onChange}
          onCreate={handleCreateReturnPicker}
          onOk={props.onOk}
          subscription={props.subscription}
        />
      </Col>
    </Row>
  )
}

export default GuidItemRender
