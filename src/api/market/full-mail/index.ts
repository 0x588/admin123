import { defHttp } from '@/utils/http/axios'

export interface FullMailVO {
  id?: number
  min_order_money?: number
  no_mail_province_ids?: string
  no_mail_city_ids?: string
  status?: number
}

// 查询详情
export function getFullMail() {
  return defHttp.get({ url: `/market/full-mail/get` })
}

// 修改
export function updateFullMail(params: FullMailVO) {
  return defHttp.put({ url: '/market/full-mail/update', data: params })
}
