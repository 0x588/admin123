import { defHttp } from '@/utils/http/axios'

export interface ArticleVO {
  id: number
  title: string
  cover: string
  seo_key: string
  seo_content: string
  desc: string
  content: string
  cate_id: number
  lang: string
  status: boolean
  sort: number
}

export interface ArticleReqVO extends PageParam {
  title?: string
  status?: boolean
  createdTime?: Date[]
}

export function getArticlePage(params: ArticleReqVO) {
  return defHttp.get({ url: '/article/page', params })
}

export function createArticle(params: ArticleVO) {
  return defHttp.post({ url: '/article/create', params })
}

export function updateArticle(data: ArticleVO) {
  return defHttp.put({ url: '/article/update', data })
}

// 删除用户
export function deleteArticle(id: number) {
  return defHttp.delete({ url: `/article/delete?id=${id}` })
}

export function getArticle(id: number) {
  return defHttp.get({ url: `/article/get?id=${id}` })
}
