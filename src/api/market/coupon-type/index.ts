import { defHttp } from '@/utils/http/axios'

export interface CouponTypeVO {
  id?: number
  pid: number
  title: string
  sub_title: string
  cover: string
  is_recommend: boolean
  sort: number
  status: number
}

export interface CouponTypePageReqVO {
  pid?: number
  title?: string
  status?: number
}

// 查询列表
export function getCouponTypePage(params: CouponTypePageReqVO) {
  return defHttp.get({ url: '/market/coupon-type/page', params })
}

// 查询详情
export function getCouponType(id: number) {
  return defHttp.get({ url: `/market/coupon-type/get?id=${id}` })
}

// 新增
export function createCuponType(data: CouponTypeVO) {
  return defHttp.post({ url: '/market/coupon-type/create', data })
}

// 修改
export function updateCouponType(params: CouponTypeVO) {
  return defHttp.put({ url: '/market/coupon-type/update', data: params })
}

// 删除
export function deleteCouponType(id: number) {
  return defHttp.delete({ url: `/market/coupon-type/delete?id=${id}` })
}
