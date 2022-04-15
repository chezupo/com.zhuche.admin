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

export {
  dateConvertMonth,
  dateConvertNextMonth,
  dateConvertPrevMonth,
  dateConvertDate
}
