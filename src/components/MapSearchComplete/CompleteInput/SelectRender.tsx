import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAreasThunk, getCitiesThunk, getProvinceThunk } from '@/store/modules/division'
import { debounce, throttling } from '@wuchuhengtools/helper'

const {Option} = Select
export type SelectValueType =  {
  provinceCode: string; cityCode: string; areaCode: string
}
export type SelectRenderPropsType = {
  onChange?: (code: SelectValueType) => void
  value?: SelectValueType
}
const SelectRender: React.FC<SelectRenderPropsType> = (props) => {
  const dispatch = useAppDispatch()
  const division = useAppSelector(state => state.division)
  const handleInitValue = async () => {
    if (props.value) {
      const {provinceCode, cityCode, areaCode} = props.value
      provinceCode !== '' && division.province.length === 0 && await dispatch(getProvinceThunk())
      cityCode !== '' && division.cities.length === 0 && await dispatch(getCitiesThunk(provinceCode))
      areaCode !== '' && division.areas.length === 0 && await dispatch(getAreasThunk(provinceCode, cityCode))
      setCode(props.value)
    }
  }
  const refreshCities = useMemo(() => {
    return debounce((provinceCode: string) => {
       dispatch(getCitiesThunk(provinceCode)).then(() => {console.log()})
    }, 500)
  }, [])
  const refreshArea = useMemo(() => {
    return debounce((provinceCode: string, citiCode: string) => {
      dispatch(getAreasThunk(provinceCode, citiCode)).then(() => {console.log()})
    }, 500)
  }, [])

  useEffect(() => {
    handleInitValue().then(() => { console.log() })
  }, [])
  useEffect(() => {
    handleInitValue()
    if (props.value?.cityCode && props.value.provinceCode) {
      const index = division.cities.findIndex(i => i.code === props.value!.cityCode)
      index === -1 && refreshCities(props.value.provinceCode)
      division.cities.findIndex(i => i.code === props.value!.cityCode)
      && refreshArea(props.value.provinceCode,props.value.cityCode)
    }
  }, [props.value?.cityCode, props.value?.provinceCode])
  const [code, setCode] = useState<SelectValueType>({
    provinceCode: '',
    cityCode: '',
    areaCode: ''
  })
  const handleChange = (newCode: SelectValueType): void => {
    setCode(newCode)
    props.onChange && props.onChange!(newCode)
  }
  const handleChangeProvince = async (provinceCode: string) => {
    handleChange({...code, provinceCode})
    await dispatch(getCitiesThunk(provinceCode))
    handleChange({...code, provinceCode, cityCode: '', areaCode: ''})
  }
  const handleChangeCity = async (cityCode: string) => {
    handleChange({...code, cityCode})
    await dispatch(getAreasThunk(code.provinceCode, cityCode))
    handleChange({...code, cityCode, areaCode: ''})
  }
  const handleChangeArea = (areaCode: string) => {
    handleChange({...code, areaCode})
  }

  useEffect(() => {
    dispatch(getProvinceThunk()).then(() => { console.log() })
  }, [])

  return (<>
    <Row>
      <Col span={8}>
        <Select
          placeholder='选择省'
          value={code.provinceCode ? code.provinceCode : null}
          onChange={handleChangeProvince}
        >
          {
            division.province.map(province =>
              <Option value={province.code} key={province.code}>{province.name}</Option>
            )
          }
        </Select>
      </Col>
      <Col span={8}>
        <Select
          placeholder='选择市'
          value={code.cityCode ? code.cityCode : null}
          onChange={handleChangeCity}
        >
          {
            division.cities.map(city =>
              <Option value={city.code} key={city.code}>{city.name}</Option>
            )
          }
        </Select>
      </Col>
      <Col span={8}>
        <Select
          placeholder='选择区'
          value={code.areaCode ? code.areaCode : null}
          onChange={handleChangeArea}
        >
          {
            division.areas.map(area =>
              <Option value={area.code} key={area.code}>{area.name}</Option>
            )
          }
        </Select>
      </Col>
    </Row>
  </>)
}

export default SelectRender
