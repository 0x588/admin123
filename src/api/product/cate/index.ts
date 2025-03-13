import { defHttp } from '@/utils/http/axios'

export interface CateVO {
  id?: number
  pid: number
  title: string
  sub_title: string
  cover: string
  is_recommend: boolean
  sort: number
  status: number
}

export interface CatePageReqVO {
  pid?: number
  title?: string
  status?: number
}

// 查询部门（精简)列表
export function listSimpleCate() {
  return defHttp.get({ url: '/product/cate/list-all-simple' })
}

export function treeSimpleCate() {
  return defHttp.get({ url: '/product/cate/tree-simple' })
}

// 查询部门列表
export function getCatePage(params: CatePageReqVO) {
  return defHttp.get({ url: '/product/cate/page', params })
}

// 查询部门详情
export function getCate(id: number) {
  return defHttp.get({ url: `/product/cate/get?id=${id}` })
}

// 新增部门
export function createCate(data: CateVO) {
  return defHttp.post({ url: '/product/cate/create', data })
}

// 修改部门
export function updateCate(params: CateVO) {
  return defHttp.put({ url: '/product/cate/update', data: params })
}

// 删除部门
export function deleteCate(id: number) {
  return defHttp.delete({ url: `/product/cate/delete?id=${id}` })
}
