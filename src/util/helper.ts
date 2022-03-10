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

export type QueryValueType = string | number | boolean
export const objectToQueryStr = (obj: object): string => {
  if (!obj) return ''
  let result = "?"
  for (const key in obj) {
    if (key) {
      result += `${key}=${obj[key]}&`
    }
  }

  return result.substring(0, result.length - 1)
}

export const queryStrToObject = (queryStr: string): Record<string, QueryValueType> => {
  queryStr = queryStr.substring(1)
  const items: string[] = queryStr.split('&')
  const result: Record<string, QueryValueType> = {}
  items.map(el => {
    const [k, v] = el.split('=')
    if (k) {
      result[k] = v
    }
  })

  return result;
}


