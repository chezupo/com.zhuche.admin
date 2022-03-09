import React, { useContext, useState } from 'react'
import { Col, Form, Switch } from 'antd'
import { FormContext } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import TimePickerRender
  from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/TimeRange/TimePickerRender'

type TimeRangePropsType = {
  onChange?: (formatString: [string, string]) => void
}
const TimeRange: React.FC<TimeRangePropsType> = () => {
  const fullDayValue: [string, string] = ["00:00", "23:59"]
  const form = useContext(FormContext)
  const value = form?.getFieldValue("businessHours")
  const [isFullDay, setIsFullDay] = useState<boolean>(JSON.stringify(fullDayValue) === JSON.stringify(value))
  const format = "HH:mm"
  const [oldBusinessHours, setOldBusinessHours] = useState<[string, string]>(["08:00", "23:00"])
  const handleChangeFullDay = (newIsFullDay: boolean) => {
    if (newIsFullDay) {
      const oleValue = form?.getFieldValue("businessHours")
      form?.setFieldsValue({
        businessHours: ["00:00", "23:59"]
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
