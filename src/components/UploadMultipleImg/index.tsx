import React, {useEffect, useMemo, useReducer, useState} from "react";
import {Modal, Upload} from "antd";
import {RcFile, UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import {getBase64} from "@/util/fileToBase64";
import {PlusOutlined} from '@ant-design/icons';
import {uploadFile} from "@/util/qiniuUploadUtil";
import SubscriptionService from "@wuchuheng/rxjs";

export type UploadMultipleImgPropsType = {
  onChange?: (keys:string[]) => void
  value?: string[]
}
const UploadMultipleImg: React.FC<UploadMultipleImgPropsType> = (props) => {
  const queueSubscription = useMemo(() =>  new SubscriptionService<(UploadFile)[]>([]), [])
  const [fileList, fileListDispatch] = useReducer((state: UploadFile[], newState: UploadFile[]): UploadFile[] => {
      return newState
    },
    [ ]
  )
  const initFileList = (): void => {
    if (props.value) {
      const currentUrls = fileList.filter(f => f.status  === 'done').map(f => f.url as string)
      const newUrls = props.value.filter(url => !currentUrls.includes(url)).map((url): UploadFile => {
        return {
          uid: url,
          name: url,
          url: url,
          status: 'done'
        }
      })
      fileListDispatch([...fileList, ...newUrls])
    }
  }
  useEffect(() => initFileList(), [props.value])
  useEffect(() => {
    queueSubscription.value = fileList
    const handler = queueSubscription.subscription((newFileList) => {
      fileListDispatch(newFileList)
      const urls = newFileList.filter(f => f.status === 'done').map(f => f.url as string)
      props.onChange && props.onChange(urls)
    })
    initFileList()

   return () => {
      queueSubscription.unSubscription(handler)
   }
  }, [])

  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj as RcFile) as string
    setPreviewImage(file.url || file.preview  as string)
    setPreviewVisible(true)
  }
  const handleChange = ({file, fileList}: UploadChangeParam): void => {
    fileListDispatch(fileList)
    const urls = fileList.filter(f => f.status === 'done').map(f => f.url as string)
    props.onChange && props.onChange(urls)
  }
  const handleBeforeUpload = (file: RcFile) => {
    uploadFile(file,{
      next: percent => {
        const index = queueSubscription.value.findIndex(f => f.uid === file.uid)
        if (index === -1) {
          queueSubscription.next(
            [...fileList, {
              uid: file.uid,
              percent: 0,
              name: 'image.png',
              status: 'uploading',
            }]
          )
        } else {
          const newFileList = JSON.parse( JSON.stringify( queueSubscription.value))
          newFileList[index].percent = percent
          queueSubscription.next(newFileList)
        }
      },
      error: (e) => {console.log(e)},
    }).then((res) => {
      const url = `${res.prefixUrl}/${res.key}`
        queueSubscription.next(queueSubscription.value.map(f => f.uid === file.uid ? {...f, status: 'done', url} : f))
    }).catch((e) => {
      console.log(e)
    })

    return Upload.LIST_IGNORE
  }

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title="预览图"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{width: '100%'}} src={previewImage}/>
      </Modal>
    </>

  )
}

export default UploadMultipleImg
