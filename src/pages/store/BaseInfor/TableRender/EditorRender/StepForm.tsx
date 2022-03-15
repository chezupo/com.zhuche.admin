import * as React from 'react'
import { ReactNode, useEffect, useReducer, useRef } from 'react'
import { Steps } from 'antd'
import style from '../CreateStore/StepFormRender/style.module.less'
import SubscriptionService from '@wuchuheng/rxjs'
import StoreInformationForm, { CreateStoreType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import StepButtonRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StepButtonRender'
import MarkRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/MarkRender'
import GuidRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender'
import { GuidItemType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender'
import { convertCreateStore, initGuid } from '../CreateStore/StepFormRender/data'

const { Step } = Steps;

export const areYouOkSubscription = new SubscriptionService<string>("")
export enum StepIndexType {
  STEP_1,
  STEP_2,
}

type StepType = {
  title: string
  content: ReactNode,
  mark?: ReactNode
}
export const stepList: StepIndexType[] = [
  StepIndexType.STEP_1,
  StepIndexType.STEP_2
]

export type GuidType = {
  pickupGuids: GuidItemType[]
  returnGuids: GuidItemType[]
}
enum StepReplayType {
  NEXT,
  PREV,
  RESET
}
type StepFormRenderPropsType = {
  onChange: (createStore:CreateStoreType, guid: GuidType) => void
  storeData: StoreItemType
}
const StepFormRender: React.FC<StepFormRenderPropsType> = (props) => {
  const createStoreDataRef = useRef<CreateStoreType>()
  const [createStoreData,createStoreDataDispatch] = useReducer( (state:CreateStoreType, newState: CreateStoreType ):CreateStoreType  => {
    createStoreDataRef.current = newState
    return newState
  }, convertCreateStore(props.storeData))
  const guidRef = useRef<GuidType>()
  const [guid, guidDispatch] = useReducer((state: GuidType, newState: GuidType) => {
    guidRef.current = newState
    return newState
  }, initGuid)
  const handleInit = () => {
    createStoreDataDispatch(convertCreateStore(props.storeData))
    guidDispatch({
      returnGuids: props.storeData.returnGuides,
      pickupGuids: props.storeData.pickupGuides
    })
    currentStepIndexDispatch(StepReplayType.RESET)
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.storeData])
  const handleChange = () => {
    if (currentStepIndex === StepIndexType.STEP_2) {
      handleSubmit()
    } else {
      currentStepIndexDispatch(StepReplayType.NEXT)
    }
  }

  const steps:StepType[] = [
    {
      title: '填写门店信息',
      content: (<StoreInformationForm
        areYouOk={areYouOkSubscription}
        onOk={handleChange}
        data={createStoreData}
        onChange={createStoreDataDispatch}
      />),
      mark: ( <p>填写门店的相关信息，用于展示给用户查看</p>)
    },
    {
      title: '取/还车指南',
      content: <GuidRender
        data={guid}
        onOk={handleChange}
        areYouOk={areYouOkSubscription}
        onChange={guidDispatch}
      />,
      mark: ( <p>上传取车各还车指引</p>)
    },
  ];

  const [currentStepIndex, currentStepIndexDispatch] = React.useReducer((state: StepIndexType, action:  StepReplayType ): StepIndexType => {
    if (action === StepReplayType.RESET) return StepIndexType.STEP_1
    const index = stepList.findIndex(i => i === state)
    return action === StepReplayType.NEXT ? index + 1 : index - 1
  }, StepIndexType.STEP_1);
  const next = () => {
    areYouOkSubscription.next("Are you Ok?")
  };

  const prev = () => {
    currentStepIndexDispatch(StepReplayType.PREV)
  };
  const handleSubmit = () => {
    props.onChange(
      createStoreDataRef.current as CreateStoreType,
      guidRef.current as GuidType
    )
  }

  return (<>
    <div className={style.main}>
      <Steps current={currentStepIndex}>
        {steps.map(item => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      {steps[currentStepIndex].content}
      <StepButtonRender
        stepList={stepList}
        currentStep={currentStepIndex}
        onNext={next}
        onPrev={prev}
      />
      <MarkRender data={steps[currentStepIndex].mark} />
    </div>
  </>)
}

export default StepFormRender

