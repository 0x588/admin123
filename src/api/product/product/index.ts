import { defHttp } from '@/utils/http/axios'

export interface ProductVO {
  id?: number
  name: string
  sketch: string
  cateIds: number[]
  tags?: string[]
  delivery_type: number[]
  shipping_type: number
  shipping_fee: number
  shipping_fee_id: number
  is_spec: boolean
  spec_template_id: number
  sort: number
  status: number
}

export interface ProductPageReqVO {
  name?: string
  status?: number
}

export interface ProductSpecValue {
  id?: number
  title: string
  data?: string|string[]|undefined
  pitch_on: boolean
}

export interface ProductSpecVo {
  id: number
  title: string
  type: number
  show_image: boolean
  values?: ProductSpecValue[]
}

export interface ProductSkuVo {
  id?: number
  product_id?: number
  name?: string
  picture?: string[]
  price: number
  market_price: number
  cost_price: number
  stock: number
  sku_no?: string
  bar_code?: string
  weight?: number
  volume?: number
  data?: string
  is_default?: boolean
  items?: any
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
