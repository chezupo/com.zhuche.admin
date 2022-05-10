import {query2Obj} from "@wuchuhengtools/helper";

type PageQueryType = {
  page: number
  size: number
}
type PageDataConvertPaginationType = {
  pageSize: number
  current: number
  total: number
  showTotal: () => string
}
const getPageQuery = (page?: number, size?: number): PageQueryType => {
  page = page || 1
  size = size || 12
  const {search} = document.location
  const searchObj = query2Obj(search)

  return  {...searchObj, page: parseInt(searchObj?.page) || page, size: parseInt(searchObj?.size) || size }
}

const initPaginationData = <T>(): PageType<T> => {
  return {
    list: [],
    total: 0,
    currentPage: 1,
    size: 12
  }
}

/**
 * 分页条
 * @param data
 */
const pageDataConvertPagination = <T>(data: PageType<T>):PageDataConvertPaginationType  => {
  return {
    pageSize: data.size,
    current: data.currentPage,
    total: data.total,
    showTotal: () =>  `共${data.total}条`
  }
}

const getInitPageData  = <T>(): PageType<T> => ({
  currentPage: 1,
  total: 0,
  size: 12,
  list: []
})


export {
  getPageQuery,
  initPaginationData,
  pageDataConvertPagination,
  getInitPageData
}
