import React, { useEffect, useMemo, useState } from 'react'
import { AutoComplete } from 'antd'
import axios from 'axios'
import { debounce } from '@wuchuhengtools/helper'
import { useAppSelector } from '@/store/hooks'

type OptionAddressType = AddressType & {id: string}

const getAddress = (keywords: string, amapKey: string): Promise<OptionAddressType[]> => {
  return new Promise<OptionAddressType[]>((resolve, reject) => {
    axios.get(`https://restapi.amap.com/v5/place/text?parameters&key=${amapKey}&keywords=${keywords}`)
      .then((res) => {
        if (res.status === 200 && res.data.info === "OK") {
          const pois = res.data.pois as {
            adcode: string // "110101"
            address: string // "景山前街4号"
            adname: string // "东城区"
            citycode: string // "010"
            cityname: string // "北京市"
            id: string // "B000A8UIN8"
            location: string // "116.39728,39.913904"
            name: string // "故宫博物院"
            pcode: string // "110000"
            pname: string // "北京市"
            type: string // "风景名胜;风景名胜;世界遗产|科教文化服务;博物馆;博物馆"
          }[]
          const addressList = pois.map((i): OptionAddressType => {
              const [lng, lat] = i.location.split(',').map((i): number => parseFloat(i) )

              return {
                id:  i.id,
                province: i.pname,
                city: i.cityname,
                name: i.name,
                area: i.adname,
                provinceCode: parseInt(i.pcode),
                cityCode: parseInt( i.citycode),
                areaCode: parseInt( i.adcode),
                address: i.address,
                lng,
                lat
              }
            }
          )

          return resolve(addressList)
        }
      })
  })
}
export type CompleteInputPropsType = {
  onChange?: (newAddress: AddressType) => void
  value?: AddressType
}
const CompleteInput: React.FC<CompleteInputPropsType> = (props) => {
  const amapSearchKey = useAppSelector(state => state.configuration.amapSearchKey)

  const [options, setOptions] = useState<OptionAddressType[]>([ ]);
  const [selectIndex, setSelectIndex] = useState<OptionAddressType| null>(null)
  const handleSelect = (address: string, info: {key: string}) => {
    const index = options.findIndex(i => i.id === info.key)
    const selectedOption = options[index]
    setSelectIndex(selectedOption)
    props.onChange && props.onChange(selectedOption)
  }
  const handleInitOption = (): void => {
    if (props.value) {
      const id = JSON.stringify(props.value)
      const index = options.findIndex(i => i.id === id)
      const defaultOption: OptionAddressType = {...props.value, id}
      index === -1 && setOptions(() => [defaultOption, ...options])
    }
  }
  useEffect(() => handleInitOption() , [])
  useEffect(() => handleInitOption() , [props.value])
  const handleChange = useMemo(() => {
    const callback = debounce((keywords: string) => {
      keywords && getAddress(keywords, amapSearchKey).then(newAddress => {
        setOptions(newAddress)
      } )
    }, 500)
    return callback
  }, [ ])

  return (
    <AutoComplete
      options={options.map((i, index): {value: string, key: string }  => ({
        value: `${i.name} ${i.province} ${i.city} ${i.area} ${i.address}`, key: i.id }) )}
      style={{ width: "100%", marginBottom:'.5rem'}}
      onSelect={handleSelect}
      onChange={handleChange}
    />
  )
}

export default CompleteInput
