import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProvince } from '../../../../api/province'
import { provinceSubscription } from '@/pages/store/BaseInfor/FilterRender/index'

const Option = Select.Option
type ProvinceRenderPropsType = {
  onChange?: (provinceCode: string) => void
  value?: string;
}
const ProvinceRender: React.FC<ProvinceRenderPropsType> = (props) => {
    const handleChange = (code: string) => {
      provinceSubscription.next(code)
      props.onChange && props.onChange(code)
    }
    const [options, setOptions] = useState<ProvinceType[]>([])
    const handleProvinceData = (): void => {
        getProvince().then(newOptions=> {
            setOptions(newOptions)
        })
    }

    useEffect(() => {
        handleProvinceData()
    }, [])

    return (
          <Select
            placeholder="请选择省"
            onChange={handleChange}

            style={{width: '100%'}}
            value={props.value}
          >
            {options.map(el => (
                <Option value={el.code} key={el.code}
                >{el.name}</Option>
            ))}

        </Select>
    )
}

export default ProvinceRender
