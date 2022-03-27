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
      successMessage("操作成功🎉🎉🎉")
      props.onUpdated()
   }).finally(() => {
      setLoading(false)
    })
  }

  return (<>
    <Spin  spinning={loading}>
      <Modal title='编辑品牌' visible footer={null}
             onCancel={() => props.onCancel()}
      >
        <Form
          form={form}
          initialValues={props.data}
          onFinish={handleFinish}
        >
          <Form.Item
            label='品牌名'
            name='name'
            rules={[{required: true, message: '品牌不能为空'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='图标'
            name='imgKey'
            rules={[{required: true, message: '品牌图标不能为空'}]}
          >
            <UploadImgPicker />
          </Form.Item>
          <Form.Item
            wrapperCol={{span: 24}}
          >
            <Row justify='center'>
              <Col>
                <Button htmlType='submit' type='primary'>更改</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  </>)
}

export default EditModel;
