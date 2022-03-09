import {message} from "antd";

export const successMessage = (text?: string): void => {
  text = text? text : "操作成功🎉🎉🎉"
  message.success(text).then((r) => {
    console.log(r)
  })
}

export const errorMessage = (text?: string): void => {
  text = text? text : "操作失败"
  message.error(text).then((r) => {
    console.log(r)
  })
}
