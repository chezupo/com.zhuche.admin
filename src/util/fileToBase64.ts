import {RcFile} from "antd/lib/upload/interface";

export const getBase64 = (file: RcFile): Promise<string | ArrayBuffer | null>  => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

