import {deleteRequest, get, patch} from "@/util/httpClient";

type SetHolidayQueryType = {
  day: number
  mark: string
}
const setHoliday = async (query: SetHolidayQueryType): Promise<HolidayItemType> => {
  return await patch<HolidayItemType>('/holidays', query)
}

const getHolidays = async (dateTimeStamp: number): Promise<HolidayItemType[]> => {
  return await get<HolidayItemType[]>('/holidays', {dateTimeStamp})
}

const deleteHoliday = async (id: number): Promise<void> => {
  await deleteRequest<HolidayItemType[]>(`/holidays/${id}`)
}

export {setHoliday, getHolidays, deleteHoliday}
