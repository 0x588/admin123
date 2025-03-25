import { defHttp } from '@/utils/http/axios'

export interface CommonSpecTemplateVO {
  id?: number
  title: string
  sepcIds: string
  sort: number
  status: number
}

export interface CommonSpecTemplatePageReqVO {
  title?: string
  status?: number
}
export function getCommonSpecTempPage(params: CommonSpecTemplatePageReqVO) {
  return defHttp.get({ url: '/product/common-spec-template/page', params })
}

export function getCommonSpecTemp(id: number) {
  return defHttp.get({ url: `/product/common-spec-template/get?id=${id}` })
}

export function createCommonSpecTemp(data: CommonSpecTemplateVO) {
  return defHttp.post({ url: '/product/common-spec-template/create', data })
}

export function updateCommonSpecTemp(params: CommonSpecTemplateVO) {
  return defHttp.put({ url: '/product/common-spec-template/update', data: params })
}

export function deleteCommonSpecTemp(id: number) {
  return defHttp.delete({ url: `/product/common-spec-template/delete?id=${id}` })
}

export function listSimpleSpecTemplate() {
  return defHttp.get({ url: '/product/common-spec-template/list' })
}

export function getCommonSpecsByTemplateId(id: number) {
  return defHttp.get({ url: `/product/common-spec-by-template-id/list?id=${id}` })
}

