import React, {useState} from 'react'
import Editor from '@/components/Editor'
import {Button, Form, FormInstance, Input, Spin} from 'antd'
import UploadImg, {ImgType} from '@/components/UploadImg'
import {BannerType} from "@/api/Banners";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {createBannerThunk} from "@/store/modules/banners";

type FormDataType = {
  content: string
  key: string
  title: string
}

type AddFormPropsType = {
  onCreated?: (newBanner: BannerType) => void
}

const AddForm = (props: AddFormPropsType) => {
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imgUrl, setImgUrl] = useState<string>( '')
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const handleUploadImg = (newImg:ImgType): void => {
    formRef.current!.setFieldsValue({key: newImg.key})
    setImgUrl(`${newImg.prefixUrl}/${newImg.key}`)
  }
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
    formRef.current!.setFieldsValue({content: newContent})
  }
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  }
  const dispatch = useAppDispatch();
  const handleFormFinish = async (e: FormDataType): Promise<void> => {
    try {
      const newBanner = await dispatch(createBannerThunk({imgKey: e.key, content: e.content, title: e.title}))
      props.onCreated && props.onCreated(newBanner)
      formRef.current!.setFieldsValue({content: ''})
      setContent('')
      setImgUrl('')
      formRef.current!.setFieldsValue({key: ''})
    } catch (e) { console.log(e) }
}
  const loading = useAppSelector(state => state.loading)

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleFormFinish}
        ref={formRef}
        initialValues={{content}}
        {...layout}
      >
        <Form.Item
          name='title'
          label='标题'
          rules={[{required: true, message: '标题不能为空'}]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          name='key'
          label='图片'
          rules={[{required: true, message: '图片不能为空'}]}
        >
          <UploadImg onUploaded={handleUploadImg} imageUrl={imgUrl} />
        </Form.Item>
        <Form.Item
          name='content'
          label='内容'
          rules={[{required: true, message: '内容不能为空'}]}
        >
          <Editor value={content}  onChange={handleEditorChange}/>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 10}}
        >
          <Button htmlType='submit' type='primary'>确定</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default AddForm;
