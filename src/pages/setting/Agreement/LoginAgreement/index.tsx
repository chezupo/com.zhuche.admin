import React, {useEffect, useState} from "react";
import {getLoginAgreements} from "@/api/agreement";
import AgreementTableRender from "@/pages/setting/Agreement/components/AgreementTableRender";

const LoginAgreement: React.FC = () => {
  const [data, setData] = useState<AgreementItemType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const handleFetchData = () => {
    setLoading(true)
    getLoginAgreements().then(res => {
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

export default LoginAgreement
