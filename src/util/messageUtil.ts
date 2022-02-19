import {message} from "antd";

export const successMessage = (text?: string): void => {
  text = text? text : "操作成功🎉🎉🎉"
  message.success(text).then((r) => {
    console.log(r)
  })
}
