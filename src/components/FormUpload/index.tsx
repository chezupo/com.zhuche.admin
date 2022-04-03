import React, {useEffect, useState} from "react";
import {useAppSelector} from "@/store/hooks";
import UploadImg from "@/components/UploadImg";

type UploadRenderPropsType = {
  value?: string
  onChange?: (value: string) => void
  accept?: string
}
const FormUpload: React.FC<UploadRenderPropsType> = props => {
  const {imgPrefix} = useAppSelector(state => state.configuration)
  const [url, setUrl] = useState<string>('')
  const handleInitUrl = () => {
    if (imgPrefix && props.value) {
      setUrl(`${imgPrefix}/${props.value}`)
    }
  }
  useEffect(() => handleInitUrl(), [])
  useEffect(() => handleInitUrl(), [props.value, imgPrefix])

  return (<>
    <UploadImg
      accept={props.accept}
      {...(url.length > 0 ? {imageUrl: url} : {})}
      onUploaded={newImg => props.onChange && props.onChange(newImg.key)}
    />
  </>)
}

export default FormUpload
