import * as React from "react";
import {ReactNode, useEffect, useState} from "react";
import {Button, Divider, message, Steps} from "antd";
import style from "./style.module.less"
import SubscriptionService from "@wuchuheng/rxjs";
import CreateAccountForm from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/AccountFormRedner";
import StoreInformationForm from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm";

const { Step } = Steps;

export const areYouOkSubscription = new SubscriptionService<string>("")
export const iAmOkSubscription = new SubscriptionService<string>("")

export type StoreAccountType = {
  username: string
  password: string
}
type StepType = {
  title: string
  content: ReactNode,
  mark?: ReactNode
}
const StepFormRender: React.FC = () => {
  const [storeAccount, setStoreAccount] = useState<StoreAccountType>({ username: '1', password: '2' })

  const steps:StepType[] = [
    {
      title: '创建门店管理员账号',
      content: <CreateAccountForm
        onChange={setStoreAccount}
        data={storeAccount}
      />,
      mark: ( <p>创建门店的管理员，该账号专门负责对该门店进行管理</p>)
    },
    {
      title: '填写门店信息',
      content: (<StoreInformationForm />),
      mark: ( <p>填写门店的相关信息，用于展示给用户查看</p>)
    },
    {
      title: '创建成功',
      content: 'Last-content',
    },
  ];
  const [current, setCurrent] = React.useState(1);

  const next = () => {
    areYouOkSubscription.next("Are you Ok?")
  };
  useEffect(() => {
    const subscriptionHandler = iAmOkSubscription.subscription(() => {
      setCurrent(() => current + 1)
    })
    return () => {
      iAmOkSubscription.unSubscription(subscriptionHandler)
    }
  }, [])

  const prev = () => {
    setCurrent(current - 1);
  };

  return (<>
    <div className={style.main}>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      <div>
        {steps[current].content}
      </div>
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            成功
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
     </div>
      {steps[current].mark ?
        (
          <div className={style.guid}>
            <Divider />
            <div>
              <h3>说明</h3>
              {steps[current].mark}
            </div>
          </div>
        ): <></>}
    </div>
  </>)
}

export default StepFormRender
