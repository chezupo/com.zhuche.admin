import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {obj2Query, query2Obj} from "@wuchuhengtools/helper";

type ReloadPaginationQueryType = {
  page?: number
  size?: number
}
type ReloadPaginationType = (query: ReloadPaginationQueryType) => void
type UseIsReloadPaginationQueryType = () => void
type RefreshType= () => void
/**
 *  触发分页加载回调函数
 * @param callBack
 */
const useReloadPagination = (callBack: UseIsReloadPaginationQueryType): [ReloadPaginationType, RefreshType] => {
  const [preSearch, setPreSearch] = useState<string>('')
  let isReload: boolean
  const navigator = useNavigate()
  const {pathname, search} = useLocation()
  const handleReloadPagination: ReloadPaginationType = query => {
    navigator(pathname + obj2Query(
      {
        ...query2Obj(search),
        ...(query.page ? {page: query.page} : {}),
        ...(query.size? {size: query.size} : {}),
      }
    ))
  }
  if (search === preSearch) {
    isReload = false
  } else {
    setPreSearch(search)
    isReload = true
  }
  isReload &&  callBack()
  useEffect(() => callBack(), [])

  return [handleReloadPagination, callBack]
}

type UsePaginationFilterReturnType  = Record<string, string | number>
type UsePaginationFilterType = (query: UsePaginationFilterReturnType) => void

/**
 *  分页搜索
 */
const usePaginationFilter = (): UsePaginationFilterType  => {
  const navigate = useNavigate()
  const {pathname, search} = useLocation();
  const removeEmptyValue = (newValue: UsePaginationFilterReturnType): UsePaginationFilterReturnType => {
    const objQuery: UsePaginationFilterReturnType = {}
    for (const key in newValue) {
      if (newValue[key]) {
        objQuery[key] = newValue[key]
      }
    }
    return objQuery;
  }

  const handleFilter: UsePaginationFilterType = query => {
    const queryObj = {
     ...(removeEmptyValue(query2Obj(search))),
      ...(removeEmptyValue(query))
    }
    navigate(pathname + obj2Query(queryObj))
  }

  return handleFilter
}

type UseRestPaginationFilterType = () => void
/**
 *  重置分页搜索
 */
const useRestPaginationFilter = (): UseRestPaginationFilterType => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const handleFilter = () => {
    navigate(pathname + obj2Query({}))
  }

  return handleFilter
}

export {useReloadPagination, usePaginationFilter, useRestPaginationFilter}
