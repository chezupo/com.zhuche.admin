import React, { useEffect, useMemo, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { debounce } from '@wuchuhengtools/helper'
import {
  CompleteInputPropsType,
  getAddress,
  OptionAddressType
} from '@/components/MapSearchComplete/CompleteInput/index'
import { useAppSelector } from '@/store/hooks'
import FormatOptionItem from '@/components/MapSearchComplete/CompleteInput/FormatOptionItem'
import { getArea } from '@/api/area'

export const convertAddressLocation = async (address: AddressType): Promise<AddressType> => {
  const area = await getArea(address.areaCode)
  const newAddress = {
    ...address,
    area: area.name,
    areaCode: area.code,
    city: area.city.name,
    cityCode: area.city.code,
    province: area.city.province.name,
    provinceCode: area.city.province.code
  }

  return newAddress
}

const InputRender: React.FC<CompleteInputPropsType> = (props) => {
  const amapSearchKey = useAppSelector(state => state.configuration.amapSearchKey)
  const getNewAddress = useMemo(() => {
    const callback = debounce((keywords: string) => {
      keywords && getAddress(keywords, amapSearchKey).then(newAddress => {
        setOptions(newAddress)
      } )
    }, 500)
    return callback
  }, [ ])
  const handleInitOption = (): void => {
    if (props.value) {
      getNewAddress(props.value.address)
    }
  }
  useEffect(() => handleInitOption() , [])
  useEffect(() => handleInitOption() , [props.value])
  const handleSelect = (address: string, info: {key: string}) => {
    const index = options.findIndex(i => i.id === info.key)
    const selectedOption = options[index]
    props.onChange && props.onChange(selectedOption)
  }
  const [options, setOptions] = useState<OptionAddressType[]>([ ]);
  const handleChangeFullAddress = async (newFullAddress: AddressType) => {
    props.onChange && props.onChange( await convertAddressLocation(newFullAddress) )
  }
  const handleChangeAddress = (newAddress: string) => {
    getNewAddress(newAddress)
    if (props.onChange && props.value ) {
      props.onChange({...props.value, address: newAddress})
    }
  }

  return (
    <>
      <AutoComplete
        placeholder='请输入地址'
        defaultValue={null}
        value={props.value?.address}
        options={
          options.map((e) => ({
            value: <FormatOptionItem
              value={e}
              onChange={handleChangeFullAddress}
              keywords={props.value?.address}
            />,
            key: e.id
          }))
        }
        style={{ width: "100%", marginBottom: '.5rem' }}
        onSelect={handleSelect}
      >
        <Input
          onChange={e => handleChangeAddress(e.target.value)}
        />
      </AutoComplete>
    </>
)
}

export default InputRender
