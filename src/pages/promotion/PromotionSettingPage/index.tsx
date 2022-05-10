import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import FormRender from "@/pages/promotion/PromotionSettingPage/FormRender";

const PromotionSettingPage: React.FC = () => {
  return (<>
    <HeaderPage>
      用于配置订单的推广反点(%)
    </HeaderPage>
    <ContentContainer>
      <FormRender />
    </ContentContainer>
  </>)
}

export default PromotionSettingPage
