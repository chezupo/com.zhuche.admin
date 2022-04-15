import React from "react";
import style from './style.module.less';
import FontIcon from "@/components/FontIcon";
import {dateConvertMonth, dateConvertNextMonth, dateConvertPrevMonth} from "@/util/date";
import {Button} from "antd";

type DateRenderPropsType = {
  currentMonthDate: Date
  onChange: (newDate: Date) => void
}
const DateRender: React.FC<DateRenderPropsType> = props => {
  const handlePrev = () => {
    props.onChange(
      dateConvertPrevMonth(props.currentMonthDate)
    )
  }
  const handleNext = () => {
    const prevDate = dateConvertNextMonth(props.currentMonthDate)
    props.onChange( prevDate )
  }

  return (<>
    <div className={style.main}>
      <div className={style.container}>
        {
          props.currentMonthDate.getTime() === dateConvertMonth(new Date()).getTime() ? <div />  :
            <Button
              type='primary'
              onClick={() => handlePrev()}
              icon={
                <FontIcon
                  name='left'
                  className={style.icon}
                />
              }
            >
              上一月
            </Button>
        }
        <div className={style.date}>
          <div>
            {props.currentMonthDate.getFullYear()}
            -
            {props.currentMonthDate.getMonth() + 1 < 10 ? '0' : ''}
            {props.currentMonthDate.getMonth() + 1}
          </div>
        </div>
        <Button
          onClick={() => handleNext()}
          type='primary'
          icon={
            <FontIcon
              name='right' className={style.icon}
            />
          }
        >下一月
        </Button>
      </div>
    </div>
  </>)
}

export default DateRender
