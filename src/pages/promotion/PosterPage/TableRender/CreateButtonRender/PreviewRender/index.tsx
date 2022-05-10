import React, {useEffect, useRef} from "react";
import {FormDataType} from "@/pages/promotion/PosterPage/TableRender/CreateButtonRender";
import {formatImageUrl} from "@/util/helper";

const loadingImg = (img: HTMLImageElement): Promise<void> => new Promise(resolve => img.onload = () => resolve() )
type PreviewRenderPropsType =  {
  formData: FormDataType
}
const PreviewRender: React.FC<PreviewRenderPropsType> = props => {
  const img1 = new Image(),
    img2 = new Image()
  img2.src = "https://mass.alipay.com/wsdk/img?fileid=A*P8JDQ7wpVKsAAAAAAAAAAAAAAQAAAQ&bz=am_afts_openhome&zoom=227w_277h"
  const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
  canvas.width = 768 / 2;
  canvas.height = 1024 / 2;
  const {formData} = props

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (formData.url) {
      const qrSize = props.formData.size > 0 ? props.formData.size * 50 : 50;
      const x = props.formData.positionX > 0 ? formData.positionX : 0
      const y = formData.positionY > 0 ?  formData.positionY : 0
      img1.src = formatImageUrl(formData.url)
      console.log(img1.src)
      Promise.all([loadingImg(img1), loadingImg(img2)]).then((res)=>{
        ctx!.drawImage(img1, 0, 0, canvas.width, canvas.height);
        ctx!.drawImage(img2, x, y, qrSize, qrSize);
      });
      ref.current?.firstChild && ref.current?.removeChild(ref.current?.firstChild);
      ref.current?.appendChild(canvas)

    }
  }, [props.formData.size, props.formData.positionX, props.formData.positionY, formData.url])

  return (<>
    <div ref={ref} />
  </>)
}

export default PreviewRender
