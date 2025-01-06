import { defHttp } from '@/utils/http/axios'

export interface FeedBackReqVO extends PageParam {
  name: string
  phone: string
  email: string
  createdTime?: Date[]
}

export function getFeedBackPage(params: FeedBackReqVO) {
  return defHttp.get({ url: '/feedback/page', params })
}

// 删除用户
export function deleteFeedBack(id: number) {
  return defHttp.delete({ url: `/feedback/delete?id=${id}` })
}

export function getFeedback(id: number) {
  return defHttp.get({ url: `/feedback/get?id=${id}` })
}


