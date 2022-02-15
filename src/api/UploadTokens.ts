import {post} from "@/util/httpClient";

type UploadTokenType = {
  accessToken: string;
  platForm: string;
  prefixUrl: string;
}

// 创建上传token
export const createUploadToken = async (): Promise<UploadTokenType> => await post<UploadTokenType>('/uploadToken')
