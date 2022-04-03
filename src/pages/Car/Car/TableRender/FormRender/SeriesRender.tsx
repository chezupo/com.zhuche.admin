import React, {useEffect, useState} from "react";
import {Cascader} from "antd";
import {getAllBrands} from "@/api/brand";

type OptionType = {
  value: number
  label: string
  children?: OptionType[]
}
type SeriesRenderPropsType = {
  value?: BrandSeriesItemType
  onChange?: (value: BrandSeriesItemType) => void
}
const idMapSeries = new Map<number, BrandSeriesItemType>()
const SeriesRender:React.FC<SeriesRenderPropsType> = props => {
  const [options, setOptions] = useState<OptionType[]>([])
  useEffect(() => {
    getAllBrands().then(res => {
      const newOptions: OptionType[] = res.list
        .filter(el => el.seriesList?.length > 0)
        .map((el): OptionType => {
          let children: OptionType[] = []
          if (el.seriesList?.length > 0) {
            children = el.seriesList.map((el): OptionType => {
              idMapSeries.set(el.id, el)
              return {
                label: el.name,
                value: el.id
              }
            })
          }
          return {
            label: el.name,
            value: el.id,
            children
          }
        })
      setOptions(newOptions)
    })
  }, [])
  const handleChange = (values: number[]) => {
   const series: BrandSeriesItemType = idMapSeries.get(values[1]) as BrandSeriesItemType
    props.onChange && props.onChange(series)
  }
  return (<>
    <Cascader
      options={options}
      placeholder="请选择车系"
      onChange={handleChange}
    />
  </>)
}

export default SeriesRender
