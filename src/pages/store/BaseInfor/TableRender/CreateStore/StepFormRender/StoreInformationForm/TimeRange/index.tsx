import React, { useState } from 'react'
import { Col, Form, Switch } from 'antd'
import TimePickerRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/TimeRange/TimePickerRender'
import { FormInstance } from 'antd/lib/form/hooks/useForm'

type TimeRangePropsType = {
  onChange?: (formatString: [string, string]) => void
  formContext: FormInstance
}
const TimeRange: React.FC<TimeRangePropsType> = (props) => {
  const fullDayValue: [string, string] = ["00:00", "23:59"]
  const form = props.formContext
  const value = form?.getFieldValue("businessHours")
  const [isFullDay, setIsFullDay] = useState<boolean>(JSON.stringify(fullDayValue) === JSON.stringify(value))
  const format = "HH:mm"
  const [oldBusinessHours, setOldBusinessHours] = useState<[string, string]>(["08:00", "23:00"])
  const handleChangeFullDay = (newIsFullDay: boolean) => {
    if (newIsFullDay) {
      const oleValue = form?.getFieldValue("businessHours")
      props.formContext.setFieldsValue({
        businessHours: fullDayValue
        })
      setOldBusinessHours(oleValue)
    } else {
      form?.setFieldsValue({
        businessHours: oldBusinessHours
      })
    }
    setIsFullDay(newIsFullDay)
  }

  return (<>
      <Col span={8}>
        <Form.Item
          labelCol={{span: 6}}
          label="营业时间"
          name="businessHours"
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
