import React, {useState} from "react";
import {Button, Col, Modal, Spin} from "antd";
import style from "@/pages/Car/Car/TableRender/style.module.less";
import FontIcon from "@/components/FontIcon";
import FormRender from "@/pages/Car/Car/TableRender/FormRender";
import {useAppDispatch} from "@/store/hooks";
import {createCarHunk} from "@/store/modules/car";
import {successMessage} from "@/util/messageUtil";

const CreateModal:React.FC = () => {
  const [visitable, setVisitable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isResetForm, setIsResetForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleFinish = (newData: Omit<CarItemType, 'id'>  ) => {
    setLoading(true)
    dispatch(createCarHunk(newData))
      .then(() => {
        successMessage()
        setIsResetForm(!isResetForm)
        setVisitable(false)
      }).finally(
      () => setLoading(false)
    )
  }

  return (<>
    <Button type='dashed' className={style.button} icon={<FontIcon name='plus' />}
            onClick={() => setVisitable(true)}
    >添加汽车</Button>
    <Modal
      title='添加汽车'
      width={'40%'}
      visible={visitable}
      onCancel={() => setVisitable(false)}
      footer={null}
    >
      <Spin  spinning={loading}>
        <FormRender
          onFinish={handleFinish}
          isReset={isResetForm}
        />
      </Spin>
    </Modal>
  </>)

}

export default CreateModal
