import React, {useState} from "react";
import {Button, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormRender from "./FormRender";

const CreateForm: React.FC = () => {
  const [visitable, setVisitable] = useState<boolean>(false)
  return (
    <>
      <Button
        type='dashed'
        style={{width: '100%'}}
        icon={<PlusOutlined/>}
        onClick={() => setVisitable(true)}
      >添加</Button>
      <Modal
        onCancel={() => setVisitable(false) }
        title='创建品牌'
        visible={visitable}
        footer={null}
      >
        <FormRender onSuccess={() => setVisitable(false)} />
      </Modal>
    </>
  )
}

export default CreateForm
