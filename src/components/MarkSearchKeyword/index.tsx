import React from "react";
import {useLocation} from "react-router-dom";
import {query2Obj} from "@wuchuhengtools/helper";

type MarkSearchKeywordPropsType = {
  text: string
  pathParamKeyword: string
}
const MarkSearchKeyword: React.FC<MarkSearchKeywordPropsType> = props => {
  const {search} = useLocation()
  const queryObj = query2Obj(search)
  let keyword = queryObj?.[props.pathParamKeyword];
  let html = props.text
  if (keyword) {
    keyword = decodeURI(keyword)
    const activeKeyword = `<span style='color: red'>${keyword}</span>`
    html = props.text.replaceAll(keyword, activeKeyword)
  }

  return (
    <span dangerouslySetInnerHTML={{__html: html}} />
  )
}

export default MarkSearchKeyword
