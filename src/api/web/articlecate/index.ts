import { defHttp } from '@/utils/http/axios'

export interface ArticleCateVO {
  id: number
  title: string
  pid: number
  cover: string
  desc: string
  status: boolean
}

export interface ArticleCateReqVO extends PageParam {
  title?: string
  status?: boolean
  createdTime?: Date[]
}

export function getArticleCatePage(params: ArticleCateReqVO) {
  return defHttp.get({ url: '/article-cate/page', params })
}

export function createArticleCate(params: ArticleCateVO) {
  return defHttp.post({ url: '/article-cate/create', params })
}

export function updateArticleCate(data: ArticleCateVO) {
  return defHttp.put({ url: '/article-cate/update', data })
}

// 删除用户
export function deleteArticleCate(id: number) {
  return defHttp.delete({ url: `/article-cate/delete?id=${id}` })
}

export function getArticleCate(id: number) {
  return defHttp.get({ url: `/article-cate/get?id=${id}` })
}

export function getArticleCateTree() {
  return defHttp.get({ url: '/article-cate/tree' })
}

