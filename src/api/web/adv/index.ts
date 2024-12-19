import { defHttp } from '@/utils/http/axios'

export interface AdvVO {
  id: number
  title: string
  cover: string
  location: string
  desc: string
  jump_link: string
  jump_type: number
  jump_param: string
  lang: string
  status: boolean
}

export interface AdvReqVO extends PageParam {
  location?: string
  title?: string
  status?: boolean
  createdTime?: Date[]
}

export function getAdvPage(params: AdvReqVO) {
  return defHttp.get({ url: '/adv/page', params })
}

export function createAdv(params: AdvVO) {
  return defHttp.post({ url: '/adv/create', params })
}

export function updateAdv(data: AdvVO) {
  return defHttp.put({ url: '/adv/update', data })
}

// 删除用户
export function deleteAdv(id: number) {
  return defHttp.delete({ url: `/adv/delete?id=${id}` })
}

export function getAdv(id: number) {
  return defHttp.get({ url: `/adv/get?id=${id}` })
}
