import { defHttp } from '@/utils/http/axios';

export interface MemberAuthReqParam  extends PageParam {
  member_id?: number
  union_id?: string
  client?: string
  client_open_id?: number
  createdTime?: Date[]
}

export function getMemberAuthPage(params: MemberAuthReqParam) {
  return defHttp.get({ url: '/member/auth-page', params })
}

