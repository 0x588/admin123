import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import {DICT_TYPE, getDictOptions} from "@/utils/dict";

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 40,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 40,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: '授权客户端',
    dataIndex: 'client',
    width: 100,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.AUTH_TYPE)
    },
  },
  {
    title: 'Openid',
    dataIndex: 'client_open_id',
    width: 180,
  },
  {
    title: '关联用户',
    dataIndex: 'member',
    width:120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 40,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '授权时间',
    dataIndex: 'created_at',
    width: 120,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '用户ID',
    field: 'member_id',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: 'Openid',
    field: 'client_open_id',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '授权客户端',
    field: 'client',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.AUTH_TYPE, "string") as any,
    },
    colProps: { span: 5 },
  },
  {
    label: '创建时间',
    field: 'createdTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]
