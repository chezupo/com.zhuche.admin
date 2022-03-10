import React from 'react'
import { ColumnsType } from 'antd/lib/table/interface'
import { Image, Table } from 'antd'

type GuidePreviewRenderPropsType = {
  data: StoreGuideType[]
}
const GuidePreviewRender: React.FC<GuidePreviewRenderPropsType> = (props) => {
  const columns:ColumnsType<StoreGuideType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '指南图',
      render: (value, record ) => {
        return (
          <Image
            width={100}
            src={`${record.prefixUrl}/${record.imgKey}`}
          />
        )
      }
    }
  ]

  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={props.data}
    />
  )

}

export default GuidePreviewRender
