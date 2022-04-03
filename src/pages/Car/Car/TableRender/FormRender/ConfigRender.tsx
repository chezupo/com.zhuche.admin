import React, {useEffect, useState} from "react";
import {Checkbox, Col, Row} from "antd";
import {getStoreCarConfigs} from "@/api/storeCarConfig";

type ConfigRenderPropsType = {
  value?: StoreCarConfigItemType[]
  onChange?: (value: StoreCarConfigItemType[]) => void
}
const ConfigRender: React.FC<ConfigRenderPropsType> = props => {
  const [options, setOptions] = useState<StoreCarConfigItemType[]>([])
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const handleInitCheckIds = () => {
    props.value && setCheckedIds(props.value.map((el): number => el.id))
  }

  useEffect(() => {
    let isMounted = true
    getStoreCarConfigs({}).then(res => {
      if (isMounted) {
        setOptions(res.list)
      }
    })
    handleInitCheckIds()
    return () => {
      isMounted = false
    }
  }, [] )
  useEffect(() => {
    handleInitCheckIds()
  }, [props.value])
  const handleChange = (checkItem: StoreCarConfigItemType) => {
    if (props.onChange) {
      if(checkedIds.includes(checkItem.id) && props.value) {
        props.onChange(
          props.value.filter(el => el.id !== checkItem.id)
        )
      } else {
        props.onChange([ ...(props.value ? [...props.value] : []) , checkItem])
      }
    }
  }

  return (<>
    <Row>
      {
        options.map(el => (
          <Col span={12} key={el.id}>
            <Checkbox
              checked={checkedIds.includes(el.id)}
              onChange={() => handleChange(el)}
            >{el.name}</Checkbox>
          </Col>
        ))
      }
    </Row>
  </>)
}

export default ConfigRender
