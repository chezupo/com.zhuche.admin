import React from "react";
import {InputNumber} from "antd";

type NumberRangeRenderPropsType = {
  value?: [number, number]
  onChange?: (value: [number, number]) =>  void
}
const NumberRangeRender: React.FC<NumberRangeRenderPropsType> = props => {
  const handleStartTime = (start: number) => {
    const newValue: [number, number] = [start, 0];
    newValue[1] = props.value?.[1] || 0;
    props.onChange && props.onChange(newValue)
  }
  const handleEndTime = (end: number) => {
    const newValue: [number, number] = [0, end]
    newValue[0] = props.value?.[0] || 0
    props.onChange && props.onChange(newValue)
  }

  return (
    <>
      <InputNumber
        onChange={e => handleStartTime(e)}
        {...(props.value ? {value: props.value[0]} : {})}
      /> -
      <InputNumber
        onChange={e => handleEndTime(e)}
        {...(props.value ? {value: props.value[1]} : {})}
      />
    </>
  )
}

export default NumberRangeRender;
