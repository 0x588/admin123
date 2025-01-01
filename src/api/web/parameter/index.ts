import { defHttp } from '@/utils/http/axios'

export interface ParamListVO {
  id: number
  content: string
  cate_id: number
  sort: number
}

export interface ParamListReqVO extends PageParam {
  cate_id?: number
  createdTime?: Date[]
}

export function getParamListPage(params: ParamListReqVO) {
  return defHttp.get({ url: '/parameter-list/page', params })
}

export function createParamList(params: ParamListVO) {
  return defHttp.post({ url: '/parameter-list/create', params })
}

export function updateParamList(data: ParamListVO) {
  return defHttp.put({ url: '/parameter-list/update', data })
}

// 删除用户
export function deleteParamList(id: number) {
  return defHttp.delete({ url: `/parameter-list/delete?id=${id}` })
}

export function getParamList(id: number) {
  return defHttp.get({ url: `/parameter-list/get?id=${id}` })
}


