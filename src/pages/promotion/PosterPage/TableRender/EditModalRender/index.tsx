import React, {useState} from "react";
import {Col, Modal, Row, Spin} from "antd";
import FormRender, {FormDataType} from "@/pages/promotion/PosterPage/TableRender/components/FormRender";
import PreviewRender from "@/pages/promotion/PosterPage/TableRender/CreateButtonRender/PreviewRender";
import {updatePoster} from "@/api/promotionPoster";
import {successMessage} from "@/util/messageUtil";

type EditModalRenderPropsType = {
  onCancel: () => void
  formData: PosterItemType
  onUpdated: () => void
}
const EditModalRender: React.FC<EditModalRenderPropsType> = props => {
  const [formData, setFormData] = useState<FormDataType>(props.formData)
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = (newValue: FormDataType) => {
    setLoading(true)
    updatePoster(props.formData.id, newValue)
      .then(() => {
        successMessage()
        props.onUpdated()
      })
      .finally(() => setLoading(false))
  }

  return (<>
    <Modal
      title='编辑海报'
      visible={true}
      width='80%'
      footer={null}
      onCancel={props.onCancel}
    >
      <Spin spinning={loading}>
        <Row>
          <Col span={12}>
            <FormRender
              onFinish={handleFinish}
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
      </Spin>
    </Modal>

  </>)
}

export default EditModalRender
