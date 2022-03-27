import React, { useEffect, useState } from 'react'
import {Button, Col, Form, Grid, Input, Row} from 'antd'
import style from './style.module.less'
import { useLocation, useNavigate } from 'react-router-dom'
import { objectToQueryStr, queryStrToObject } from '@/util/helper'
import { useAppDispatch } from '@/store/hooks'
import { getStoresThunk } from '@/store/modules/stores'
import ProvinceRender from './ProvinceRender'
import CityRender from '@/pages/store/BaseInfor/FilterRender/CityRender'
import SubscriptionService from '@wuchuheng/rxjs'
import AreaRender from '@/pages/store/BaseInfor/FilterRender/AreaRender'

export type FilterDateType = {
  name: string
  provinceCode: string
  cityCode: string
  areaCode: string
}
export const provinceSubscription = new SubscriptionService<string>('')
export const citySubscription = new SubscriptionService<string>('')
const FilterRender: React.FC = () => {
  const {pathname, search} = useLocation()
  const [form] = Form.useForm<FilterDateType>();
  const initSubscription = () => {
    const obj = queryStrToObject(search)
    obj.provinceCode && provinceSubscription.next(obj.provinceCode as string)
  }
  const [prevSearch, setPrevSearch] = useState<string>('')
  const handleSubscriptionRoute = () => {
    setPrevSearch(search)
    form.setFieldsValue(queryStrToObject(search))
  }
  prevSearch !== search && handleSubscriptionRoute()
  useEffect(() => {
    initSubscription()
  }, [])
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleSearch = () => {
    const data = form.getFieldsValue(true);
    const queryStr = objectToQueryStr(data)
    navigate(pathname + queryStr)
    dispatch(getStoresThunk()).then(() => {
      console.log('Fetching the data...')
    })
  }
  const handleReset = () => {
    form.resetFields()
    navigate(pathname)
    dispatch(getStoresThunk()).then(() => {
      console.log('Handle reset search')
    })
  }

  return (
    <Form
      className={style.main}
      form={form}
    >
      <Row gutter={[24, 0]}  align="middle">
        <Col span={5} className={style.col}>
          <Form.Item
            className={style.item}
            label="店名"
            name="name"
          >
            <Input placeholder="请输入店名" />
          </Form.Item>
        </Col>
        <Col span={5} className={style.col}>
          <Form.Item label="省份" name='provinceCode' className={style.item}>
            <ProvinceRender />
          </Form.Item>
        </Col>
        <Col span={5} className={style.col}>
          <Form.Item
            label="城市"
            name='cityCode'
            className={style.item}
          >
            <CityRender />
          </Form.Item>
        </Col>
        <Col span={5} className={style.col}>
          <Form.Item
            label="地区"
            name='area'
            className={style.item}
          >
            <AreaRender />
          </Form.Item>
        </Col>
        <Col span={4} className={style.col}>
          <Form.Item
            className={[style.item].join(' ')}
          >
            <div className={style.buttonWrapper}>
              <Button
                type="default"
                onClick={handleReset}
              >重置</Button>
              <Button
                type="primary"
                onClick={handleSearch}
              >搜索</Button>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FilterRender

