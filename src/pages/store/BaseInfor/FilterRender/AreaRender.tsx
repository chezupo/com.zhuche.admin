import React, { useEffect, useState } from 'react'
import { CityRenderPropType } from '@/pages/store/BaseInfor/FilterRender/CityRender'
import { Select } from 'antd'
import { useLocation } from 'react-router-dom'
import { queryStrToObject } from '@/util/helper'
import { getAreas } from '@/api/area'
import { citySubscription } from '@/pages/store/BaseInfor/FilterRender/index'


const AreaRender: React.FC<CityRenderPropType> = (props) => {
  const [options, setOptions] = useState<AreaType[]>([])
  const handleChange = (code: string) => {
    props.onChange && props.onChange(code)
  }
  const {search} = useLocation()
  const obj = queryStrToObject(search)
  const [prevCityCode,  setPrevCityCode] = useState<string>(obj.cityCode as string || '')

  const handleFetchArea = (code: string): void => {
    setPrevCityCode(code)
    getAreas('11', code).then(newAreas => {
      setOptions(newAreas)
    })
  }

  useEffect(() => {
    obj.cityCode &&  handleFetchArea(obj.cityCode as string)
    const subscriptionHandler = citySubscription.subscription((cityCode) => {
      if (prevCityCode !== cityCode) {
        handleFetchArea(cityCode)
      }
    })

    return () => {
      citySubscription.unSubscription(subscriptionHandler)
    }
  }, [])

  return (
    <Select
      value={props.value}
      onChange={handleChange}
      placeholder='选择地区'
    >
      {
        options.map(el => <Select.Option key={el.code} value={el.code}>{el.name}</Select.Option>)
      }
    </Select>
  )
}

export default AreaRender
