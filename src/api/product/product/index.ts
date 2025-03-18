import { defHttp } from '@/utils/http/axios'

export interface ProductVO {
  id?: number
  name: string
  picture: string
  sort: number
  status: number
}

export interface ProductPageReqVO {
  name?: string
  status?: number
}

export function getProductPage(params:ProductPageReqVO) {
  return defHttp.get({ url: '/product/product/page', params })
}

export function getProduct(id: number) {
  return defHttp.get({ url: `/product/product/get?id=${id}` })
}

export function createProduct(data: ProductVO) {
  return defHttp.post({ url: '/product/product/create', data })
}

export function updateProduct(params: ProductVO) {
  return defHttp.put({ url: '/product/product/update', data: params })
}

export function deleteProduct(id: number) {
  return defHttp.delete({ url: `/product/product/delete?id=${id}` })
}
