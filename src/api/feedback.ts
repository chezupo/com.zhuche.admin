import {get} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const getFeedback = async () => {
  return await get<PageType<FeedbackItemType>>(`/feedbacks`, getPageQuery())
}

export {getFeedback}
