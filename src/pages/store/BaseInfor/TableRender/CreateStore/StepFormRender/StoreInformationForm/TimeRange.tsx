import React, { useContext, useState } from 'react'
import { Col, Form, Switch, TimePicker } from 'antd'
import moment from 'moment'
import { RangeValue } from 'rc-picker/lib/interface'
import { StoreItemType } from '@/store/modules/stores'
import { FormContext } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/index'

type TimePickerRenderPropsType = {
  value?: [string, string]
  format: string
  isFullDay: boolean
  onChange?: [string, string]
}
const TimePickerRender: React.FC<TimePickerRenderPropsType> = (props) => {
  const form = useContext(FormContext)
  const handleChange = (values: RangeValue<moment.Moment>, formatString: [string, string]) => {
    props.onChange && props.onChange(formatString)
  }

  return (<TimePicker.RangePicker
    onChange={handleChange}
    value={[
      moment(props.value![0], props.format),
      moment(props.value![1], props.format)
    ]}
    disabled={props.isFullDay}
    style={{ width: '100%' }}
    placeholder={['开始时间', '结束时间']}
    format={props.format}
  />)
}


type TimeRangePropsType = {
  onChange?: (formatString: [string, string]) => void
}
const TimeRange: React.FC<TimeRangePropsType> = (props) => {
  const fullDayValue: [string, string] = ["00:00", "23:59"]
  const form = useContext(FormContext)
  const value = form?.getFieldValue("businessHourse")
  const [isFullDay, setIsFullDay] = useState<boolean>(JSON.stringify(fullDayValue) === JSON.stringify(value))
  const format = "HH:mm"
  const [oldBusinessHourse, setOldBusinessHourse] = useState<[string, string]>(["08:00", "23:00"])
  const handleChangeFullDay = (newIsFullDay: boolean) => {
    if (newIsFullDay) {
      const oleValue = form?.getFieldValue("businessHourse")
      form?.setFieldsValue({
        businessHourse: ["00:00", "23:59"]
      })
      setOldBusinessHourse(oleValue)
    } else {
      form?.setFieldsValue({
        businessHourse: oldBusinessHourse
      })
    }
    setIsFullDay(newIsFullDay)
  }

  return (<>
      <Col span={8}>
        <Form.Item
          labelCol={{span: 6}}
          label="营业时间"
          name="businessHourse"
          rules={[{required: true, message: '营业时间不能为空'}]}
        >
          <TimePickerRender format={format} isFullDay={isFullDay}/>
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item
          labelCol={{span: 12}}
          label='24小时营业'
        >
          <Switch
            checked={isFullDay}
            onChange={handleChangeFullDay}
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Form.Item>
      </Col>
    </>
  )
}

export default TimeRange
