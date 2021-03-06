import React, {useEffect, useState} from "react";
import {getCheckoutAgreements} from "@/api/agreement";
import AgreementTableRender from "@/pages/setting/Agreement/components/AgreementTableRender";

const CheckOutOrderAgreement: React.FC = props => {
  const [data, setData] = useState<AgreementItemType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const handleFetchData = () => {
    setLoading(true)
    getCheckoutAgreements().then(res => {
      setData(res)
    })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    handleFetchData()
  }, [])
  return (
    <AgreementTableRender loading={loading} data={data} onChanged={handleFetchData} />
  )
}

export default CheckOutOrderAgreement
