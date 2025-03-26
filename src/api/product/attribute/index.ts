import { defHttp } from '@/utils/http/axios'


export interface AttributeValue {
  id?: number,
  title: string,
  type: number,
  value?: string,
  data?: string,
  sort: number,
}

export interface CommonAttributeVO {
  id?: number
  title: string
  sort: number
  status: number
  values?: AttributeValue[]
}

export interface CommonAttributePageReqVO {
  title?: string
  type?: number
  status?: number
}

// export function listSimpleSpec() {
//   return defHttp.get({ url: '/product/common-spec/list' })
// }

// export function treeSimpleCate() {
//   return defHttp.get({ url: '/product/cate/tree-simple' })
// }

export function listSimpleAttribute() {
  return defHttp.get({ url: '/product/common-attribute/list' })
}

export function getCommonAttributePage(params: CommonAttributePageReqVO) {
  return defHttp.get({ url: '/product/common-attribute/page', params })
}

export function getCommonAttribute(id: number) {
  return defHttp.get({ url: `/product/common-attribute/get?id=${id}` })
}

export function createCommonAttribute(data: CommonAttributeVO) {
  return defHttp.post({ url: '/product/common-attribute/create', data })
}

export function updateCommonAttribute(params: CommonAttributeVO) {
  return defHttp.put({ url: '/product/common-attribute/update', data: params })
}

export function deleteCommonAttribute(id: number) {
  return defHttp.delete({ url: `/product/common-attribute/delete?id=${id}` })
}
