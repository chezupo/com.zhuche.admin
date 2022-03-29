import {get} from "@/util/httpClient";

type GetLogsQueryType = {
  page: number
  size: number
}
const getLogs =  async (query: GetLogsQueryType): Promise<PageType<LogItemType>> => {
  return await get<PageType<LogItemType>>('/logs', query)
}

export {getLogs}
