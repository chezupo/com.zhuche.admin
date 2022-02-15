export const getTimeStr = (): string => {
  const date = new Date()
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const minu = date.getMinutes();
  const s = date.getSeconds();

  return `${y}-${m}-${d}-${h}-${minu}-${s}`
}

