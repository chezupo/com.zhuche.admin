import React, {useEffect, useState} from "react";
import {Button, Form, Input, Spin} from "antd";
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
  const [editBanner, setEditorBanner] = useState<BannerType>(props.data)
  const imgPrefix = useAppSelector(state => state.configuration.imgPrefix)
  const url = `${imgPrefix}/${props.data.imgKey}`
  const [fullImg, setFullImg] = useState<string>(url)
  const [form] = Form.useForm();
  const handleUploadImg = (newImg:ImgType): void => {
    form.setFieldsValue({key: newImg.key})
    setEditorBanner(() => ({...editBanner, imgKey: newImg.key}) )
    setFullImg(`${imgPrefix}/${newImg.key}`)
  }
  const handleEditorChange = (newContent: string) => {
    setEditorBanner(() => ({...editBanner, content: newContent}))
    form.setFieldsValue({content: newContent})
  }
  const init = () => {

    form.setFieldsValue(props.data)
    setEditorBanner(props.data)
    setFullImg(`${imgPrefix}/${props.data.imgKey}`)
  }
  useEffect(() =>  init(), [imgPrefix, props.data])
  useEffect(() => init, [])

  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  }
  const dispatch = useAppDispatch();
  const handleFormFinish = async (): Promise<void> => {
    try {
      const newBanner = await dispatch(updateBannerThunk(editBanner))
      form.setFieldsValue({content: '', imgKey: ''})
      setEditorBanner(() => ({...editBanner, content: ''}))
      props.onSuccess && props.onSuccess(newBanner)
    } catch (e) { console.log(e) }
  }
  const loading = useAppSelector(state => state.loading)

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleFormFinish}
        initialValues={editBanner}
        {...layout}
      >
        <Form.Item
          name='title'
          label='??????'
          rules={[{required: true, message: '??????????????????'}]}
        >
          <Input value={editBanner.title} onChange={e => setEditorBanner(() => ({...editBanner, title: e.target.value}))} />
        </Form.Item>
        <Form.Item
          name='imgKey'
          label='??????'
          rules={[{required: true, message: '??????????????????'}]}
        >
          <UploadImg onUploaded={handleUploadImg} imageUrl={fullImg} />
        </Form.Item>
        <Form.Item
          name='content'
          label='??????'
          rules={[{required: true, message: '??????????????????'}]}
        >
          <Editor value={editBanner.content}  onChange={handleEditorChange}/>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 10}}
        >
          <Button htmlType='submit' type='primary'>??????</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default EditForm
