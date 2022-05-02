import {get, patch} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const getWithdraws = async () => {
  return await get<PageType<TransactionItemType>>(`/withdraws`, getPageQuery())
}

const accessWithdraw = async (id: number) => await patch<TransactionItemType>(`/withdraws/${id}/status`)

const rejectWithdraw = async (id: number, reason: string) => await patch<TransactionItemType>(`/withdraws/${id}/status/failed`, {reason})

export {getWithdraws, accessWithdraw, rejectWithdraw}
