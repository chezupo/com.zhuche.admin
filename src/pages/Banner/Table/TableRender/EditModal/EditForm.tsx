import React, {useEffect, useState} from "react";
import {Button, Form, FormInstance, Spin} from "antd";
import UploadImg, {ImgType} from "@/components/UploadImg";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import Editor from "@/components/Editor";
import {BannerType} from "@/api/Banners";
import {updateBannerThunk} from "@/store/modules/banners";

type EditFormPropsType = {
  data: BannerType
  onSuccess?: (banner: BannerType) => void
}
const EditForm: React.FC<EditFormPropsType> = (props) => {
  const imgPrefix = useAppSelector(state => state.configuration.imgPrefix)
  const [content, setContent] = useState<string>(props.data.content)
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const [imgKey, setImgUrl] = useState<string>(props.data.imgKey)
  const handleUploadImg = (newImg:ImgType): void => {
    formRef.current!.setFieldsValue({key: newImg.key})
    setImgUrl(newImg.key)
  }
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
    formRef.current!.setFieldsValue({content: newContent})
  }
  useEffect(() => {
    const {content, imgKey} = props.data
    form.setFieldsValue({content, imgKey})
    console.log(content)
    console.log(imgKey)

  }, [props.data])
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  }
  const dispatch = useAppDispatch();
  const handleFormFinish = async (): Promise<void> => {
    try {
      const newBanner = await dispatch(updateBannerThunk({id: props.data.id, imgKey: imgKey, content}))
      formRef.current!.setFieldsValue({content: ''})
      setContent('')
      formRef.current!.setFieldsValue({key: ''})
      props.onSuccess && props.onSuccess(newBanner)
    } catch (e) { console.log(e) }

  }
  const loading = useAppSelector(state => state.loading)

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleFormFinish}
        ref={formRef}
        initialValues={{content , imgKey}}
        {...layout}
      >
        <Form.Item
          name='imgKey'
          label='图片'
          rules={[{required: true, message: '图片不能为空'}]}
        >
          <UploadImg onUploaded={handleUploadImg} imageUrl={`${imgPrefix}/${imgKey}`} />
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

export default EditForm
