import { defHttp } from '@/utils/http/axios'

export interface ExpressFeeVO {
  id?: number
  title: string
  area?: string
  weight_used: boolean
  weight: number
  weight_price: number
  weight_more: number
  weight_more_price: number
  volume_used: boolean
  volume: number
  volume_price: number
  volume_more: number
  volume_more_price: number
  piece_used: boolean
  piece: number
  piece_price: number
  piece_more: number
  piece_more_price: number
  is_default: boolean
  sort: number
  status: number
}

export interface ExpressFeePageReqVO {
  name?: string
  status?: number
}

export function getExpressFeePage(params: ExpressFeePageReqVO) {
  return defHttp.get({ url: '/common/express-fee/page', params })
}

export function getExpressFee(id: number) {
  return defHttp.get({ url: `/common/express-fee/get?id=${id}` })
}

export function createExpressFee(data: ExpressFeeVO) {
  return defHttp.post({ url: '/common/express-fee/create', data })
}

export function updateExpressFee(params: ExpressFeeVO) {
  return defHttp.put({ url: '/common/express-fee/update', data: params })
}

export function deleteExpressFee(id: number) {
  return defHttp.delete({ url: `/common/express-fee/delete?id=${id}` })
}

export function getExpressFeeHasDefault(id: number) {
  return defHttp.get({ url: `/common/express-fee/has-default?express_id=${id}` })
}
