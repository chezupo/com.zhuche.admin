import {get} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const getViolationPageData = async () => {
  return await get<PageType<ViolationItemType>>('/orders/violations', getPageQuery())
}

export {getViolationPageData}
