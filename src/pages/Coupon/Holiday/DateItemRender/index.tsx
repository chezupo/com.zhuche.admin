import React, {useEffect, useState} from "react";
import style from './style.module.less'
import {dateConvertDate} from "@/util/date";
import {Button, Col, Form, Input, Popconfirm, Row, Spin} from "antd";
import {deleteHoliday, setHoliday} from "@/api/holiday";
import {successMessage} from "@/util/messageUtil";

type DateItemRenderPropsType = {
  dateTime: Date
  onChange: (newHoliday: HolidayItemType) => void
  holiday?: HolidayItemType
  onDelete: (newHoliday: HolidayItemType) => void
}
const DateItemRender: React.FC<DateItemRenderPropsType> = props => {
  const [visitable, setVisitable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const now = dateConvertDate(new Date())
  const isInvalid = now.getTime() > props.dateTime.getTime()
  const dom = (
    <td>
      <div className={[style.main, isInvalid ? style.invalid : ''].join(' ')}>
        <div>{props.dateTime.getDate()}</div>
        <div className={style.subtitle}>{props.holiday?.mark}</div>
      </div>
    </td>
    )
  const [form] = Form.useForm()
  useEffect(() => {
    props.holiday && form.setFieldsValue({mark: props.holiday.mark})
  }, [])
  const handleChange = async (newVisitable: boolean) => {
    if (visitable && await form.getFieldsValue().mark !== props.holiday?.mark) {
      setLoading(true)
      try {
        const res: {mark: string} = await form.validateFields()
        const newHoliday = await setHoliday({
          mark: res.mark,
          day: props.dateTime.getTime()
        })
        setVisitable(false)
        successMessage()
        props.onChange && props.onChange(newHoliday)
      }finally {
        setLoading(false)
      }
    } else {
      setVisitable(newVisitable)
    }
  }
  const handleDelete = () => {
    if (props.holiday) {
      setLoading(true)
      deleteHoliday(props.holiday.id).then(() => {
        successMessage()
        setVisitable(false)
        props.onDelete(props.holiday!)
      }).finally(() => setLoading(false))
    }
  }

  return (
      <>
        {
          isInvalid && dom
        }
        {
          !isInvalid && (
            <Popconfirm
              onVisibleChange={handleChange}
              onCancel={() => setVisitable(false)}
              visible={visitable}
              title={
                <Spin spinning={loading}>
                  <Row>
                    <Col span={24}>是否标记为节假日？</Col>
                    <Col span={24}>
                      <Form
                        form={form}
                      >
                        <Row gutter={[12, 0]}>
                          <Col span={18}>
                            <Form.Item
                              rules={[{required: true, message: '备注不能为空'}]}
                              name='mark'
                            >
                              <Input onPressEnter={() => handleChange(false)} />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Button
                              disabled={!props.holiday?.mark}
                              danger
                              onClick={handleDelete}
                            >删除</Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Spin>
              }
              okText='确定'
              cancelText='取消'
            >
              {dom}
            </Popconfirm>
          )
        }
      </>
  )
}

export default DateItemRender
