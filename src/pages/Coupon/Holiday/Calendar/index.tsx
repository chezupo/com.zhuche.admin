import React, {ReactNode, useEffect, useState} from "react";
import style from "@/pages/Coupon/Holiday/style.module.less";
import DateItemRender from "@/pages/Coupon/Holiday/DateItemRender";
import {dateConvertDate, dateConvertNextMonth} from "@/util/dateUtil";
import {getHolidays} from "@/api/holiday";
import {Spin} from "antd";

type CalendarPropsType = {
  dateTime: Date
}
const dateMapHoliday = new Map<number, HolidayItemType>();
const Calendar: React.FC<CalendarPropsType> = props => {
  let isMounted = false
  const [resTds, setResTds] = useState<ReactNode[]>([])
  const handleChange = (newHoliday: HolidayItemType) => {
    dateMapHoliday.set( (new Date(newHoliday.day)).getDate(), newHoliday )
    handleRenderCalendar()
  }
  const handleDelete = (deletedHoliday: HolidayItemType): void => {
    const date = (new Date(deletedHoliday.day).getDate());
    dateMapHoliday.delete(date);
    handleRenderCalendar()
  }

  const handleRenderCalendar = () => {
    const newResTds: ReactNode[] = []
    let key = 0
    let currentDate: Date = props.dateTime;
    const lastDate = dateConvertDate(new Date(dateConvertNextMonth(props.dateTime).getTime() - 1));
    while (currentDate.getTime() < lastDate.getTime()) {
      newResTds.push(<tr key={key}>
        {
          Array.from(Array(7)).map((e, i) => {
            key++
            if (i === currentDate.getDay()) {
              const res = (<DateItemRender
                onChange={handleChange}
                dateTime={currentDate}
                onDelete={handleDelete}
                holiday={dateMapHoliday.get(currentDate.getDate())}
                key={key}
              />)
              currentDate = new Date(currentDate.getTime() + 60 * 60 * 24 * 1000)
              return res
            } else {
              return (<td key={key}  />)
            }
          })
        }
      </tr>)
    }
    isMounted && setResTds(newResTds)
  }
  const [loading, setLoading] = useState<boolean>(false)
  const handleInitDateItem = () => {
    setLoading(true)
    getHolidays(props.dateTime.getTime()).then(holidays => {
      dateMapHoliday.clear()
      holidays.forEach(h => dateMapHoliday.set( (new Date(h.day)).getDate(), h) )
      handleRenderCalendar()
    }).finally(() => setLoading(false))
  }
  useEffect(() => {
    isMounted = true
    handleInitDateItem()
    return () => {
      isMounted = false
    }

  }, [props.dateTime])

  return (
    <div className={style.dateWrapper}>
      <Spin spinning={loading}>
        <table>
          <thead>
          <tr>
            <td>日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
          </tr>
          </thead>
          <tbody>
          {resTds}
          </tbody>
        </table>
      </Spin>
    </div>
  )
}

export default Calendar
