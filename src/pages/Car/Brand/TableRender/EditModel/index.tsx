import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Spin} from "antd";
import {UploadImgPicker} from "@/pages/Car/Brand/TableRender/CreateModal/FormRender";
import {useAppDispatch} from "@/store/hooks";
import {updateBrandThunk} from "@/store/modules/brand";
import {successMessage} from "@/util/messageUtil";

type EditModelPropsType = {
  data: BrandItemType
  onCancel: () => void
  onUpdated: () => void
}
const EditModel: React.FC<EditModelPropsType> = props => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleFinish = (newData: BrandItemType): void => {
    setLoading(true)
    dispatch(updateBrandThunk({...newData, id: props.data.id})).then( e => {
      successMessage("ζδ½ζεπππ")
      props.onUpdated()
   }).finally(() => {
      setLoading(false)
    })
  }

  return (<>
    <Spin  spinning={loading}>
      <Modal title='ηΌθΎεη' visible footer={null}
             onCancel={() => props.onCancel()}
      >
        <Form
          form={form}
          initialValues={props.data}
          onFinish={handleFinish}
        >
          <Form.Item
            label='εηε'
            name='name'
            rules={[{required: true, message: 'εηδΈθ½δΈΊη©Ί'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='εΎζ '
            name='imgKey'
            rules={[{required: true, message: 'εηεΎζ δΈθ½δΈΊη©Ί'}]}
          >
            <UploadImgPicker />
          </Form.Item>
          <Form.Item
            wrapperCol={{span: 24}}
          >
            <Row justify='center'>
              <Col>
                <Button htmlType='submit' type='primary'>ζ΄ζΉ</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  </>)
}

export default EditModel;
