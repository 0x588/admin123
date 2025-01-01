import { defHttp } from '@/utils/http/axios'

export interface ParamCateVO {
  id: number
  title: string
  product_id: number
  sort: number
}

export interface ParamCateReqVO extends PageParam {
  title?: string
  product_id?: number
  createdTime?: Date[]
}

export function getParamCatePage(params: ParamCateReqVO) {
  return defHttp.get({ url: '/parameter-cate/page', params })
}

export function createParamCate(params: ParamCateVO) {
  return defHttp.post({ url: '/parameter-cate/create', params })
}

export function updateParamCate(data: ParamCateVO) {
  return defHttp.put({ url: '/parameter-cate/update', data })
}

// 删除用户
export function deleteParamCate(id: number) {
  return defHttp.delete({ url: `/parameter-cate/delete?id=${id}` })
}

export function getParamCate(id: number) {
  return defHttp.get({ url: `/parameter-cate/get?id=${id}` })
}


