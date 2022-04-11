import React, {useEffect, useState} from "react";
import {Checkbox, Col, Row} from "antd";
import {getStoreCarConfigByStoreId, getStoreCarConfigs} from "@/api/storeCarConfig";
import {isAdmin} from "@/util/AuthUtil";

type ConfigRenderPropsType = {
  value?: StoreCarConfigItemType[]
  onChange?: (value: StoreCarConfigItemType[]) => void
  data?: CarItemType
}
const ConfigRender: React.FC<ConfigRenderPropsType> = props => {
  const [options, setOptions] = useState<StoreCarConfigItemType[]>([])
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const handleInitCheckIds = () => {
    props.value && setCheckedIds(props.value.map((el): number => el.id))
  }

  useEffect(() => {
    let isMounted = true
    const setOption = () => {
      getStoreCarConfigs({}).then(res => {
        if (isMounted) {
          setOptions(res.list)
        }
      })
    }
    if (isAdmin()) {
      getStoreCarConfigByStoreId(props.data!.store.id).then(res => {
        if (isMounted) {
          setOptions(res)
        }
      })
    } else {
      setOption()
    }

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
