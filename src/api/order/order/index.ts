import { defHttp } from '@/utils/http/axios'

export interface OrderVO {
  seller_memo?: string
}

export interface OrderPageReqVO {
  order_sn?: string
  out_trade_no?: string
  order_from?: string
  order_type?: string
  payment_type?: string
  buyer_id?: string
  order_status?: string
  createdTime?: Date[]
}

export function getOrderPage(params:OrderPageReqVO) {
  return defHttp.get({ url: '/order/page', params })
}

export function getOrderStatusCount(params:OrderPageReqVO) {
  return defHttp.get({ url: '/order/status-count', params })
}

export function getOrder(id: number) {
  return defHttp.get({ url: `/order/get?id=${id}` })
}

export function updateOrder(id: number, data: OrderVO) {
  return defHttp.post({ url: '/order/update', data: {id, data} })
}

export function deleteOrder(id: number) {
  return defHttp.delete({ url: `/order/delete?id=${id}` })
}

