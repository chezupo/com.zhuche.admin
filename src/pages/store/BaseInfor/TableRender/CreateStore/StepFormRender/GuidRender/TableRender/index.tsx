import React, { useEffect } from 'react'
import { Button, Col, Form, Row, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { ImgType } from '@/components/UploadImg'
import RenderImg from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender/ImgRender'
import TitleRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender/TitleRender'
import style from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/style.module.less'
import SubscriptionService from '@wuchuheng/rxjs'
import { FormInstance } from 'antd/lib/form/hooks/useForm'

export type GuidItemType = Omit<StoreGuideType, 'store'>
export const idToTitleName = (id: number): string  => `${id}|title`
export const idToImgName = (id: number): string => 'id' + id
const initFormData = (data: GuidItemType[]): Record<string, string> => {
  const res: Record<string, string> = {}
  data.map(el => {
    res[idToImgName(el.id)] = el.imgKey
    res[idToTitleName(el.id)] = el.title
  })

  return res
}

type TableRenderPropsType = {
  data: GuidItemType[]
  onChange: (newData: GuidItemType[]) => void
  onCreate: () => void
  onOk?: (ok: boolean) => void
  subscription?: SubscriptionService<string>
  onRef?: (form: FormInstance) => void
}
const TableRender: React.FC<TableRenderPropsType> = ({onRef ,data, onChange, onCreate, onOk, subscription}) => {
  const [form] = Form.useForm()
  const handleInit = () => {
    onRef && onRef(form)
    const subscriptionHandler = subscription?.subscription(() => {
      form.validateFields().then(() => {
        onOk && onOk(true)
      }).catch(e =>  {
        console.log(e)
      })
    })
    return () => {
      subscriptionHandler && subscription?.unSubscription(subscriptionHandler)
    }
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [data])
  const handleChangeImg = (img: ImgType, id: number) => {
    onChange(
      data.map(el => el.id === id ? {...el, imgKey: img.key, prefixUrl: img.prefixUrl} : el)
    )
  }
  const handleTitle = (newTitle: string, id: number): void => {
    onChange( data.map(el => el.id === id ? {...el, title: newTitle } : el) )
  }
  const handleDelete = (id: number): void => onChange( data.filter(el => el.id !== id) )
  const columns = [
    {
      title: '图片',
      render: (record: GuidItemType) =>   <RenderImg record={record} onchange={handleChangeImg} />
    },
    {
      title: '说明',
      render: (record: GuidItemType) => ( <TitleRender record={record} onChange={handleTitle} /> )
    },
    {
      title: '操作',
      render: (record: GuidItemType) => <DeleteOutlined style={{color: 'red'}} onClick={() => handleDelete(record.id)}/>,
    }
  ]
  const init = () => {
    form.setFieldsValue(initFormData(data))
  }
  useEffect(() => init(), [])
  useEffect(() => init(), [data])

  return (<>
    <Form
      form={form}
    >
      <Table
        pagination={false}
        rowKey={(record) => record.id }
        columns={columns}
        dataSource={data}
      />
    </Form>
    <Row>
      <Col span={24}>
        <Button
          type='dashed'
          className={style.button}
          onClick={() => onCreate()}
        >添加</Button>
      </Col>
    </Row>
  </>)
}

export default TableRender
