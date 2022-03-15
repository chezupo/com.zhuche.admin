import React from 'react'
import { Button } from 'antd'
import { StepIndexType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/index'

type StepButtonRenderPropsType = {
  currentStep: StepIndexType
  onNext: () => void
  onPrev: () => void
  stepList: StepIndexType[]
}

const StepButtonRender: React.FC<StepButtonRenderPropsType> = (props) => {
  const {stepList} = props
  const hasNestStep: boolean = stepList.findIndex(i => i === props.currentStep) + 1 < stepList.length
  const hasPrevStep: boolean = stepList.findIndex(i => i === props.currentStep) !== 0
  const isLastStep: boolean = stepList.findIndex(i => i === props.currentStep) + 1 === stepList.length

  return (
    <div>
      {hasNestStep && (
        <Button type="primary" onClick={() =>props.onNext()}>
          下一步
        </Button>
      )}
      {isLastStep && (
        <Button type="primary" onClick={
          () => {
            props.onNext()
          }
        }>确定</Button>
      )}
      { hasPrevStep && (
        <Button style={{ margin: '0 8px' }} onClick={() => props.onPrev()}>
          上一步
        </Button>
      )}
    </div>
  )
}

export default StepButtonRender

