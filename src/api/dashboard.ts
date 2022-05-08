import {get} from "@/util/httpClient";

const getDashboard = async () => {
  return await get<DashboardItemType>(`/dashboard`)
}

export {getDashboard}
