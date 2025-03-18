import { defHttp } from '@/utils/http/axios'

export interface TagVO {
  id?: number
  title: string
  sort: number
  status: number
}

export interface TagPageReqVO {
  title?: string
  status?: number
}

// // 查询部门（精简)列表
// export function listSimpleCate() {
//   return defHttp.get({ url: '/product/cate/list-all-simple' })
// }
//
// export function treeSimpleCate() {
//   return defHttp.get({ url: '/product/cate/tree-simple' })
// }

export function getTagPage(params:TagPageReqVO) {
  return defHttp.get({ url: '/product/tag/page', params })
}

export function getTag(id: number) {
  return defHttp.get({ url: `/product/tag/get?id=${id}` })
}

export function createTag(data: TagVO) {
  return defHttp.post({ url: '/product/tag/create', data })
}

export function updateTag(params: TagVO) {
  return defHttp.put({ url: '/product/tag/update', data: params })
}

export function deleteTag(id: number) {
  return defHttp.delete({ url: `/product/tag/delete?id=${id}` })
}
