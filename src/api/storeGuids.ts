import { get } from '@/util/httpClient'

export const getReturnGuids = async (query: object) => get<PageType<StoreGuideType>>('/stores/returnGuides', query)
