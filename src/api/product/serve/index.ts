import { defHttp } from '@/utils/http/axios'

export interface ServeVO {
  id?: number
  name: string
  cover: string
  explain: string
  sort: number
  status: number
}

export interface ServePageReqVO {
  name?: string
  status?: number
}

export function getServePage(params:ServePageReqVO) {
  return defHttp.get({ url: '/product/serve/page', params })
}

export function getServe(id: number) {
  return defHttp.get({ url: `/product/serve/get?id=${id}` })
}

export function createServe(data: ServeVO) {
  return defHttp.post({ url: '/product/serve/create', data })
}

export function updateServe(params: ServeVO) {
  return defHttp.put({ url: '/product/serve/update', data: params })
}

export function deleteServe(id: number) {
  return defHttp.delete({ url: `/product/serve/delete?id=${id}` })
}
