import { defHttp } from '@/utils/http/axios'

export interface ExpressVO {
  id?: number
  name: string
  is_default: boolean
  sort: number
  status: number
}

export interface ExpressPageReqVO {
  name?: string
  status?: number
}

export function getExpressPage(params: ExpressPageReqVO) {
  return defHttp.get({ url: '/common/express/page', params })
}

export function getExpress(id: number) {
  return defHttp.get({ url: `/common/express/get?id=${id}` })
}

export function createExpress(data: ExpressVO) {
  return defHttp.post({ url: '/common/express/create', data })
}

export function updateExpress(params: ExpressVO) {
  return defHttp.put({ url: '/common/express/update', data: params })
}

export function deleteExpress(id: number) {
  return defHttp.delete({ url: `/common/express/delete?id=${id}` })
}

export function getExpressListAll() {
  return defHttp.get({ url: '/common/express/list-all-simple' })
}
