import { defHttp } from '@/utils/http/axios';

export interface MemberReqParam  extends PageParam {
  id?: number
  username?: string
  nickname?: string
  phone?: string
  pid?: number
  createdTime?: Date[]
}

export function getMemberPage(params: MemberReqParam) {
  return defHttp.get({ url: '/member/page', params })
}

export function changeMemberStatus(id: number, status: number) {
  return defHttp.post({ url: '/member/change-status', params: { id, status } })
}
