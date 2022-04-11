import React, {useEffect, useReducer, useState} from "react";
import {Cascader} from "antd";
import {getAllBrands} from "@/api/brand";
import {isAdmin} from "@/util/AuthUtil";
import {getStoreBrandsByStoreId} from "@/api/stores";

type OptionType = {
  value: number
  label: string
  children?: OptionType[]
}
type SeriesRenderPropsType = {
  value?: BrandSeriesItemType
  onChange?: (value: BrandSeriesItemType) => void
  data?: CarItemType
}
const idMapSeries = new Map<number, BrandSeriesItemType & {parent: BrandItemType}>()
const convertOptions = (options: BrandItemType[]) => {
return options.filter(el => el.seriesList?.length > 0)
    .map((brandItem): OptionType => {
      let children: OptionType[] = []
      if (brandItem.seriesList?.length > 0) {
        children = brandItem.seriesList.map((series): OptionType => {
          idMapSeries.set(series.id, {...series, parent: brandItem})
          return {
            label: series.name,
            value: series.id
          }
        })
      }
      return {
        label: brandItem.name,
        value: brandItem.id,
        children
      }
    })
}

const SeriesRender:React.FC<SeriesRenderPropsType> = props => {
  const [options, setOptions] = useReducer((state: OptionType[], payload: OptionType[] ): OptionType[] => {
    return payload
  }, [])
  useEffect(() => {
    let isMounted = true
    if (isAdmin()) {
      getStoreBrandsByStoreId(props.data!.store.id).then(res => {
        const newOptions: OptionType[] = convertOptions(res)
        isMounted && setOptions(JSON.parse(JSON.stringify( newOptions)))
      })
    } else {
      getAllBrands().then(res => {
        const newOptions: OptionType[] = convertOptions(res.list)
        isMounted && setOptions(JSON.parse(JSON.stringify( newOptions)))
      })
    }

    return () => {
      isMounted = false
    }
  }, [])
  let value: number[] = []
  if (options.length > 0 && props.value) {
    const series = idMapSeries.get(props.value.id)
    if (series) {
      value = [series.parent.id, series.id]
    }
  }
  const handleChange = (values: number[]) => {
   const series: BrandSeriesItemType = idMapSeries.get(values[1]) as BrandSeriesItemType
    props.onChange && props.onChange(series)
  }

  return (<>
    <Cascader
      value={value}
      options={options}
      placeholder="请选择车系"
      onChange={handleChange}
    />
  </>)
}

export default SeriesRender
