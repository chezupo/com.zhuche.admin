import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Row, Spin} from "antd";
import FilterSearch, {DataType} from "@/pages/Car/Brand/FilterSearch";
import TableRender from "@/pages/Car/Brand/TableRender";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import {objectToQueryStr} from "@/util/helper";
import {getBrandThunk} from "@/store/modules/brand";

const Brand: React.FC = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const {currentPage, size} = useAppSelector(state => state.brands.list)
  const navigate = useNavigate()
  const {pathname, search} = useLocation()
  const [prevSearch, setPrevSearch] = useState<string>('')
  const handleSearch = () => {
    setPrevSearch(search)
    setLoading(true)
    dispatch(getBrandThunk()).then(() => {
      console.log("Searched brands.")
    }).finally(() => {
      setLoading(false)
    })
  }
  prevSearch !== search && handleSearch()

  const handleChange = (data: DataType): void => {
    navigate(pathname + objectToQueryStr(data))
  }
  const handleReset = () => {
    navigate(pathname + objectToQueryStr({size, page: currentPage}))
  }

  return (<>
    <HeaderPage>
      <>用于对本地门店的品牌进行管理,帮助用户在小程序过滤搜索时使用</>
    </HeaderPage>

    <ContentContainer>
      <Row gutter={[0, 12]}>
          <Col span={24}>
            <Spin spinning={loading} >
              <FilterSearch
                onReset={handleReset}
                onChange={handleChange}
              />
            </Spin>
          </Col>
        <Col span={24}>
          <TableRender />
        </Col>
      </Row>
    </ContentContainer>
  </>)
}

export default Brand
