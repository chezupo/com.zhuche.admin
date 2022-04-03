import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

type PaginationListenerPropsType = {
  onChange: () => void
}
const PaginationListener: React.FC<PaginationListenerPropsType> = props => {
  const [prevSearch, setPrevSearch] = useState<string>('')
  const {search} = useLocation()
  useEffect(() => {
    props.onChange()
  }, [prevSearch])
  if (search !== prevSearch) {
    setPrevSearch(search)
  }
  return (<></>)
}


export default PaginationListener
