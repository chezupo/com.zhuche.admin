import React, { useState } from 'react'
import Editor from '@/components/Editor'
import { Button, Form, FormInstance } from 'antd'
import UploadImg from '@/components/UploadImg'

type FormDataType = {
  content: string
  key: string
}
const AddForm = () => {
  const [content, setContent] = useState<string>('<p>hello</p>')
  const formRef = React.useRef<FormInstance>(null);
  const handleUploadImg = (key: string): void => {
    formRef.current!.setFieldsValue({key})
  }
  const handleEditorChange = (content: string) => {
    formRef.current!.setFieldsValue({content})
  }
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  }
  const handleFormFinish = (e: FormDataType): void => {
    console.log(e)
  }
  return (
      <Form
        onFinish={handleFormFinish}
        ref={formRef}
        {...layout}
      >
        <Form.Item
          name='key'
          label='图片'
          rules={[{required: true, message: '图片不能为空'}]}
        >
          <UploadImg onUploaded={handleUploadImg} />
        </Form.Item>

        <Form.Item
          name='content'
          label='内容'
          rules={[{required: true, message: '内容不能为空'}]}
        >
          <Editor value={content} onChange={handleEditorChange}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 10}}
        >
          <Button htmlType='submit' type='primary'>确定</Button>
        </Form.Item>
      </Form>
    );
}

export default AddForm;
