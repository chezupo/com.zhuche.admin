import * as React from 'react'
import { ReactNode, useEffect, useReducer, useRef } from 'react'
import { Steps } from 'antd'
import style from './style.module.less'
import SubscriptionService from '@wuchuheng/rxjs'
import CreateAccountForm from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/AccountFormRedner'
import StoreInformationForm, { CreateStoreType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import StepButtonRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StepButtonRender'
import MarkRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/MarkRender'
import GuidRender from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender'
import { GuidItemType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender'
import { resetSubscription } from '@/pages/store/BaseInfor/TableRender/CreateStore'
import { initGuid, initStoreData, intiStoreAccount } from './data'

const { Step } = Steps;

export const areYouOkSubscription = new SubscriptionService<string>("")
export enum StepIndexType {
  STEP_1,
  STEP_2,
  STEP_3
}
export const iAmOkSubscription = new SubscriptionService<StepIndexType>(StepIndexType.STEP_1)

export type StoreAccountType = {
  username: string
  password: string
}
type StepType = {
  title: string
  content: ReactNode,
  mark?: ReactNode
}
export const stepList: StepIndexType[] = [
  StepIndexType.STEP_1,
  StepIndexType.STEP_2,
  StepIndexType.STEP_3,
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
  onChange: (storeAccount: StoreAccountType, createStore:CreateStoreType, guid: GuidType) => void
}
const StepFormRender: React.FC<StepFormRenderPropsType> = (props) => {
  const storeAccountRef = useRef<StoreAccountType>()
  const [storeAccount, storeAccountDispatch] = useReducer((state: StoreAccountType, newState: StoreAccountType): StoreAccountType => {
    storeAccountRef.current = newState;
    return newState
  }, intiStoreAccount)
  const createStoreDataRef = useRef<CreateStoreType>()
  const [createStoreData,createStoreDataDispatch] = useReducer( (state:CreateStoreType, newState: CreateStoreType ):CreateStoreType  => {
    createStoreDataRef.current = newState
    return newState
  }, initStoreData)
  const guidRef = useRef<GuidType>()
  const [guid, guidDispatch] = useReducer((state: GuidType, newState: GuidType) => {
    guidRef.current = newState
    return newState
  }, initGuid)
  //  重置清空
  useEffect(() => {
    const subscriptionHandler = resetSubscription.subscription(() => {
      storeAccountDispatch(intiStoreAccount)
      createStoreDataDispatch(initStoreData)
      guidDispatch(initGuid)
      currentStepIndexDispatch(StepReplayType.RESET)
    })
    return () => {
      resetSubscription.unSubscription(subscriptionHandler)
    }
  }, [])

  const steps:StepType[] = [
    {
      title: '创建门店管理员账号',
      content: <CreateAccountForm
        onChange={storeAccountDispatch}
        data={storeAccount}
      />,
      mark: ( <p>创建门店的管理员，该账号专门负责对该门店进行管理</p>)
    },
    {
      title: '填写门店信息',
      content: (<StoreInformationForm
        data={createStoreData}
        onChange={createStoreDataDispatch}
      />),
      mark: ( <p>填写门店的相关信息，用于展示给用户查看</p>)
    },
    {
      title: '取/还车指南',
      content: <GuidRender
        data={guid}
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
  const initSubscription = () => {
    const subscriptionHandler = iAmOkSubscription.subscription((message) => {
      if (message === StepIndexType.STEP_3) {
        handleSubmit()
      } else {
        currentStepIndexDispatch(StepReplayType.NEXT)
      }
    })
    return () => {
      iAmOkSubscription.unSubscription(subscriptionHandler)
    }
  }
  useEffect(() => initSubscription(), [])

  const prev = () => {
    currentStepIndexDispatch(StepReplayType.PREV)
  };
  const handleSubmit = () => {
    props.onChange(
      storeAccountRef.current as StoreAccountType,
      createStoreDataRef.current as CreateStoreType,
      guidRef.current || initGuid
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
        currentStep={currentStepIndex}
        onNext={next}
        onPrev={prev}
      />
      <MarkRender data={steps[currentStepIndex].mark} />
    </div>
  </>)
}

export default StepFormRender
