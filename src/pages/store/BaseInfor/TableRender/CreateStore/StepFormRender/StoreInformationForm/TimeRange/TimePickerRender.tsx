import React from 'react'
import { RangeValue } from 'rc-picker/lib/interface'
import moment from 'moment'
import { TimePicker } from 'antd'

type FormatStringType = [string, string]
type TimePickerRenderPropsType = {
  value?: [string, string]
  format: string
  isFullDay: boolean
  onChange?: (formatString: FormatStringType) => void
}

const TimePickerRender: React.FC<TimePickerRenderPropsType> = (props) => {
  const handleChange = (values: RangeValue<moment.Moment>, formatString: FormatStringType) => {
    props.onChange && props.onChange(formatString)
  }
  console.log(props.value)

  return (<TimePicker.RangePicker
    onChange={handleChange}
    value={[
      moment((props.value as FormatStringType)[0], props.format),
      moment((props.value as FormatStringType)[1], props.format)
    ]}
    disabled={props.isFullDay}
    style={{ width: '100%' }}
    placeholder={['开始时间', '结束时间']}
    format={props.format}
  />)
}

export default TimePickerRender
