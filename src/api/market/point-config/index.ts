import { defHttp } from '@/utils/http/axios'

export interface PointConfigVO {
  id?: number
  convert_rate?: number
  min_order_money?: number
  deduction_type?: number
  max_rate?: number
  max_money?: number
  explain?: string
  status?: number
}

// 查询详情
export function getPointConfig() {
  return defHttp.get({ url: `/market/point-config/get` })
}

// 修改
export function updatePointConfig(params: PointConfigVO) {
  return defHttp.put({ url: '/market/point-config/update', data: params })
}
