import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row, Tag} from "antd";
import {provinceSubscription} from "@/pages/store/BaseInfor/FilterRender";

type TagsRenderPropsType = {
  value?: string[]
  onChange?: (value: string[]) => void

}
const TagsRender: React.FC<TagsRenderPropsType> = props => {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>('')
  const handleInit = () => props.value && setTags(props.value)
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.value])
  const handleClose = (index: number) => {
    props.onChange && props.onChange(tags.filter((_, i) => i !== index))
  }
  const handlePushNewTag = () => {
    if (newTag.length > 0 && props.onChange) {
      props.onChange([...tags, newTag])
      setNewTag('')
    }
  }

  return (<>
    <Row gutter={[0, 12]}>
      {
        tags.map((tag, i) =>
          <Col key={i + tag}>
            <Tag closable onClose={() => handleClose(i)}>{tag}</Tag>
          </Col>
        )
      }
      <Col span={24}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Input
            value={newTag}
            placeholder='添加新标签, 然后确定'
            onChange={e => setNewTag(e.target.value)}
            onPressEnter={() => handlePushNewTag()}
          />
          <Button onClick={() => handlePushNewTag()}  disabled={newTag.length === 0}>添加</Button>
        </div>
      </Col>
    </Row>
  </>)
}

export default TagsRender
