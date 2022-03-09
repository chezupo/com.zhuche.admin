import React from 'react'
import { Form, Input } from 'antd'
import {
  GuidItemType,
  idToTitleName
} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/GuidRender/TableRender/index'

const TitleRender: React.FC<{record: GuidItemType; onChange: (newTitle: string, id: number) => void}> = ({record, onChange}) => {
  return (
    <Form.Item
      name={idToTitleName( record.id)}
      rules={[{required: true, message: '标题不能为空'}]}
    >
      <Input onChange={e => onChange(e.target.value, record.id)} />
    </Form.Item>
  )
}

export default TitleRender

