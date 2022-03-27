import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Spin} from "antd";
import {UpdateStoreCarConfigQueryType} from "@/api/storeCarConfig";
import {useAppDispatch} from "@/store/hooks";
import {updateStoreCarConfigThunk} from "@/store/modules/storeCarConfig";
import {successMessage} from "@/util/messageUtil";

type EditRenderPropsType = {
  data: StoreCarConfigItemType
  onCancel: () => void
  onSuccess: () => void
}
const EditRender: React.FC<EditRenderPropsType> = props => {
  const [loading, setLoading]  = useState<boolean>(false)
  const [form] = Form.useForm<UpdateStoreCarConfigQueryType>()
  const dispatch = useAppDispatch()
  const handleFinish = (newData: UpdateStoreCarConfigQueryType) => {
    setLoading(true)
    dispatch(updateStoreCarConfigThunk(props.data.id, newData)).then(() =>{
      console.log("Updated storeCarConfig.", newData)
      successMessage();
      form.resetFields()
      props.onSuccess()
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Modal
        visible
        footer={null}
        onCancel={() => props.onCancel()}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            onFinish={handleFinish}
            initialValues={props.data}
          >
            <Form.Item
              label='名称'
              name='name'
              rules={[ {required: true, message: '名称不能为空'} ]}
            ><Input /></Form.Item>
            <Row justify='center' gutter={[24, 0]}>
              <Col>
                <Form.Item>
                  <Button onClick={() => props.onCancel()} >取消</Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>确定</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

export default EditRender
