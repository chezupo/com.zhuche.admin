import React from 'react'
import { Col, Row } from 'antd'
import axios from 'axios'
import SelectRender, { SelectValueType } from './SelectRender'
import InputRender from '@/components/MapSearchComplete/CompleteInput/InputRender'

export type OptionAddressType = AddressType & {id: string}

export const getAddress = async (keywords: string, amapKey: string): Promise<OptionAddressType[]> => {
  const res = await axios.get(`https://restapi.amap.com/v5/place/text?parameters&key=${amapKey}&keywords=${keywords}`)
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
        const [lng, lat] = i.location.split(',').map((i): number => parseFloat(i))
        return {
          id: i.id,
          province: i.pname,
          city: i.cityname,
          name: i.name,
          area: i.adname,
          provinceCode: i.pcode,
          cityCode: i.citycode,
          areaCode: i.adcode,
          address: i.address,
          lng,
          lat
        }
      }
    )
    return addressList
  }

  throw new Error()
}


export type CompleteInputPropsType = {
  onChange?: (newAddress: AddressType) => void
  value?: AddressType
}
const CompleteInput: React.FC<CompleteInputPropsType> = (props) => {
  const handleChangeSelect = (newDivision: SelectValueType) => {
    if (props.onChange && props.value) {
      props.onChange({...props.value, ...newDivision})
    }
  }

  return (
    <Row>
      <Col span={12}>
        <SelectRender
          {...(props.value) ? {value: {
              provinceCode: props.value.provinceCode,
              cityCode: props.value.cityCode,
              areaCode: props.value.areaCode
            }} : {} }
          onChange={handleChangeSelect}
        />
      </Col>
      <Col span={12}>
        <InputRender
          {...(props.value ? {value: props.value} : {})}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  )
}

export default CompleteInput

