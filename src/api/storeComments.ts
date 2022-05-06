import {get} from "@/util/httpClient";
import {CommentItemType, PageType} from "@/typings";
import {getPageQuery} from "@/util/paginationUtil";

const getStoreComments = async () => {
  return await get<PageType<CommentItemType>>(`/stores/comments`, getPageQuery())
}

export {getStoreComments}
