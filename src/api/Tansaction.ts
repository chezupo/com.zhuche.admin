import {get} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const getTransaction = async () => {
  return await get<PageType<TransactionItemType>>(`/transactions`, getPageQuery())
}

export {getTransaction}
