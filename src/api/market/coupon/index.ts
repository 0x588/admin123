import { defHttp } from '@/utils/http/axios'

export interface CouponVO {
  id?: number
  pid: number
  title: string
  sub_title: string
  cover: string
  is_recommend: boolean
  sort: number
  status: number
}

export interface CouponPageReqVO {
  pid?: number
  title?: string
  status?: number
}

// 查询列表
export function getCouponPage(params: CouponPageReqVO) {
  return defHttp.get({ url: '/market/coupon/page', params })
}

// 查询详情
export function getCoupon(id: number) {
  return defHttp.get({ url: `/market/coupon/get?id=${id}` })
}

// 新增
export function createCupon(data: CouponVO) {
  return defHttp.post({ url: '/market/coupon/create', data })
}

// 修改
export function updateCoupon(params: CouponVO) {
  return defHttp.put({ url: '/market/coupon/update', data: params })
}

// 删除
export function deleteCoupon(id: number) {
  return defHttp.delete({ url: `/market/coupon/delete?id=${id}` })
}
