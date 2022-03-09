import React from 'react'
import { Col, Row } from 'antd'
import ReactHtmlParser from 'react-html-parser'

type FormatOptionItemPropsType = {
  value: AddressType;
  onChange: (item: AddressType) => void
  keywords?: string
}
const FormatOptionItem: React.FC<FormatOptionItemPropsType> = (props) => {
  const formatString = (str: string) => {
    const newString = str.replace(props.keywords!, `<span style='color: red'>${props.keywords}</span>`)
    return (
      <>
        {
          ReactHtmlParser(newString)
        }
      </>
    )
  }
  return (
    <Row onClick={() => {props.onChange(props.value)}}>
      <Col span={24}> 省份: {props.value.province} </Col>
      <Col span={24}> 城市: {props.value.city} </Col>
      <Col span={24}> 地区: {props.value.area} </Col>
      <Col span={24}> 名称: {props.value.name} </Col>
      <Col span={24}> 地址: {formatString(props.value.address)} </Col>
    </Row>
  )
}

export default FormatOptionItem
