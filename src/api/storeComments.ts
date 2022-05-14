import {get} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const getStoreComments = async () => {
  return await get<PageType<CommentItemType>>(`/stores/comments`, getPageQuery())
}

export {getStoreComments}
