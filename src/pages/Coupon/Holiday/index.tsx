import React, {useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from "./style.module.less";
import DateRender from "@/pages/Coupon/Holiday/DateRender";
import {dateConvertMonth} from "@/util/date";
import Calendar from "@/pages/Coupon/Holiday/Calendar";

const Holiday: React.FC = () => {
  const [date, setDate] = useState<Date>(dateConvertMonth(new Date()))
  const handleChangeDate = (newDate: Date) => {
    setDate(newDate)
  }

  return (<>
    <HeaderPage>
      节假日需要管理员来指定，它直接关系着有节假日限制的优惠卷能否被用户使用.
    </HeaderPage>
    <ContentContainer classname={style.main}>
      <DateRender
        currentMonthDate={date}
        onChange={handleChangeDate}
      />
      <Calendar dateTime={date} />
    </ContentContainer>
  </>)
}

export default Holiday
