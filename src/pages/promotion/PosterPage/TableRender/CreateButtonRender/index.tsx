import React, {useState} from "react";
import {Button, Col, Modal, Row, Spin} from "antd";
import style from "@/pages/promotion/PosterPage/TableRender/style.module.less";
import FontIcon from "@/components/FontIcon";
import {createPoster} from "@/api/promotionPoster";
import {successMessage} from "@/util/messageUtil";
import PreviewRender from "@/pages/promotion/PosterPage/TableRender/CreateButtonRender/PreviewRender";
import FormRender, {FormDataType} from "@/pages/promotion/PosterPage/TableRender/components/FormRender";

type CreateButtonRenderPropsType = {
  onCreated: () => void
}
const CreateButtonRender: React.FC<CreateButtonRenderPropsType> = props => {
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinished = (value: FormDataType) => {
    setLoading(true)
    createPoster(value)
      .then(() => {
        successMessage()
        setVisible(false)
        props.onCreated()
      })
      .finally(() => setLoading(false))
  }
  const [formData, setFormData] = useState<FormDataType>({
    url: '',
    size: 0,
    positionX: 0,
    positionY: 0
  })

  return (<>
    <Spin spinning={loading}>
      <Button
        className={style.button}
        type='dashed'
        icon={<FontIcon name='plus' />}
        onClick={() => setVisible(true)}
      >添加</Button>
      <Modal
        title='创建推广海报'
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        width='80%'
      >
        <Row >
          <Col span={12}>
            <FormRender
              onFinish={handleFinished}
              onChange={setFormData}
              formData={formData}
            />
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>预览:</Col>
              <Col span={12}>
                <PreviewRender
                  formData={formData}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </Spin>
  </>)
}

export default CreateButtonRender
