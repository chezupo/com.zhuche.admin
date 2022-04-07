import {query2Obj} from "@wuchuhengtools/helper";

type PageQueryType = {
  page: number
  size: number
}
const getPageQuery = (page: number, size: number): PageQueryType => {
  const {search} = document.location
  const searchObj = query2Obj(search)

  return  {...searchObj, page: parseInt(searchObj?.page) || page, size: parseInt(searchObj?.size) || size }
}

export {getPageQuery}
