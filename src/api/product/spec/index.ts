import { defHttp } from '@/utils/http/axios'


export interface SpecValue {
  id?: number,
  title: string,
  sort: number,
}

export interface CommonSpecVO {
  id?: number
  type: number
  title: string
  desc: string
  sort: number
  status: number
  values?: SpecValue[]
}

export interface CommonSpecPageReqVO {
  title?: string
  type?: number
  status?: number
}

export function listSimpleSpec() {
  return defHttp.get({ url: '/product/common-spec/list' })
}

// export function treeSimpleCate() {
//   return defHttp.get({ url: '/product/cate/tree-simple' })
// }

export function getCommonSpecPage(params: CommonSpecPageReqVO) {
  return defHttp.get({ url: '/product/common-spec/page', params })
}

export function getCommonSpec(id: number) {
  return defHttp.get({ url: `/product/common-spec/get?id=${id}` })
}

export function createCommonSpec(data: CommonSpecVO) {
  return defHttp.post({ url: '/product/common-spec/create', data })
}

export function updateCommonSpec(params: CommonSpecVO) {
  return defHttp.put({ url: '/product/common-spec/update', data: params })
}

export function deleteCommonSpec(id: number) {
  return defHttp.delete({ url: `/product/common-spec/delete?id=${id}` })
}
