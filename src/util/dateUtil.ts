const dateConvertMonth = (date: Date): Date => {
  const y = date.getFullYear()
  const m = date.getMonth();

  return new Date(`${y}-${m + 1}-1`)
}

const dateConvertDate = (date: Date): Date => {
  const y = date.getFullYear()
  const m = date.getMonth();
  const dateNum = date.getDate();

  return new Date(`${y}-${m + 1}-${dateNum}`)
}

const dateConvertNextMonth = (date: Date): Date => {
  let y = date.getFullYear()
  let m = date.getMonth();
  if (m >= 10) {
    m = (m + 2) % 11;
    y++;
  } else {
    m++
  }

  return new Date(`${y}-${m + 1}-1`)
}

const dateConvertPrevMonth = (date: Date): Date => {
  let y = date.getFullYear()
  let m = date.getMonth();
  if (m === 0) {
    m = 11
    y--;
  } else {
    m--
  }

  return new Date(`${y}-${m + 1}-1`)
}

/**
 * 时间格式化字符串
 * @param date
 */
const dateConvertStr = (date: Date): string => {
  const format = (d: number) => (d > 9 ? d : '0' + d) + ''

  return `${date.getFullYear()}-${
    format(date.getMonth() + 1)
  }-${
    format(date.getDate())
  } ${
    format(date.getHours())
  }:${
    format(date.getMinutes())
  }:${
    format(date.getSeconds())
  }`
}

export {
  dateConvertMonth,
  dateConvertNextMonth,
  dateConvertPrevMonth,
  dateConvertDate,
  dateConvertStr
}
