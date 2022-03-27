import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Spin} from "antd";
import FontIcon from "@/components/FontIcon";
import {CreateStoreCarConfigQueryType} from "@/api/storeCarConfig";
import {useAppDispatch} from "@/store/hooks";
import {createStoreCarConfigThunk} from "@/store/modules/storeCarConfig";
import {successMessage} from "@/util/messageUtil";

const CreateRender: React.FC = () => {
  const [visitable, setVisitable] = useState<boolean>(true)
  const [loading, setLoading]  = useState<boolean>(false)
  const [form] = Form.useForm<CreateStoreCarConfigQueryType>()
  const dispatch = useAppDispatch()
  const handleFinish = (newData: CreateStoreCarConfigQueryType) => {
    dispatch(createStoreCarConfigThunk(newData)).then(() =>{
      console.log("Created storeCarConfig.", newData)
      successMessage();
      form.resetFields()
      setVisitable(false)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Button
        type='dashed'
        icon={<FontIcon name='plus'/>}
        style={{width: '100%'}}
        onClick={() => setVisitable(true)}
      >
        添加
      </Button>
      <Modal
        visible={visitable}
        footer={null}
        onCancel={() => setVisitable(false)}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            onFinish={handleFinish}
          >
            <Form.Item
              label='名称'
              name='name'
              rules={[ {required: true, message: '名称不能为空'} ]}
            ><Input /></Form.Item>
            <Row justify='center' gutter={[24, 0]}>
              <Col>
                <Form.Item>
                  <Button onClick={() => setVisitable(false)} >取消</Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>添加</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

export default CreateRender
