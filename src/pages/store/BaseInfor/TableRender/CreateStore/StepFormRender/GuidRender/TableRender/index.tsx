import React, { useEffect } from 'react'
import { Button, Col, Form, Row, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { ImgType } from '@/components/UploadImg'
import RenderImg from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender/ImgRender'
import TitleRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender/TitleRender'
import style from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/style.module.less'
import SubscriptionService from '@wuchuheng/rxjs'

export type GuidItemType = {
  id: number
  key: string
  imgPrefix: string
  title: string
}
export const idToTitleName = (id: number): string  => `${id}|title`
export const idToImgName = (id: number): string => 'id' + id
export const getIdByImgName = (id: string): number => parseInt(id.substring(2))
const initFormData = (data: GuidItemType[]): Record<string, string> => {
  const res: Record<string, string> = {}
  data.map(el => {
    res[idToImgName(el.id)] = el.key
    res[idToTitleName(el.id)] = el.title
  })

  return res
}

type TableRenderPropsType = {
  data: GuidItemType[]
  onChange: (newData: GuidItemType[]) => void
  onCreate: () => void
  onOk: (ok: boolean) => void
  subscription: SubscriptionService<string>
}
const TableRender: React.FC<TableRenderPropsType> = ({data, onChange, onCreate, onOk, subscription}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    const subscriptionHandler = subscription.subscription(() => {
      form.validateFields().then(() => {
        onOk(true)
      }).catch(() =>  {
        onOk(false)
      })
    })
    return () => {
      subscription.unSubscription(subscriptionHandler)
    }
  }, [])
  const handleChangeImg = (img: ImgType, id: number) => {
    onChange(
      data.map(el => el.id === id ? {...el, key: img.key, imgPrefix: img.prefixUrl} : el)
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
