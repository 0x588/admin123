import type {RouteItem} from "./menuModel";

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  captchaVerification: string
}

export interface SmsLoginParams {
  mobile: number
  code: number
}
export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  accessToken: string
  refreshToken: string
  expiresTime: number
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: string[]
  permissions: string[]
  menus: RouteItem[]
  // 用户id
  user: userModel
  homePath?: string
}

export interface userModel {
  id: string | number
  avatar: string
  nickname: string
}
