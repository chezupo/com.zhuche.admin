import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Spin} from "antd";
import FontIcon from "@/components/FontIcon";
import {CreateCarCategoryQueryDataType} from "@/api/carCategory";
import {useAppDispatch} from "@/store/hooks";
import {createCarCategoryThunk} from "@/store/modules/carCatetory";
import {successMessage} from "@/util/messageUtil";
import FormRender from "@/pages/Car/Category/FormRender";
import {FormInstance} from "antd/lib/form/hooks/useForm";

const CreateModel: React.FC = () => {
  const [visitable, setVisitable] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [loading, setLoading ] = useState<boolean>(false)
  const [form, setForm] = useState<FormInstance | null>(null)
  const handleFinish = (data: CreateCarCategoryQueryDataType) => {
    setLoading(true)
    dispatch(createCarCategoryThunk(data)).then(() => {
      successMessage()
      setVisitable(false)
      form && form.resetFields()
    }).finally(() => setLoading(false))
  }

  return (<>
    <Button
      icon={<FontIcon
        name={'plus'}
      />}
      style={{width: '100%'}}
      type='dashed'
      onClick={() => setVisitable(true)}
    >添加</Button>
    <Modal
      title='创建分类'
      visible={visitable}
      footer={null}
      onCancel={() => setVisitable(false)}
    >
      <Spin spinning={loading}>
          <FormRender
            onFinish={handleFinish}
            onCancel={() => setVisitable(false)}
            onRef={setForm}
          />
      </Spin>
    </Modal>
  </>)
}

export default CreateModel
