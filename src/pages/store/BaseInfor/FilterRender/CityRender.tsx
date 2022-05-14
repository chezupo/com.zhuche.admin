import React, { useEffect, useState } from 'react'
import { citySubscription, provinceSubscription } from '@/pages/store/BaseInfor/FilterRender/index'
import { useLocation } from 'react-router-dom'
import { queryStrToObject } from '@/util/helper'
import { getCities } from '@/api/cities'
import { Select } from 'antd'

const {Option} = Select

export type CityRenderPropType = {
  onChange?: (code: string) => void
  value?: string;
}
const CityRender: React.FC<CityRenderPropType> = (props) => {
  const [prevProvinceCode, setPrevProvinceCode ] = useState<string>(provinceSubscription.value)
  const [options, setOptions] = useState<CityType[]>([])
  const handleFetchCityData = (code: string) => {
    setPrevProvinceCode(code)
    getCities(code).then(newCities => {
      setOptions(newCities)
    })
  }
  const {search} = useLocation()
  const queryObj = queryStrToObject(search)

   useEffect(() => {
     const subscriptionHandler = provinceSubscription.subscription(code => {
       if (code !== prevProvinceCode) {
         handleFetchCityData(code)
       }
     })
     queryObj.provinceCode && handleFetchCityData(queryObj.provinceCode as string)

     return () => {
       provinceSubscription.unSubscription(subscriptionHandler)
     }
  }, [])
  const handleChange = (code: string) => {
    citySubscription.next(code)
    props.onChange && props.onChange(code)
  }

  return (
    <Select
      {...(props.value ? {value: props.value} : {})}
      onChange={handleChange}
      placeholder="请选择省"
      style={{width: '100%'}}
    >
      { options.map(el => <Option
        value={el.code}
        key={el.code}
        style={{width: '100%'}}
      >{el.name}</Option> ) }
    </Select>
  )
}

export default CityRender;
